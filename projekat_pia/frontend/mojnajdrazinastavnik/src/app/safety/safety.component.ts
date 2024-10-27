import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-safety',
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.css']
})
export class SafetyComponent implements OnInit {

  constructor(private service:UserService,private router:Router){}

  ngOnInit(): void {
   
  }

  username:string=localStorage.getItem("username");
  question:string=localStorage.getItem("question");
  response:string=localStorage.getItem("response");
  errormessage:string="";

  responseFromForm:string;

  next(){
    this.service.usernamecheck(this.username).subscribe((user:User)=>{
      if(this.response!=this.responseFromForm){
        this.errormessage="Wrong response!";
        return;
      }else{
        this.errormessage="";
      }
      localStorage.setItem("ulogovan",this.username);
      this.router.navigate(['newpassword']);
    })
  }

}
