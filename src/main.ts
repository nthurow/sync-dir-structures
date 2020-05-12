import {makeDirs} from './makeDirs';
import {moveFiles} from './moveFiles';
import {pathToDirTree} from './pathToDirTree';

export function main(desiredDirPath: string, fileDirPath: string, outputPath: string) {
  const desiredDirTree = pathToDirTree(desiredDirPath);
  const actualDirTree = pathToDirTree(fileDirPath);

  const makeDirsCmds = makeDirs(desiredDirTree, outputPath);
  const mvFilesCmds = moveFiles(desiredDirTree, actualDirTree, outputPath);

  makeDirsCmds.forEach(console.log);
  mvFilesCmds.forEach(console.log);
}

main('/mnt/drives/Storage/google_drive_pictures', '/mnt/drives/Storage/pictures', '/new-dir');
