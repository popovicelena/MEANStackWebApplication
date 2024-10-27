import { Component, OnInit } from '@angular/core';
import { UcenikService } from '../services/ucenik.service';
import { Ucenik } from 'src/models/ucenik';
import { User } from 'src/models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  constructor(private service: UcenikService, private userService: UserService, private router:Router) { }
  ngOnInit(): void {

    this.ulogovan = JSON.parse(localStorage.getItem("logedInUser"))

    

    this.userService.usernamecheck(this.ulogovan.username).subscribe((user: User) => {
      this.ulogovan = user;
      this.firstname=user.firstname;
      this.lastname=user.lastname;
      this.address=user.address;
      this.email=user.email;
      this.phone=user.phone;
      this.avatar=user.avatar;

      this.service.getSudent(this.ulogovan.username).subscribe((usr: Ucenik) => {


        this.grade = usr.grade;
        this.school = usr.school;
        this.gradefromform=usr.grade;
        this.schoolfromform=usr.school;


      })
    })




  }

  ulogovan: User;
  grade: number;
  school: string = "";

  firstname: string;
  lastname: string;
  address: string ;
  email: string;
  phone: string;
  schoolfromform: string;
  gradefromform: number;
  sh: boolean = false;
  errormessage: string;
  changed:boolean=false;
  avatar:string;

  save() {

    if(this.firstname==""||this.lastname==""||this.address==""||this.email==""||this.phone==""||this.schoolfromform==""||typeof this.gradefromform=='undefined'){
      this.errormessage="All fields have to be filled."
      return;
    }


    if ( this.gradefromform != this.grade ) {

      if (this.school.includes("osnovna") && this.schoolfromform.includes("srednja")) {

        if(this.gradefromform!=1){
          this.errormessage="The grade can only increse by 1!";
          return;
        }else{
          this.errormessage="";
        }
      } else {
        if (this.gradefromform!=this.grade+1 || (this.school.includes("osnovna")&&this.gradefromform>8)||
        (this.school.includes('srednja')&&this.gradefromform>4)) {
          this.errormessage = "The grade can only increse by 1!"
          return;
        }else{
          this.errormessage="";
        }
      }
    }

    if (this.email != this.ulogovan.email) {
     
      this.userService.emailcheck(this.email).subscribe((user: User) => {
        if (user != null) {
          this.errormessage = "This email already in use!"
          return;
        } else{
          this.errormessage="";
          this.userService.edit(this.ulogovan.username,this.firstname,this.lastname,this.address,this.email,this.phone,(this.imageBlob?this.imageBlob:this.avatar)).subscribe(resp=>{
        
        
            this.service.updateGrade(this.ulogovan.username,this.gradefromform,this.schoolfromform).subscribe(resp=>{
              alert(resp["message"])
              this.ngOnInit();
            })
          })
        }
      })


    }else{


    
      this.userService.edit(this.ulogovan.username,this.firstname,this.lastname,this.address,this.email,this.phone,(this.imageBlob?this.imageBlob:this.avatar)).subscribe(resp=>{
        
        
        this.service.updateGrade(this.ulogovan.username,this.gradefromform,this.schoolfromform).subscribe(resp=>{
          alert(resp["message"])
          this.ngOnInit();
        })
      })


    }

    this.router.navigate(['ucenik']);
    


    

  }

  cancel(){

    this.router.navigate(['ucenik']);
  }


  selectedfile = null;
  imageBlob: string;
  format: boolean = false;
  size: boolean = false;

  onFileSelected(event) {

    this.showimage = false;

    this.selectedfile = event.target.files[0];

    if (this.selectedfile.type != 'image/png' && this.selectedfile.type != 'image/jpeg') {
      this.format = true;
    } else {
      this.format = false;
    }


    const reader = new FileReader();
    // Postavljamo funkciju koja će se izvršiti kada čitanje fajla završi
    reader.onload = (readerEvent) => {
      // Ovde možete obaviti radnje s učitanim podacima fajla
      this.imageBlob = readerEvent.target.result as string;

      var i = new Image();

      i.onload = (event) => {
        const width = i.width;
        const height = i.height;


        if (width < 100 || width > 300 || height < 100 || height > 300) {
          this.size = true;
        } else {
          this.size = false;
        }
      }

      i.src = this.imageBlob;

    };

    // Pokrećemo proces čitanja fajla kao Data URL
    reader.readAsDataURL(this.selectedfile);




  }

  showimage: boolean = false;

  onUpload() {

    this.showimage = true;

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }




}
