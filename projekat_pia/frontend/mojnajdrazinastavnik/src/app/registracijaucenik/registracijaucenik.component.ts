import { Component, OnInit } from '@angular/core';
import { UcenikService } from '../services/ucenik.service';
import { ScheduledClassStudent } from 'src/models/ScheduledClassStudent';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-registracijaucenik',
  templateUrl: './registracijaucenik.component.html',
  styleUrls: ['./registracijaucenik.component.css']
})
export class RegistracijaucenikComponent implements OnInit {

  constructor(private service:UcenikService,private router:Router,
    private userService:UserService){}

  ngOnInit(): void {
    
  }

  skola:string="";
  razred:number=0;
  username:string=localStorage.getItem("username");
  errormessage:string;
  scheduledClasses:Array<ScheduledClassStudent>=[];

  osnovnaRazredi: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  srednjaRazredi: number[] = [1, 2, 3, 4];


  registrujse(){

    if(this.skola=="" || this.razred==0){
        this.errormessage="Fill out all fields!";
        return;
    }else{
      this.errormessage="";
    }

    this.service.registrujse(this.username,this.skola,this.razred,this.scheduledClasses).subscribe(resp=>{
      alert([resp["message"]]);
      localStorage.clear();
      this.router.navigate(['']);
    })

  }

  back(){

    this.userService.usernamecheck(this.username).subscribe((usr:User)=>{
      localStorage.setItem("reg",JSON.stringify(usr));
      this.userService.deleteUser(this.username).subscribe(resp=>{

     
        this.router.navigate(['register'])
      })

    })

   
    
  }

  cancel(){
    
    this.userService.deleteUser(this.username).subscribe(resp=>{
      
      localStorage.clear()
      this.router.navigate(['']);
    })
  }

}
