export interface DirTree {
  type: 'directory' | 'file';
  name: string;
  contents?: DirTree[];
}
