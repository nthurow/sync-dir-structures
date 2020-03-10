import {DirTree} from '../DirTree';

interface FileTree {
  name: string;
  path: string;
}

function buildFileList(struct: DirTree, rootDir = '.'): FileTree[] {
  if (!struct.contents) {
    throw new Error('Received file, expected directory');
  }

  const files = struct.contents
    .filter((node) => node.type === 'file')
    .map((node) => ({
      name: node.name,
      path: `${rootDir}/${node.name}`
    }));

  const dirs = struct.contents
    .filter((node) => node.type === 'directory')
    .map((node) => {
      return buildFileList(node, `${rootDir}/${node.name}`);
    })
    .reduce((soFar, current) => {
      return [...soFar, ...current];
    }, []);

  return [...files, ...dirs];
}

export function moveFiles(desiredStructure: DirTree, actualStructure: DirTree) {
  const desiredFileList = buildFileList(desiredStructure);
  const actualFileList = buildFileList(actualStructure);

  return desiredFileList
    .filter((desiredFile) => {
      return !actualFileList.find((node) => node.path === desiredFile.path);
    })
    .map((desiredFile) => {
      const actualFile = actualFileList.find((node) => node.name === desiredFile.name);

      return actualFile && `mv ${actualFile.path} ${desiredFile.path}`;
    })
    .filter((operation) => !!operation);
}
