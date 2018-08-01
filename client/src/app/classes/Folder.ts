import {IFolder} from '../interfaces/IFolder';

export class Folder implements IFolder {
    name:String;
    type:String;
    children:Array<JSON>;

    constructor(){
        this.name='';
        this.type='';
        this.children=[];
    }
}