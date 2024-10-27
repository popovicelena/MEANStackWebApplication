import { last } from "rxjs";

export class Teacher{

    constructor(username:string,firstname:string,lastname:string){
        this.username=username;
        this.firstname=firstname;
        this.lastname=lastname;
        
    }

    username:string;
    firstname:string;
    lastname:string;
    cv:string;
}