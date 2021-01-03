import {join} from 'path';
import {DirTree} from '../DirTree';

interface FileTree {
  name: string;
  path: string;
}

function buildFileList(struct: DirTree, rootDir: string): FileTree[] {
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

export function moveFiles(desiredStructure: DirTree, actualStructure: DirTree, outDir: string) {
  const sourceFileList = buildFileList(desiredStructure, '');
  const desiredFileList = buildFileList(desiredStructure, outDir);
  const actualFileList = buildFileList(actualStructure, actualStructure.name);

  return desiredFileList
    .map((desiredFile) => {
      const actualFile = actualFileList.find((node) => node.name === desiredFile.name);
      const sourceFile = sourceFileList.find((node) => node.name === desiredFile.name);

      if (actualFile) {
        return `cp -p "${actualFile.path}" "${desiredFile.path}"`;
      } else if (sourceFile) {
        return `cp -p "${join(desiredStructure.name, sourceFile.path)}" "${desiredFile.path}"`;
      } else {
        return undefined;
      }
    })
    .filter((operation) => !!operation);
}
