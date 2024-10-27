import { Component, OnInit } from '@angular/core';
import { Nastavnik } from 'src/models/nastavnik';
import { Predmet } from 'src/models/predmet';
import { UserService } from '../services/user.service';
import { NastavnikService } from '../services/nastavnik.service';
import { User } from 'src/models/user';
import { Cas } from 'src/models/cas';


@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {


  constructor(private service:UserService, private nastavnikService:NastavnikService){}

  ngOnInit(): void {

    this.lastmonth=0;
    this.lastweek=0;

    this.service.getStudentsNum().subscribe((num:number)=>{
      this.numstudents=num;
  })

  this.service.getTeachersNum().subscribe((num:number)=>{
    this.numteachers=num;
  })

  this.service.getAllSubjects().subscribe((subj:Predmet[])=>{
    this.allSubjects=subj;
  })

  this.service.getAllClasses().subscribe((cas:Cas[])=>{
    this.allClasses=cas;

    let now = new Date();
    let week= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    let month = new Date(now)
    month.setMonth(month.getMonth()-1);
   
    
    this.allClasses.forEach(c=>{
      
      if(c.canceled==""){

        let date = new Date(c.datetime);
        if(date<now && date>=week){
          this.lastweek++;
        }
        if(date<now && date>=month){
          this.lastmonth++;
        }

      }
    
    })
  })
  
    
  }




  numstudents:number;
  numteachers:number;
  allSubjects:Predmet[]=[];
  searchedTeachers:Nastavnik[]=[];
  lastweek:number=0;
  lastmonth:number=0;
  allClasses:Array<Cas>=[]
  filtriran:Array<Predmet>=[];
  noprof:Array<Predmet>=[];


  sortBySubjectUp(){
    this.allSubjects.sort((subj1,subj2)=>{
      if(subj1.subject<subj2.subject){
        return -1;
      }else if(subj2.subject>subj1.subject){
        return 1
      }else {
        return 0;
      }
    });
    
  }
  sortBySubjectDown(){
    this.allSubjects.sort((subj1,subj2)=>{
      if(subj1.subject<subj2.subject){
        return 1;
      }else if(subj1.subject>subj2.subject){
        return -1
      }else {
        return 0;
      }
    });
  }
  sortByFirstnameUp(){

  this.allSubjects.forEach(subj=>{
    subj.professors.sort((prof1,prof2)=>{
      if(prof1.firstname<prof2.firstname){
        return -1;
      }else if(prof1.firstname>prof2.firstname){
        return 1
      }else {
        return 0;
      }
    });
  })

  this.filtriran=this.allSubjects.filter(c=>c.professors.length>0)
  this.noprof=this.allSubjects.filter(c=>c.professors.length==0);

 
  this.filtriran.sort((subj1,subj2)=>{
    
  
      if(subj1.professors[0].firstname<subj2.professors[0].firstname){
        return -1;
      }else if (subj1.professors[0].firstname>subj2.professors[0].firstname){
        return 1;
      }else{
        return 0;
      }
    
 
  })

  this.noprof.forEach(p=>{
    this.filtriran.push(p)
  })
  

  this.allSubjects=this.filtriran;

  
  
    
  }
  sortByFirstnameDown(){


  this.allSubjects.forEach(subj=>{
    subj.professors.sort((prof1,prof2)=>{
      if(prof1.firstname<prof2.firstname){
        return 1;
      }else if(prof1.firstname>prof2.firstname){
        return -1
      }else {
        return 0;
      }
    });
  })

  this.filtriran=this.allSubjects.filter(c=>c.professors.length>0)
  this.noprof=this.allSubjects.filter(c=>c.professors.length==0);

 
  this.filtriran.sort((subj1,subj2)=>{
    
  
      if(subj1.professors[0].firstname<subj2.professors[0].firstname){
        return 1;
      }else if (subj1.professors[0].firstname>subj2.professors[0].firstname){
        return -1;
      }else{
        return 0;
      }
    
 
  })

  this.noprof.forEach(p=>{
    this.filtriran.push(p)
  })
  

  this.allSubjects=this.filtriran;
    
  }
  sortByLastnameUp(){


  this.allSubjects.forEach(subj=>{
    subj.professors.sort((prof1,prof2)=>{
      if(prof1.lastname<prof2.lastname){
        return -1;
      }else if(prof1.lastname>prof2.lastname){
        return 1
      }else {
        return 0;
      }
    });
  })

  this.filtriran=this.allSubjects.filter(c=>c.professors.length>0);
  this.noprof=this.allSubjects.filter(c=>c.professors.length==0)

  this.filtriran.sort((subj1,subj2)=>{
    if(subj1.professors[0].lastname<subj2.professors[0].lastname){
      return -1
    }else if (subj1.professors[0].lastname<subj2.professors[0].lastname){
      return 1
    }else{
      return 0;
    }
  })

  this.noprof.forEach(p=>{
    this.filtriran.push(p);
  })

  this.allSubjects=this.filtriran;
  }
  sortByLastnameDown(){
    this.allSubjects.forEach(subj=>{
      subj.professors.sort((prof1,prof2)=>{
        if(prof1.lastname<prof2.lastname){
          return 1;
        }else if(prof1.lastname>prof2.lastname){
          return -1
        }else {
          return 0;
        }
      });

    })

    this.filtriran=this.allSubjects.filter(c=>c.professors.length>0);
    this.noprof=this.allSubjects.filter(c=>c.professors.length==0);

    this.filtriran.sort((subj1,subj2)=>{
      if(subj1.professors[0].lastname<subj2.professors[0].lastname){
        return 1;
      }else if (subj1.professors[0].lastname>subj2.professors[0].lastname){
        return -1;
      }else{
        return 0;
      }
    })

    this.noprof.forEach(p=>{
      this.filtriran.push(p);
    })

    this.allSubjects=this.filtriran;
  }

  
  searchfirstname:string="";
  searchlastname:string="";
  searchsubject:string="";

  search(){

    this.searchedTeachers = [];
    
    this.nastavnikService.searchTeacher(this.searchfirstname,this.searchlastname,this.searchsubject).subscribe((users:Nastavnik[])=>{
      
    
      
      if(users!=null){
        

        users.forEach(u=>{
          this.service.usernamecheck(u.username).subscribe((usr:User)=>{
            if(usr.active){
              this.searchedTeachers.push(u)
            }
          })
        })

        //this.searchedTeachers=users;
      }
      
    })

  }

}
