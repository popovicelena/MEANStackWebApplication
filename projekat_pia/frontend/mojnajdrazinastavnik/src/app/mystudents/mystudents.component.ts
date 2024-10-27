import { Component, OnInit } from '@angular/core';
import { Nastavnik } from 'src/models/nastavnik';
import { User } from 'src/models/user';
import { NastavnikService } from '../services/nastavnik.service';
import { UserService } from '../services/user.service';
import { Name } from 'src/models/namesurname';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mystudents',
  templateUrl: './mystudents.component.html',
  styleUrls: ['./mystudents.component.css']
})
export class MystudentsComponent implements OnInit {

  constructor(private nastavnikservice:NastavnikService,private service:UserService, private router:Router){}

  ngOnInit(): void {
   

    this.user= JSON.parse(localStorage.getItem("logedInUser"))
    
      this.service.usernamecheck(this.user.username).subscribe((usr:User)=>{
        this.user=usr;

        this.nastavnikservice.getTeacher(this.user.username).subscribe((tech:Nastavnik)=>{
            this.teacher=tech;

            this.teacher.scheduledClasses.forEach(s=>{
              
              let name=new Name();
              name.firstname=s.firstname;
              name.lastname=s.lastname;
              name.username=s.studentusername;

              this.students.push(name)
             
              
              
            })

            

          
           
          
            this.students=this.students.filter((student, index, self) =>
            index == self.findIndex(s => (
                s.firstname == student.firstname && s.lastname == student.lastname
            ))
        );
        })


      })

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  username:string="";
  user:User= new User();
  teacher:Nastavnik=new Nastavnik();
  students:Array<Name>=[];

}
