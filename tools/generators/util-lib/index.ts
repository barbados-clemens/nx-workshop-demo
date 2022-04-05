import { Tree, formatFiles, installPackagesTask, names } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

interface Schema {
  name: string;
  directory: 'api' | 'shared' | 'store' | 'video-games';
}

export default async function (tree: Tree, schema: Schema) {
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

function normalize(schema: Schema) {
  return {
    ...schema,
    ...names(schema.name),
  };
}
