import {moveFiles} from './moveFiles';
import {DirTree} from '../DirTree';

describe('moveFiles', () => {
  it('should generate a list of commands to synchronize file structures', () => {
    const desiredStructure: DirTree = {
      type: 'directory',
      name: 'desiredStruct',
      contents: [
        {
          type: 'directory',
          name: 'fooA',
          contents: [
            {type: 'directory', name: 'fooB', contents: [{type: 'file', name: 'file4'}]},
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
            {type: 'file', name: 'file4'}
          ]
        },
        {
          type: 'directory',
          name: 'fooC',
          contents: [{type: 'directory', name: 'fooE', contents: [{type: 'file', name: 'file2'}]}]
        },
        {type: 'file', name: 'file1'}
      ]
    };

    // TODO: Make this immutable (move to a different directory)
    const expectedResult = [
      'mv ./file1 ./fooA/file1',
      'mv ./fooA/file4 ./fooA/fooB/file4',
      'mv ./fooC/fooE/file2 ./fooC/file2'
    ];

    const actualResult = moveFiles(desiredStructure, actualStructure);

    expect(actualResult).toEqual(expectedResult);
  });
});
