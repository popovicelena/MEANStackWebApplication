import { Component, OnInit } from '@angular/core';
import { Ucenik } from 'src/models/ucenik';
import { User } from 'src/models/user';
import { UcenikService } from '../services/ucenik.service';
import { Nastavnik } from 'src/models/nastavnik';
import { UserService } from '../services/user.service';
import { NastavnikService } from '../services/nastavnik.service';
import { Cas } from 'src/models/cas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nastavnici',
  templateUrl: './nastavnici.component.html',
  styleUrls: ['./nastavnici.component.css']
})
export class NastavniciComponent implements OnInit{

  constructor(private service:UcenikService,private userservice:UserService, private nastavnikService:NastavnikService,
    private router:Router){}

  ngOnInit(): void {

    

    this.ulogovan = JSON.parse(localStorage.getItem("logedInUser"));
    this.service.getSudent(this.ulogovan.username).subscribe((user:Ucenik)=>{
      this.student=user;

      
      if(this.student.school.includes('srednja')){

        this.service.getTeachers("srednja skola").subscribe((teach:Nastavnik[])=>{

          teach.forEach(t=>{
            t.sum=0;
            
            this.nastavnikService.getTeachersClass(t.username).subscribe((casovi:Cas[])=>{
              let sum = 0;


              casovi.forEach(c=>{
                
                if(c.rating>0){
                  this.ratedclasses.push(c.rating);
                  
                }
                
              })

              this.ratedclasses.forEach(c=>{
                t.sum=c+t.sum;
              })
              t.avggrade=t.sum/this.ratedclasses.length;
            })
            
            this.userservice.usernamecheck(t.username).subscribe((user:User)=>{
              
              if(user.active){
                
                this.teachers.push(t);
              }
            })
          })
          
        })

      }else{

        this.service.getTeachers((this.student.grade<=4)?"1-4":"5-8").subscribe((teach:Nastavnik[])=>{
          teach.forEach(t=>{

            t.sum=0;

            this.nastavnikService.getTeachersClass(t.username).subscribe((casovi:Cas[])=>{
              let sum = 0;
              casovi.forEach(c=>{
                
                if(c.rating>0){
                  this.ratedclasses.push(c.rating);
                  
                }
                
              })

              this.ratedclasses.forEach(c=>{
                t.sum=c+t.sum;
              })
              t.avggrade=t.sum/this.ratedclasses.length;
              
            })
            
            this.userservice.usernamecheck(t.username).subscribe((user:User)=>{
              
              if(user.active){
                
                this.teachers.push(t);
              }
            })
          })
        })

      }

      
      
    })


    
    
  }

  
  sum:number=0;
  student:Ucenik;
  teachers:Nastavnik[]=[];
  ulogovan:User;
  grade:number;
  searchedTeachers:Nastavnik[]=[];
  searchfirstname:string="";
  searchlastname:string="";
  searchsubject:string="";
  ratedclasses:Array<number>=[];
  //link:HTMLElement=document.getElementById("link");
  



 

  search(){

    

  //   const link = document.getElementById("link") as HTMLAnchorElement;

  // // Pristupamo dataset objektu elementa linka
  //   const username = link.dataset['username'];
  //   alert(username)
  
  

    this.searchedTeachers = [];
    
    this.nastavnikService.searchTeacher(this.searchfirstname,this.searchlastname,this.searchsubject).subscribe((users:Nastavnik[])=>{
      
    
      
      if(users!=null){
        

        users.forEach(u=>{
          this.userservice.usernamecheck(u.username).subscribe((usr:User)=>{
            if(usr.active){
              this.searchedTeachers.push(u)
            }
          })
        })

        //this.searchedTeachers=users;
      }
      
    })

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }



}
