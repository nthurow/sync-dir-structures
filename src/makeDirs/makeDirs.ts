import {DirTree} from '../DirTree';

function getDirs(tree: DirTree, root = '.'): string[] {
  if (!tree.contents) {
    throw new Error('Passed a file, expected a directory');
  }

  return tree.contents
    .filter((subDir) => {
      return subDir.type === 'directory';
    })
    .map((subDir) => {
      const newRoot = `${root}/${subDir.name}`;

      return [newRoot, ...getDirs(subDir, newRoot)];
    })
    .reduce((dirsSoFar, currentDirs) => {
      return [...dirsSoFar, ...currentDirs];
    }, []);
}

export function makeDirs(desired: DirTree, outDir: string) {
  const desiredDirs = getDirs(desired, outDir);

  return desiredDirs.map((missingDir) => {
    return `mkdir "${missingDir}"`;
  });
}
