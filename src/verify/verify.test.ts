import * as fs from 'fs';

import {mocked} from 'ts-jest/utils';

import {DirTree} from '../DirTree';

import {verify} from './verify';

jest.mock('fs');
const mockedFs = mocked(fs, true);

describe('verify', () => {
  it('should find any files or directories that are not the same between the two directory structures', () => {
    mockedFs.readFileSync.mockImplementation((path) => {
      switch (path) {
        case '/desired/path/dirA1/dirB1/fileB1_1':
        case '/output/path/dirA1/dirB1/fileB1_1':
          return Buffer.from('fileB1_1');
        case '/desired/path/dirA1/dirB1/fileB1_2':
          return Buffer.from('fileB1_2');
        case '/output/path/dirA1/dirB1/fileB1_3':
          return Buffer.from('fileB1_3');
        case '/desired/path/dirA1/fileA1_1':
        case '/output/path/dirA1/fileA1_1':
          return Buffer.from('fileA1_1');
        case '/desired/path/dirA1/fileA1_2':
          return Buffer.from('fileA1_2_desired');
        case '/output/path/dirA1/fileA1_2':
          return Buffer.from('fileA1_2_output');
        default:
          throw new Error(`Unexpected path ${path}`);
      }
    });

    const desiredDirTree: DirTree = {
      name: 'dirA1',
      type: 'directory',
      contents: [
        {
          name: 'dirB1',
          type: 'directory',
          contents: [
            {
              name: 'fileB1_1', // identical
              type: 'file'
            },
            {
              name: 'fileB1_2', // only in desired
              type: 'file'
            }
          ]
        },
        {
          name: 'fileA1_1', // identical
          type: 'file'
        },
        {
          name: 'fileA1_2', // different than output
          type: 'file'
        }
      ]
    };
    const outputDirTree: DirTree = {
      name: 'dirA1',
      type: 'directory',
      contents: [
        {
          name: 'dirB1',
          type: 'directory',
          contents: [
            {
              name: 'fileB1_1', // identical
              type: 'file'
            },
            {
              name: 'fileB1_3', // only in output
              type: 'file'
            }
          ]
        },
        {
          name: 'fileA1_1', // identical
          type: 'file'
        },
        {
          name: 'fileA1_2', // different than desired
          type: 'file'
        }
      ]
    };
    const expectedResult = [
      '/desired/path/dirA1/dirB1/fileB1_2',
      '/output/path/dirA1/dirB1/fileB1_3',
      '/desired/path/dirA1/fileA1_2',
      '/output/path/dirA1/dirB1/fileB1_3',
      '/desired/path/dirA1/dirB1/fileB1_2',
      '/output/path/dirA1/fileA1_2'
    ];

    const actualResult = verify('/desired/path', desiredDirTree, '/output/path', outputDirTree);

    expect(actualResult).toEqual(expectedResult);
  });
});
