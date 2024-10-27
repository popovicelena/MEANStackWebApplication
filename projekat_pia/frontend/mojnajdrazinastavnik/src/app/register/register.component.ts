import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from 'src/models/user';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordControl: FormControl;
  telefonInput:FormControl;
  constructor(private service: UserService, private router: Router) {
    this.passwordControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z]{3})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/),
    ]);

    this.telefonInput = new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{3}-\d{3}-\d{4}$/) // Ovde se definiše šablon za broj telefona
    ]);
  }

  ngOnInit(): void {


    this.registering=localStorage.getItem('username');
    if(this.registering){
      
     
      this.backUser=JSON.parse(localStorage.getItem("reg"))
        
        this.firstname=this.backUser.firstname;
        this.lastname=this.backUser.lastname;
        
        this.username=this.backUser.username;
        this.email=this.backUser.email;
        this.type=this.backUser.type;
        this.adresa=this.backUser.address;
        this.telefon=this.backUser.phone;
        this.pitanje=this.backUser.safetyquestion;
        this.odgovor=this.backUser.safetyresponse;
        this.pol=this.backUser.gender;
      
    }

  }



  backUser:User=new User();
  registering:string="";
  firstname: string = "";
  lastname: string = "";
  password: string = "";
  username: string = "";
  message: string = "";
  type: string = "";
  pitanje: string = "";
  odgovor: string = "";
  pol: string = "";
  telefon: string = "";
  adresa: string = "";
  email: string = "";
  confirm: string = "";
  active: boolean;
 



  

  register() {


    

    if (this.firstname == "" || this.lastname == "" || this.password == "" || this.username == "" || this.type == "" ||
      this.pitanje == "" || this.odgovor == "" || this.pol == "" || this.telefon == "" || this.adresa == "" || this.email == "") {
      this.message = "Fill out all required fields!"
      return;
    } else {
      this.message = "";
    }

    if(this.passwordControl.hasError('pattern')){
      this.message="Password doesn't meet requirements!"
      return;
    }else{
      this.message="";      
    }
    if(this.telefonInput.hasError('pattern')){
      this.message="Phone number in wrong format";
      return;
    }

    

    if(this.confirm!=this.password){
      this.message="Wrong password!";
      return;
    }else{
      this.message="";
   }

    if(this.type=='ucenik'){
      this.active=true;
    }else{
      this.active=false;
    }

  


    this.service.usernamecheck(this.username).subscribe((user: User) => {

      if (user != null) {
        this.message = "Username is taken, try something else!"
        return;
      } else {
        this.message = "";
      }
      this.service.emailcheck(this.email).subscribe((user: User) => {
        if (user != null) {
          this.message = "Email already in use!"
          return;
        } else {
          this.message = "";
        }

      
        const salt = bcrypt.genSaltSync(10);
        let pass = bcrypt.hashSync(this.password, salt);
     
        


        this.service.register(this.username, pass, this.type, this.pitanje, this.odgovor, this.firstname, this.lastname, this.pol,
          this.adresa, this.telefon, this.email, this.active).subscribe(resp => {
            
            localStorage.setItem("username",this.username);
            localStorage.setItem("firstname",this.firstname);
            localStorage.setItem("lastname",this.lastname);
            
           if (this.imageBlob) {
              this.service.uploadImage(this.imageBlob, this.username).subscribe(resp => {
                if (resp["message"] == "ok") {
                  if (this.type == "ucenik") {
                    this.router.navigate(['regucenik']);
                  } else {
                    this.router.navigate(['regnastavnik']);
                  }
                }
              })
            
            } else {

              this.service.uploadImage("", this.username).subscribe(resp => {
                if (resp["message"] == "ok") {
                  if (this.type == "ucenik") {
                    this.router.navigate(['regucenik']);
                  } else {
                    this.router.navigate(['regnastavnik']);
                  }
                }
              })

              // if (this.type == "ucenik") {
              //   this.router.navigate(['regucenik']);
              // } else {
              //   this.router.navigate(['regnastavnik']);
              // }
            }

          })
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

    //   const reader = new FileReader();
    //   // Postavljamo funkciju koja će se izvršiti kada čitanje fajla završi
    // reader.onload = (readerEvent) => {
    //   // Ovde možete obaviti radnje s učitanim podacima fajla
    //   this.imageBlob = readerEvent.target.result as string;


    // };

    // // Pokrećemo proces čitanja fajla kao Data URL
    // reader.readAsDataURL(this.selectedfile);
  }

  backtohomepage(){
    this.router.navigate(['']);
  }

}
