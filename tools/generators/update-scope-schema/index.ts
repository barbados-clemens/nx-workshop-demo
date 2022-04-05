import {
  Tree,
  formatFiles,
  installPackagesTask,
  updateJson,
  ProjectConfiguration,
  getProjects,
} from '@nrwl/devkit';

export default async function (tree: Tree, schema: any) {
  const projects = getProjects(tree);
  const tags = getScopes(projects);

  const pathToGenerator = 'tools/generators/util-lib/index.ts';
  const content = tree.read(pathToGenerator, 'utf-8');
  const updatedContent = replaceScopes(content, tags)
  tree.write(pathToGenerator, updatedContent);


  updateJson(tree, 'tools/generators/util-lib/schema.json', (json) => {
    json.properties.directory['x-prompt'].items = tags.map((t) => ({
      value: t,
      label: t,
    }));
    return json;
  });

  await formatFiles(tree);
}

function getScopes(projectMap: Map<string, ProjectConfiguration>) {
  const projects: any[] = Array.from(projectMap.values());
  const allScopes: string[] = projects
    .map((project) => {
      return (
        project.tags
          // take only those that point to scope
          .filter((tag: string) => tag.startsWith('scope:'))
      );
    })
    // flatten the array
    .reduce((acc, tags) => {
      return [...acc, ...tags];
    }, [])
    // remove prefix `scope:`
    .map((scope: string) => scope.slice(6));
  // remove duplicates
  return Array.from(new Set(allScopes));
}

function replaceScopes(content: string, scopes: string[]): string {
  const joinScopes = scopes.map((s) => `'${s}'`).join(' | ');
  const PATTERN = /interface Schema \{\n.*\n.*\n\}/gm;
  return content.replace(
    PATTERN,
    `interface Schema {
  name: string;
  directory: ${joinScopes};
}`
  );
}

