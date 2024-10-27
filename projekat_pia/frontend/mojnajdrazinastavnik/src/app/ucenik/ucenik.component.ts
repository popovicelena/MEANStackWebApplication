import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { UcenikService } from '../services/ucenik.service';
import { Ucenik } from 'src/models/ucenik';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ucenik',
  templateUrl: './ucenik.component.html',
  styleUrls: ['./ucenik.component.css']
})
export class UcenikComponent implements OnInit {


  constructor(private service:UcenikService, private userService:UserService, private router:Router){}
  ngOnInit(): void {

    this.ulogovan = JSON.parse(localStorage.getItem("logedInUser"))

    this.userService.usernamecheck(this.ulogovan.username).subscribe((user:User)=>{
      this.ulogovan=user;

      this.service.getSudent(this.ulogovan.username).subscribe((usr:Ucenik)=>{
      
      
       this.grade=usr.grade;
        this.school=usr.school;

      
    })
    })
    
  
    
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  ulogovan:User;
  grade:number;
  school:string="";
  showEditProfile:boolean=false;
  


  



}
