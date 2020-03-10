import {makeDirs} from './makeDirs';
import {DirTree} from '../DirTree';

describe('makeDirs', () => {
  it('should generate a list of commands to synchronize directory structures', () => {
    const desiredStructure: DirTree = {
      type: 'directory',
      name: 'desiredStruct/subDesiredStruct',
      contents: [
        {
          type: 'directory',
          name: 'fooA',
          contents: [
            {type: 'directory', name: 'fooB', contents: []},
            {type: 'file', name: 'file1'}
          ]
        },
        {
          type: 'directory',
          name: 'fooC',
          contents: [
            {type: 'directory', name: 'fooD', contents: []},
            {type: 'file', name: 'file2'}
          ]
        },
        {type: 'file', name: 'file3'},
        {type: 'directory', name: 'fooE', contents: []}
      ]
    };

    const expectedResult = [
      'mkdir ../outDir/fooA',
      'mkdir ../outDir/fooA/fooB',
      'mkdir ../outDir/fooC',
      'mkdir ../outDir/fooC/fooD',
      'mkdir ../outDir/fooE'
    ];

    const actualResult = makeDirs(desiredStructure, '../outDir');

    expect(actualResult).toEqual(expectedResult);
  });
});
