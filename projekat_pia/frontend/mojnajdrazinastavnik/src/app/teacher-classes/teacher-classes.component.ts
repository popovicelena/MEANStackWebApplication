import { Component, OnInit } from '@angular/core';
import { Nastavnik } from 'src/models/nastavnik';
import { NastavnikService } from '../services/nastavnik.service';
import { UcenikService } from '../services/ucenik.service';
import { ScheduledClass } from 'src/models/scheduledClass';
import { CasService } from '../services/cas.service';
import { Ucenik } from 'src/models/ucenik';
import { User } from 'src/models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-classes',
  templateUrl: './teacher-classes.component.html',
  styleUrls: ['./teacher-classes.component.css']
})
export class TeacherClassesComponent implements OnInit {

  constructor(private nastavnikService:NastavnikService, private ucenikService:UcenikService, private casService:CasService,
    private userService:UserService, private router:Router){}

  ngOnInit(): void {

    this.firstfive=[];
    this.futureclasses=[];
    

    this.username=localStorage.getItem('ulogovan')

    this.userService.usernamecheck(this.username).subscribe((usr:User)=>{

      this.ulogovan=usr
    })
     
    

    this.nastavnikService.getTeacher(this.username).subscribe((usr:Nastavnik)=>{
      this.teacher=usr;

      
      this.teacher.classRequests.forEach(s=>{

        
      
        
        s.canceled="";
        let datum = new Date(s.begin);
        

        let dan = datum.getDate();
        let mesec = datum.getMonth() + 1; 
        let godina = datum.getFullYear();
        let sati = datum.getHours();
        let minuti = datum.getMinutes();
        let min = minuti.toString().padStart(2, '0');
        
         s.formatedBegin = `${dan}/${mesec}/${godina}, ${sati}:${min}`;

          datum = new Date(s.end);
          

          dan = datum.getDate();
          mesec = datum.getMonth() + 1; 
          godina = datum.getFullYear();
          sati = datum.getHours();
          minuti = datum.getMinutes();
          min = minuti.toString().padStart(2, '0');
 
         
          s.formattedEnd= `${sati}:${min}`;

      })

      this.teacher.scheduledClasses.forEach(s=>{
        let datum = new Date(s.time);
        let now = new Date();
        let date = new Date(s.time)
        date.setMinutes(date.getMinutes()-15);
        if(date<=now && now<=datum){
          s.join=true;
        }
        

        let dan = datum.getDate();
        let mesec = datum.getMonth() + 1; 
        let godina = datum.getFullYear();
        let sati = datum.getHours();
        let minuti = datum.getMinutes();
        let min = minuti.toString().padStart(2, '0');
        
         s.formatedtime = `${dan}/${mesec}/${godina}, ${sati}:${min}`;

      

      })


      this.teacher.scheduledClasses.sort((a,b)=>{

        const datumA = new Date(a.time);
        const datumB = new Date(b.time);
        
        if (datumA < datumB) {
            return -1; // Ako datumA treba da ide pre datumB, vratimo negativnu vrednost
        }
        if (datumA > datumB) {
            return 1; // Ako datumA treba da ide posle datumB, vratimo pozitivnu vrednost
        }
        return 0; 
      })

      this.teacher.scheduledClasses.forEach(c=>{
        let now = new Date();
        let date = new Date(c.time);
        if(date>=now){
          this.futureclasses.push(c);
        }
      })
      

      if(this.teacher.scheduledClasses.length<=5){

        this.teacher.scheduledClasses.forEach(s=>{

          let date = new Date(s.time)
          let threedays=new Date();
          let now = new Date();
          threedays.setDate(threedays.getDate()+3);

          if(date>=now && date<=threedays){
            this.firstfive.push(s);
          }

        })


      }else{

        let i = 1;
        this.teacher.scheduledClasses.forEach(s=>{
          

          let date = new Date(s.time)
          let threedays=new Date();
          threedays.setDate(threedays.getDate()+3);
          let now=new Date();
          
          

          if(date>=now && date<=threedays && i<=5){
            this.firstfive.push(s);
            i++;

          }
          

        })

      }

      this.teacher.classRequests.forEach(s=>{
        s.avg=0
        this.ucenikService.getSudent(s.studentusername).subscribe((stud:Ucenik)=>{
          stud.studentgrades=[]
          stud.scheduledClasses.forEach(c=>{
    
            
            if(c.teachersgrade>0){
              stud.studentgrades.push(c.teachersgrade);
              
            }
    
          })
          stud.studentgrades.forEach(g=>{
            s.avg+=g;
          })
    
    
          if(stud.studentgrades.length>=3){
    
          
            s.avg=s.avg/stud.studentgrades.length;
            
          
          
          }else{
            s.avg=0
          }
            
    
           })

      })
    })
   
  }

  getAvgGrade(username){
    let avg=0;
    this.ucenikService.getSudent(username).subscribe((stud:Ucenik)=>{
      stud.studentgrades=[]
      stud.scheduledClasses.forEach(s=>{

        
        if(s.teachersgrade>0){
          stud.studentgrades.push(s.teachersgrade);
          
        }

      })
      stud.studentgrades.forEach(s=>{
        avg+=s;
      })


      if(stud.studentgrades.length>0){

      
        avg=avg/stud.studentgrades.length;
        
      
      
      }
        stud.avg=avg;

       })
    
  }

  // if(s.teachersgrade>0){
  //   this.studgrades.push(s.teachersgrade);
  // }
  // this.studgrades.forEach(s=>{
    
  //   this.avg+=s;
  // })

  // if(this.studgrades.length>0){
  //   this.avg=this.avg/this.studgrades.length;
    
  // }
 

  teacher:Nastavnik=new Nastavnik();
  username:string;
  showall:boolean=false;
  firstfive:Array<ScheduledClass>=[];
  canceled:string;
  studgrades:Array<number>=[];
  avg:number=0;
  ulogovan:User=new User();
  futureclasses:ScheduledClass[]=[];

  accept(id,subject,firstname,lastname,begin,double,end,themes,studentusername){

      this.nastavnikService.addScheduledClass(id,this.teacher.username,subject,begin,double,firstname,lastname,studentusername).subscribe(resp=>{
         
       
          this.ucenikService.addclass(id,studentusername,this.teacher.username,subject,this.teacher.firstname,this.teacher.lastname,begin,end,"",themes).subscribe(resp=>{
            
            
            this.nastavnikService.removeClassRequest(id,this.teacher.username).subscribe(resp=>{
              alert(resp["message"]);
              this.ngOnInit();
            })
            
          })
        })

  }

  showAll(){
    this.showall=!this.showall;
  }

  deny(id,canceled){


    
   
    if(canceled==""){
      alert("You have to leave a comment in case you deny a class!")
      return;
    }

    
    this.nastavnikService.removeClassRequest(id,this.teacher.username).subscribe(resp=>{

      this.casService.denyClass(id,canceled).subscribe(resp=>{

        alert(resp["message"]);
      this.ngOnInit();
      })
      
    })

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }
}
