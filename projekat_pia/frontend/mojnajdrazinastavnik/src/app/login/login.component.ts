import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { Predmet } from 'src/models/predmet';
import { Nastavnik } from 'src/models/nastavnik';
import { NastavnikService } from '../services/nastavnik.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:UserService, private router:Router,private nastavnikService:NastavnikService){}
  ngOnInit(): void {

 
    
  }

  username:string="";
  password:string="";
  tip:string="";
  poruka:string="";
  numstudents:number;
  numteachers:number;
  allSubjects:Predmet[];
  searchedTeachers:Nastavnik[]=[];

  login(){

    

    if(this.username=="" || this.password=="" || this.tip==""){

      this.poruka="Fill out all required fields!";
      return;
    }


  

    this.service.login(this.username).subscribe((user:User)=>{
      if(user!=null){

        if(!bcrypt.compareSync( this.password,user.password)){
          this.poruka="Wrong password!"
          return;
        }
        if(user.active==false){
          alert("Account not activated!")
          return;
        }
        
      if(this.tip==user.type){

        this.poruka="";
        localStorage.setItem("ulogovan", user.username);
       localStorage.setItem("logedInUser",JSON.stringify(user));
        this.router.navigate([user.type])
      }else{
        this.poruka="Wrong type!";
      }
      }else{
        this.poruka="Wrong username!"
      }

    })
  }

  backtohomepage(){
    this.router.navigate(['']);
  }



}
