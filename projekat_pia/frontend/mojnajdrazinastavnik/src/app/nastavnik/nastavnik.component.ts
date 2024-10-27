import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NastavnikService } from '../services/nastavnik.service';
import { User } from 'src/models/user';
import { Nastavnik } from 'src/models/nastavnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nastavnik',
  templateUrl: './nastavnik.component.html',
  styleUrls: ['./nastavnik.component.css']
})
export class NastavnikComponent implements OnInit {


  constructor(private service:UserService,private nastavnikservice:NastavnikService,private router:Router){}

  ngOnInit(): void {

    this.user= JSON.parse(localStorage.getItem("logedInUser"))
    
      this.service.usernamecheck(this.user.username).subscribe((usr:User)=>{
        this.user=usr;

        this.nastavnikservice.getTeacher(this.user.username).subscribe((tech:Nastavnik)=>{
            this.teacher=tech;
        })


      })
      
  

  }
  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  username:string="";
  user:User= new User();
  teacher:Nastavnik= new Nastavnik();

}
