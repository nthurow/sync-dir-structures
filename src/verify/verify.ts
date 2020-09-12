import {createHash} from 'crypto';
import {readFileSync} from 'fs';
import {join} from 'path';

import {DirTree} from '../DirTree';

export function verify(
  desiredDirPath: string,
  desiredDirTree: DirTree,
  outputPath: string,
  destDirTree: DirTree
): string[] {
  const diff1 = verifyTrees(desiredDirPath, desiredDirTree, outputPath, destDirTree);
  const diff2 = verifyTrees(outputPath, destDirTree, desiredDirPath, desiredDirTree);

  return diff1.concat(diff2);
}

function verifyTrees(
  desiredDirPath: string,
  desiredDirTree: DirTree,
  outputPath: string,
  destDirTree: DirTree
): string[] {
  return (desiredDirTree.contents || []).reduce<string[]>((soFar, item) => {
    const desiredItemPath = join(desiredDirPath, desiredDirTree.name, item.name);
    const desiredItemDir = join(desiredDirPath, desiredDirTree.name);
    const outputItemPath = join(outputPath, desiredDirTree.name, item.name);
    const outputItemDir = join(outputPath, desiredDirTree.name);

    const destItem = getItem(item.name, destDirTree);

    if (!destItem) {
      return soFar.concat(desiredItemPath);
    }

    if (item.type === 'directory') {
      return soFar.concat(verify(desiredItemDir, item, outputItemDir, destItem));
    } else if (item.type === 'file' && !identical(desiredItemPath, outputItemPath)) {
      return soFar.concat(desiredItemPath);
    } else {
      return soFar;
    }
  }, []);
}

function getItem(itemName: string, dir: DirTree) {
  return (dir.contents || []).find((item) => item.name === itemName);
}

function identical(firstItemPath: string, secondItemPath: string) {
  try {
    const firstFile = readFileSync(firstItemPath);
    const secondFile = readFileSync(secondItemPath);

    const firstFileHash = createHash('sha256');
    firstFileHash.update(firstFile);

    const secondFileHash = createHash('sha256');
    secondFileHash.update(secondFile);

    return firstFileHash.digest('hex') === secondFileHash.digest('hex');
  } catch (e) {
    return false;
  }
}
