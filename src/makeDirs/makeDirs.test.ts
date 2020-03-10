import {makeDirs} from './makeDirs';
import {DirTree} from '../DirTree';

describe('makeDirs', () => {
  it('should generate a list of commands to synchronize directory structures', () => {
    const desiredStructure: DirTree = {
      type: 'directory',
      name: 'desiredStruct',
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

    const actualStructure: DirTree = {
      type: 'directory',
      name: 'actualStruct',
      contents: [
        {
          type: 'directory',
          name: 'fooA',
          contents: [
            {type: 'directory', name: 'fooB', contents: []},
            {type: 'file', name: 'file2'}
          ]
        },
        {
          type: 'directory',
          name: 'fooC',
          contents: [
            {type: 'directory', name: 'fooE', contents: []},
            {type: 'file', name: 'file1'}
          ]
        }
      ]
    };

    const expectedResult = ['mkdir ./fooC/fooD', 'mkdir ./fooE'];

    const actualResult = makeDirs(desiredStructure, actualStructure);

    expect(actualResult).toEqual(expectedResult);
  });
});
