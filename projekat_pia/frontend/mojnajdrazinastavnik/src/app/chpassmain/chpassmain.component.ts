import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-chpassmain',
  templateUrl: './chpassmain.component.html',
  styleUrls: ['./chpassmain.component.css']
})
export class ChpassmainComponent  implements OnInit{

  passwordControl: FormControl;

  constructor(private service:UserService, private router:Router) {
    this.passwordControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z]{3})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/),
    ]);
  }

  ngOnInit(): void {
    
  }

  
  currpassword:string="";
  newpassword:string="";
  confpassword:string="";
  username:string="";
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
  backtohomepage(){
    this.router.navigate(['']);
  }

}
