import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/models/user';
import { NastavnikService } from '../services/nastavnik.service';
import { Nastavnik } from 'src/models/nastavnik';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Predmet } from 'src/models/predmet';

@Component({
  selector: 'app-edit-profile-teacher',
  templateUrl: './edit-profile-teacher.component.html',
  styleUrls: ['./edit-profile-teacher.component.css']
})
export class EditProfileTeacherComponent implements OnInit {

  constructor(private userService:UserService, private teacherService:NastavnikService, private router:Router,
    private service:AdminService){}

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

      this.teacherService.getTeacher(this.ulogovan.username).subscribe((usr:Nastavnik)=>{
        this.grade=usr.grade;
        this.teacher=usr;
        
      })

    })

  }

  ulogovan:User;

  teacher:Nastavnik= new Nastavnik();
  firstname:string;
  lastname:string;
  phone:string;
  address:string;
  grade:string;
  email:string;
  errormessage:string;
  avatar:string;
  message:string="";

  addsubj:string;

  cancel(){
    this.router.navigate(['nastavnik']);
  }

  save(){

    if(this.firstname==""||this.lastname==""||this.address==""||this.email==""||this.phone==""||this.grade==""){
      this.errormessage="All fields have to be filled."
      return;
    }

    if (this.email != this.ulogovan.email) {
     
      this.userService.emailcheck(this.email).subscribe((user: User) => {
        if (user != null) {
          this.errormessage = "This email already in use!"
          return;
        } else{
          this.errormessage="";
          this.userService.edit(this.ulogovan.username,this.firstname,this.lastname,this.address,this.email,this.phone,(this.imageBlob?this.imageBlob:this.avatar)).subscribe(resp=>{
            this.teacherService.updateTeacher(this.ulogovan.username,this.firstname,this.lastname,this.grade).subscribe(resp=>{
              alert(resp["message"]);
            })
              
            
          })
        }
      })


    }else{


    
      this.userService.edit(this.ulogovan.username,this.firstname,this.lastname,this.address,this.email,this.phone,(this.imageBlob?this.imageBlob:this.avatar)).subscribe(resp=>{
        
        
        this.teacherService.updateTeacher(this.ulogovan.username,this.firstname,this.lastname,this.grade).subscribe(resp=>{
          alert(resp["message"]);
        })
        
      })


    }

    this.router.navigate(['nastavnik'])

  }

  add(){

    this.service.getSubject(this.addsubj).subscribe((subj:Predmet)=>{
      if(subj==null){
        this.message="Can't add this subject!"
        return;
      }else{
        this.message="";
        this.teacherService.addSubject(this.addsubj,this.ulogovan.username).subscribe(resp=>{
          alert(resp["message"])
          alert(this.ulogovan.username)
          this.teacherService.addTeacher(this.addsubj,this.firstname,this.lastname,this.ulogovan.username,this.teacher.grade).subscribe(resp=>{
            alert(resp["message"])
            this.ngOnInit();
          })
        })
      }
    })
   

    

  }

  delete(s){

    this.teacherService.deleteSubject(s,this.ulogovan.username).subscribe(resp=>{
      this.teacherService.removeTeacher(s,this.ulogovan.username,this.firstname,this.lastname).subscribe(resp=>{
        alert(resp["message"])
        this.ngOnInit();
      })
    })

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
    this.router.navigate([''])
  }


}
