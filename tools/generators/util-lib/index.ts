import { Tree, formatFiles, installPackagesTask, names } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

export default async function (tree: Tree, schema: any) {
  const { fileName } = normalize(schema);
  await libraryGenerator(tree, {
    name: fileName.startsWith('util-') ? fileName : `util-${fileName}`,
    directory: schema.directory,
    tags: `scope:${schema.directory},type:util`,
  });
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}

function normalize(schema: any) {
  return {
    ...schema,
    ...names(schema.name),
  };
}
