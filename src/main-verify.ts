import {verify} from './verify';
import {pathToDirTree} from './pathToDirTree';

export function main(desiredDirPath: string, outputPath: string) {
  const desiredDirTree = pathToDirTree(desiredDirPath);
  const actualDirTree = pathToDirTree(outputPath);

  const diff = verify(desiredDirPath, desiredDirTree, outputPath, actualDirTree);

  diff.forEach((diff) => console.log(diff));
}

main('/mnt/drives/Storage/google_drive_pictures', '/mnt/drives/Storage/pics_temp');
