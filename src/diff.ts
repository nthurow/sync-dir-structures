import {DirTree} from './DirTree';

function diffContents(rootDir: string, desiredTree: DirTree, currentTree: DirTree) {
  return desiredTree.contents.map((subTree) => {
    const currentSubTree = currentTree.contents.find(
      (currentTreeChild) => currentTreeChild.type === subTree.type && currentTreeChild.name === subTree.name
    );

    //return diff(
  });
}

export function diff(rootDir: string, desiredTree: DirTree, currentTree: DirTree) {
  if (desiredTree.type === currentTree.type && desiredTree.name === currentTree.name) {
    //return desiredTree.contents.map(
  }
}
