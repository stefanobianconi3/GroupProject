import { IFolder } from '../interfaces/IFolder';

export class Folder implements IFolder {
  name: String;
  type: String;
  children: Array<JSON>;
  selected: boolean;

  constructor(name?: string, type?: string, children?: Array<any>) {
    this.name = name || '';
    this.type = type || '';
    this.children = children || [];
    this.selected = false;
  }
}
