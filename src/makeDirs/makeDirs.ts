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

export function makeDirs(desired: DirTree, actual: DirTree) {
  const desiredDirs = getDirs(desired);
  const actualDirs = getDirs(actual);

  return desiredDirs
    .filter((desiredDir) => {
      return actualDirs.indexOf(desiredDir) === -1;
    })
    .map((missingDir) => {
      return `mkdir ${missingDir}`;
    });
}
