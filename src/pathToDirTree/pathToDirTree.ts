import {readdirSync} from 'fs';
import {join} from 'path';

import {DirTree} from '../DirTree';

function getDirContentsAsTree(root: string, path: string): DirTree[] {
  return readdirSync(join(root, path), {withFileTypes: true}).map((item) => {
    if (item.isDirectory()) {
      return {
        name: item.name,
        type: 'directory',
        contents: getDirContentsAsTree(root, join(path, item.name))
      };
    } else {
      return {
        name: item.name,
        type: 'file'
      };
    }
  });
}

export function pathToDirTree(root: string, path: string): DirTree {
  return {
    name: path,
    type: 'directory',
    contents: getDirContentsAsTree(root, path)
  };
}
