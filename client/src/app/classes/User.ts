import {IUser} from '../interfaces/IUser';

export class User implements IUser {
    firstname:String;
    lastname:String;
    email:String;
    date:String;

    constructor(){
        this.firstname='';
        this.lastname='';
        this.email='';
        this.date='';
    }
}