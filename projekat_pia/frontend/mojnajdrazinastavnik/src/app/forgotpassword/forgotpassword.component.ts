import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private service:UserService, private router:Router){}

  ngOnInit(): void {

  }

  username:string="";
  errormessage:string;

  next(){
    if(this.username==""){
      this.errormessage="Username required!"
      return;
    }else{
      this.errormessage=""
    }

    this.service.usernamecheck(this.username).subscribe((user:User)=>{

      if(user!=null){
        
        localStorage.setItem("username",this.username);
        localStorage.setItem("question",user.safetyquestion);
        localStorage.setItem("response",user.safetyresponse);
        this.router.navigate(['safety'])
        
      }else{
        this.errormessage="Wrong username!"
      }
      
    })


  }


}
