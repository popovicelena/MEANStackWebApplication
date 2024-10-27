import { RequestedClass } from "./requestedClass";
import { ScheduledClass } from "./scheduledClass";

export class Nastavnik{

    firstname:string;
    lastname:string;
    username:string;
    subjects:Array<string> = [];
    grade:string;
    question:string;
    cv:string;
    scheduledClasses:Array<ScheduledClass>=[];
    classRequests:Array<RequestedClass>=[];
    months:number[]=[];
    status:string;
    avggrade:number=0;
    sum:number=0;

   
    
}