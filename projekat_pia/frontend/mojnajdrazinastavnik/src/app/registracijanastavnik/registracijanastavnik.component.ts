import { Component, OnInit } from '@angular/core';
import { NastavnikService } from '../services/nastavnik.service';
import { ScheduledClass } from 'src/models/scheduledClass';
import { UserService } from '../services/user.service';
import { Predmet } from 'src/models/predmet';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-registracijanastavnik',
  templateUrl: './registracijanastavnik.component.html',
  styleUrls: ['./registracijanastavnik.component.css']
})
export class RegistracijanastavnikComponent implements OnInit {

  constructor(private service: NastavnikService, private userService: UserService, private router:Router) {
  }

  ngOnInit(): void {

    

    this.userService.getAllSubjects().subscribe((subj: Predmet[]) => {

      this.allSubjects = subj;
    })




  }

  username: string = localStorage.getItem("username");
  firstname: string = localStorage.getItem("firstname");
  lastname: string = localStorage.getItem("lastname");
  subjects: string[] = [];
  grade: string = "";
  question: string = "";
  errormessage: string;
  i: number = 0;
  drugo: string = "";
  selectedfile = null;
  cv: string;
  format: boolean = false;
  size: boolean = false;
  scheduledclasses: Array<ScheduledClass> = [];
  allSubjects: Predmet[] = [];
  dodatno: string = "";
  selected: boolean[] = [];
  selectedSubj: string[] = [];




  registrujse() {


    for (let index = 0; index < this.allSubjects.length; index++) {
      if (this.selected[index]) {
        
        this.subjects.push(this.allSubjects[index].subject);
      }

    }




    if ((this.subjects.length == 0 && this.dodatno=="") || this.grade == "" || this.question == "" || this.selectedfile == null) {
      this.errormessage = "Please fill out all necessary fields!"
      return;
    } else {
      this.errormessage = "";
    }

    this.service.registrujse(this.firstname, this.lastname, this.username, this.subjects, this.grade, this.question, this.cv, this.scheduledclasses,"pending").subscribe(resp => {
      if (this.dodatno != "") {
        this.service.addPredlog(this.dodatno,this.username).subscribe(resp => {
          alert(resp["message"]);
        })
      } else {
        alert(resp["message"]);
      }



    })

    localStorage.clear();
    this.router.navigate(['']);

  }

  cancel(){
    
    this.userService.deleteUser(this.username).subscribe(resp=>{
      localStorage.clear();
      this.router.navigate(['']);
    })
  }





  jePDF(datoteka: File): boolean {
    // Dobijanje ekstenzije datoteke
    const ekstenzija = datoteka.name.split('.').pop();

    // Provera da li je ekstenzija "pdf" (case insensitive)
    if (ekstenzija && ekstenzija.toLowerCase() === 'pdf') {
      return true;
    }

    return false;
  }


  velicinaMB(fileSizeInBytes) {
    // Pretvoriti bajtove u megabajte
    var velicinaMB = fileSizeInBytes / (1024 * 1024);
    return velicinaMB.toFixed(2); // Zaokružiti na dve decimale
  }

  onFileSelected(event) {



    this.selectedfile = event.target.files[0];


    if (!this.jePDF(this.selectedfile)) {
      this.format = true;
    } else {
      this.format = false;
    }



    const reader = new FileReader();
    // Postavljamo funkciju koja će se izvršiti kada čitanje fajla završi
    reader.onload = (readerEvent) => {
      // Ovde možete obaviti radnje s učitanim podacima fajla

      //  var inputdata=reader.result.toString();
      //  var replaceval = (inputdata.split(',')[0]);
      //  //alert(replaceval)
      //  this.cv = inputdata.replace(replaceval + ",","");

      this.cv = readerEvent.target.result as string;
      //alert(this.cv)
      if (Number(this.velicinaMB(this.cv.length)) > 3) {
        this.size = true;
      } else {
        this.size = false;
      }




    };

    // Pokrećemo proces čitanja fajla kao Data URL
    reader.readAsDataURL(this.selectedfile);


  }


  back(){

    this.userService.usernamecheck(this.username).subscribe((usr:User)=>{
      localStorage.setItem("reg",JSON.stringify(usr));
      this.userService.deleteUser(this.username).subscribe(resp=>{

     
        this.router.navigate(['register'])
      })

    })

   
    
  }






}
