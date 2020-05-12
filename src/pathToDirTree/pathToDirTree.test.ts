import * as fs from 'fs';
import {mocked} from 'ts-jest/utils';

import {DirTree} from '../DirTree';

import {pathToDirTree} from './';

jest.mock('fs');
const mockedFs = mocked(fs, true);

describe('pathToDirTree', () => {
  it('should generate a dir tree based off of a file path', () => {
    /*
     * Mock structure:
     * ----------------
     * rootPath/rootDir/
     *   file1
     *   dirA/
     *     file2
     *     dirB/
     *       file3
     *   dirC/
     *     file4
     *     dirD/
     */

    mockedFs.readdirSync.mockImplementation((dir, options) => {
      let returnVal: any;

      if (dir === 'rootPath/rootDir') {
        returnVal = [
          {name: 'file1', isDirectory: jest.fn().mockReturnValue(false)},
          {name: 'dirA', isDirectory: jest.fn().mockReturnValue(true)},
          {name: 'dirC', isDirectory: jest.fn().mockReturnValue(true)}
        ];
      } else if (dir === 'rootPath/rootDir/dirA') {
        returnVal = [
          {name: 'file2', isDirectory: jest.fn().mockReturnValue(false)},
          {name: 'dirB', isDirectory: jest.fn().mockReturnValue(true)}
        ];
      } else if (dir === 'rootPath/rootDir/dirA/dirB') {
        returnVal = [{name: 'file3', isDirectory: jest.fn().mockReturnValue(false)}];
      } else if (dir === 'rootPath/rootDir/dirC') {
        returnVal = [
          {name: 'file4', isDirectory: jest.fn().mockReturnValue(false)},
          {name: 'dirD', isDirectory: jest.fn().mockReturnValue(true)}
        ];
      } else if (dir === 'rootPath/rootDir/dirC/dirD') {
        returnVal = [];
      } else {
        throw new Error(`Unknown mock path "${dir}"`);
      }

      return returnVal;
    });

    const expectedResult: DirTree = {
      name: 'rootPath/rootDir',
      type: 'directory',
      contents: [
        {
          name: 'file1',
          type: 'file'
        },
        {
          name: 'dirA',
          type: 'directory',
          contents: [
            {
              name: 'file2',
              type: 'file'
            },
            {
              name: 'dirB',
              type: 'directory',
              contents: [
                {
                  name: 'file3',
                  type: 'file'
                }
              ]
            }
          ]
        },
        {
          name: 'dirC',
          type: 'directory',
          contents: [
            {
              name: 'file4',
              type: 'file'
            },
            {
              name: 'dirD',
              type: 'directory',
              contents: []
            }
          ]
        }
      ]
    };

    const actualResult = pathToDirTree('rootPath/rootDir');

    expect(actualResult).toEqual(expectedResult);
  });
});
