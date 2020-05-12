import {moveFiles} from './moveFiles';
import {DirTree} from '../DirTree';

describe('moveFiles', () => {
  it('should generate a list of commands to synchronize file structures', () => {
    const desiredStructure: DirTree = {
      type: 'directory',
      name: '../desiredStruct',
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
      name: 'actualStruct/subStruct',
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
      'cp actualStruct/subStruct/file1 /final/dest/fooA/file1',
      'cp actualStruct/subStruct/fooA/file4 /final/dest/fooA/fooB/file4',
      'cp actualStruct/subStruct/fooC/fooE/file2 /final/dest/fooC/file2'
    ];

    const actualResult = moveFiles(desiredStructure, actualStructure, '/final/dest');

    expect(actualResult).toEqual(expectedResult);
  });
});
