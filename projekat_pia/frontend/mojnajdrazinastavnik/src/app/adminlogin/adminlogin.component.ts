import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit{

  constructor(private service:UserService, private router:Router){}

  ngOnInit(): void {
    
  }

  username:string="";
  password:string="";
  tip:string="admin";
  poruka:string="";
 
 

  login(){

    if(this.username=="" || this.password=="" ){

      this.poruka="Fill out all required fields!";
      return;
    }

    this.service.login(this.username).subscribe((user:User)=>{
      if(user!=null){

        
      if(this.tip==user.type){

        this.poruka="";
        localStorage.setItem("ulogovan", user.username);
        this.router.navigate([user.type])
      }else{
        this.poruka="Wrong type!";
      }
      }else{
        this.poruka="Wrong password or username!"
      }

    })
  }

}
