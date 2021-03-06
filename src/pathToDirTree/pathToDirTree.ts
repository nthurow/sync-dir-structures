import {readdirSync} from 'fs';
import {join} from 'path';

import {DirTree} from '../DirTree';

function getDirContentsAsTree(path: string): DirTree[] {
  return readdirSync(path, {withFileTypes: true}).map((item) => {
    if (item.isDirectory()) {
      return {
        name: item.name,
        type: 'directory',
        contents: getDirContentsAsTree(join(path, item.name))
      };
    } else {
      return {
        name: item.name,
        type: 'file'
      };
    }
  });
}

export function pathToDirTree(path: string): DirTree {
  return {
    name: '',
    type: 'directory',
    contents: getDirContentsAsTree(path)
  };
}
