import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from 'src/models/user';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  passwordControl: FormControl;

  constructor(private service:UserService, private router:Router) {
    this.passwordControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z]{3})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/),
    ]);
  }

  ngOnInit(): void {

    this.username=localStorage.getItem("ulogovan");;
    this.service.usernamecheck(this.username).subscribe((usr:User)=>{
      this.user=usr;
    })

    
  }

  user:User=new User();
  currpassword:string="";
  newpassword:string="";
  confpassword:string="";
  username:string=localStorage.getItem("ulogovan");
  errormessage:string="";

  changePassword(){

    if(this.currpassword=="" || this.newpassword=="" || this.confpassword==""){
      this.errormessage="Please fill out all reqired fields."
      return;
    }else{
      this.errormessage="";
    }

    if(this.passwordControl.hasError('pattern')){
      this.errormessage="Password doesn't meet requirements!"
      return;
    }else{
      this.errormessage="";      
    }

    if(this.confpassword!=this.newpassword){
      this.errormessage="Wrong password!";
      return;
    }else{
      this.errormessage="";
   }

      this.service.usernamecheck(this.username).subscribe((user:User)=>{
        
        if(!bcrypt.compareSync( this.currpassword,user.password)){
            this.errormessage="Current Password is not correct!";
            return;
        }else{
          this.errormessage="";
        }

        const salt = bcrypt.genSaltSync(10);
        let pass = bcrypt.hashSync(this.newpassword, salt);

        this.service.changePassword(this.username,pass).subscribe(resp=>{
          alert(resp["message"]);
          localStorage.clear();
          this.router.navigate(['']);
      })

      })

     


  }

  back(){
    this.router.navigate([this.user.type])
  }

 

}
