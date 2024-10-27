import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from 'src/models/user';
import { NastavnikService } from '../services/nastavnik.service';
import { Nastavnik } from 'src/models/nastavnik';
import { FormControl } from '@angular/forms';
import { CasService } from '../services/cas.service';
import { UcenikService } from '../services/ucenik.service';
import { Cas } from 'src/models/cas';
import { Ucenik } from 'src/models/ucenik';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit{

  constructor(private route: ActivatedRoute, private service:UserService,private nastavnikservice:NastavnikService,
    private casService:CasService, private ucenikService:UcenikService,private router:Router){}

  ngOnInit(): void {


    this.now=new Date();

    this.student=localStorage.getItem('ulogovan')
    
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.service.usernamecheck(this.username).subscribe((usr:User)=>{
        this.user=usr;
        

        this.nastavnikservice.getTeacher(this.user.username).subscribe((tech:Nastavnik)=>{
          if(tech.subjects.length==1){
            this.class=tech.subjects[0];
          }
            this.teacher=tech;

            this.service.usernamecheck(this.student).subscribe((usr:User)=>{
              this.stud=usr;
            })
            
        })

        this.nastavnikservice.getTeachersClass(this.user.username).subscribe((cl:Cas[])=>{
          this.classes=cl;
          
        })


      })
      
    });

  }

  id:number=0;

  stud:User=new User();
  student:string="";
  username:string;
  user:User = new User();
  teacher:Nastavnik = new Nastavnik();
  minDate:Date=new Date();
  maxDate:Date=new Date(2024,12,31);
  disabled:boolean=false;
  dateControl:FormControl=new FormControl("");
  date:Date;
  datetime:string="";
  class:string="";
  doubleClass:Boolean=false;
  themes:String="";
  now:Date;
  classes:Array<Cas>=[];
  
  timeoftheclass:Date;
  errormessage:string;
  end:Date;
  end2:Date;

  idN:Number;

   doTimePeriodsOverlap(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
    return start1 < end2 && end1 > start2 || start2 < end1 && end2 > start1 || start1==start2;
  }

  addClass(){


    
    if(!this.timeoftheclass || this.class==""){
      this.errormessage="Chose date, time and name of the class you want to schedule!";
      return;
    }else{
      this.errormessage="";
    }

    if(this.doubleClass){
      this.end=new Date(this.timeoftheclass);
      this.end.setMinutes(this.end.getMinutes()+90);
    }else{
      this.end=new Date(this.timeoftheclass);
      this.end.setMinutes(this.end.getMinutes()+45);
    }

    let workbegin=new Date(this.timeoftheclass);
    workbegin.setHours(10,0);
    
    let workend=new Date(this.timeoftheclass);
    workend.setHours(18,0);
    
    if(this.timeoftheclass<workbegin || this.end>workend){
      this.errormessage="working hours: 10:00-18:00"
      return;
    }

    if(this.timeoftheclass.getDay()==0 || this.timeoftheclass.getDay()==6){
      alert("Saturday and Sunday are non-working days!")
      return;
    }

    // if(this.timeoftheclass<=this.now){
    //   alert("invalid date or time!")
    //   return;
    // }

   
    
   
    

    // if(!this.datetime){
    //   this.errormessage="Chose date and time of the class you want to schedule!";
    //   return;
    // }else{
    //   this.errormessage="";
    // }

    //let date = new Date(this.datetime)
    //this.datetime=date.toLocaleString();
    

    // this.timeoftheclass=new Date(this.datetime);
 
    // if(this.doubleClass){
    //   this.end=this.timeoftheclass;
    //   this.end.setMinutes(this.end.getMinutes()+90);
    // }else{
    //   this.end=this.timeoftheclass;
    //   this.end.setMinutes(this.end.getMinutes()+45);
    // }
    // alert(this.end)


    // for(let i=0;i<this.teacher.scheduledClasses.length;i++){
    //   if(this.teacher.scheduledClasses[i].doubleclass){
    //     this.end2=new Date(this.teacher.scheduledClasses[i].time);
        
    //     this.end2.setMinutes(this.end2.getMinutes()+90);
    //     alert("end2")
    //     alert(this.end2)
    //   }else{
        
    //     this.end2=new Date(this.teacher.scheduledClasses[i].time);
    //     this.end2.setMinutes(this.end2.getMinutes()+45);
    //     alert("end2")
    //     alert(this.end2)
    //   }
    //  if(this.doTimePeriodsOverlap(this.timeoftheclass,this.end,new Date(this.teacher.scheduledClasses[i].time),this.end2)){
    //   alert("Teacher is beasy, please choose another ");
    //   return;
      
    //  }
    // }
      // this.casService.addClass(this.teacher.username,this.student,this.class,this.datetime,this.doubleClass,this.themes).subscribe(resp=>{
     
    //   this.nastavnikservice.addScheduledClass(this.teacher.username,this.class,this.datetime,this.doubleClass).subscribe(resp=>{
       
    //     this.ucenikService.addclass(this.student,this.teacher.username,this.class,this.teacher.firstname,this.teacher.lastname,this.timeoftheclass.toDateString()+" "+this.timeoftheclass.toTimeString(),this.end.toDateString()+" "+this.end.toTimeString(),"").subscribe(resp=>{
    //       alert(resp["message"])
    //     })
    //   })
    // })


    
 
    if(this.doubleClass){
      this.end=new Date(this.timeoftheclass);
      this.end.setMinutes(this.end.getMinutes()+90);
    }else{
      this.end=new Date(this.timeoftheclass);
      this.end.setMinutes(this.end.getMinutes()+45);
    }
    


    for(let i=0;i<this.teacher.scheduledClasses.length;i++){
      if(this.teacher.scheduledClasses[i].doubleclass){
        this.end2=new Date(this.teacher.scheduledClasses[i].time);
        
        this.end2.setMinutes(this.end2.getMinutes()+90);
      }else{
        
        this.end2=new Date(this.teacher.scheduledClasses[i].time);
        this.end2.setMinutes(this.end2.getMinutes()+45);
        
      }
     if(this.doTimePeriodsOverlap(this.timeoftheclass,this.end,new Date(this.teacher.scheduledClasses[i].time),this.end2)){
      alert("Teacher is beasy, please choose another ");
      return;
      
     }
    }


    
  

    this.casService.getObj().subscribe((cas:Cas)=>{

      if(cas!=null){

        this.idN=cas.idN+1

      }else{
        this.idN=0;
      }

      this.casService.addClass(this.idN,this.teacher.username,this.student,this.class,this.timeoftheclass.toString(),this.doubleClass,this.themes,"",0).subscribe(resp=>{
     

        this.nastavnikservice.addClassRequest(this.idN,this.class,this.teacher.username,this.stud.firstname,this.stud.lastname,this.themes,0,this.timeoftheclass.toString(),this.end.toString(),this.doubleClass,this.student).subscribe(resp=>{
          alert(resp["message"]);
        })
        // this.nastavnikservice.addScheduledClass(this.idN,this.teacher.username,this.class,this.timeoftheclass.toString(),this.doubleClass).subscribe(resp=>{
         
        //   this.ucenikService.addclass(this.idN,this.student,this.teacher.username,this.class,this.teacher.firstname,this.teacher.lastname,this.timeoftheclass.toString(),this.end.toString(),"",this.themes).subscribe(resp=>{
        //     alert(resp["message"])
        //     this.ngOnInit();
        //   })
        // })
      })
      
    })


    
   
   
  

  }

  button(){
    alert(this.timeoftheclass.getFullYear())
  }

  logout(){
    localStorage.clear();
    this.router.navigate([''])
  }


}
