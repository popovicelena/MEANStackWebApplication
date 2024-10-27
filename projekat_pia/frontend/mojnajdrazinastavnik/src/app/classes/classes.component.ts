import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { UcenikService } from '../services/ucenik.service';
import { Ucenik } from 'src/models/ucenik';
import { CasService } from '../services/cas.service';
import { Cas } from 'src/models/cas';
import { ViewChild, AfterViewInit } from '@angular/core';
import {
  ClickEvent,
  HoverRatingChangeEvent,
  RatingChangeEvent
} from 'angular-star-rating';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit{
  onRatingChangeResult: RatingChangeEvent;
  

  constructor(private ucenikService:UcenikService, private casService:CasService, private router:Router){}

  ngOnInit(): void {

    
    this.comment=""

    this.ulogovan = JSON.parse(localStorage.getItem("logedInUser"))
    this.now = new Date();
    

    this.ucenikService.getSudent(this.ulogovan.username).subscribe((usr: Ucenik) => {
      this.student=usr;

    
      this.student.scheduledClasses.sort((a,b)=>{

        const datumA = new Date(a.dateBegin);
        const datumB = new Date(b.dateBegin);
        
        if (datumA < datumB) {
            return -1; // Ako datumA treba da ide pre datumB, vratimo negativnu vrednost
        }
        if (datumA > datumB) {
            return 1; // Ako datumA treba da ide posle datumB, vratimo pozitivnu vrednost
        }
        return 0; 
      })

    

      this.student.scheduledClasses.forEach(s=>{

        
    
        this.casService.getCas(s.idN).subscribe((cas:Cas)=>{
          s.mycom=cas.comment;
        })
        
        let datum = new Date(s.dateBegin);
        s.begin=new Date(s.dateBegin);

        let dan = datum.getDate();
        let mesec = datum.getMonth() + 1; 
        let godina = datum.getFullYear();
        let sati = datum.getHours();
        let minuti = datum.getMinutes();
        let min = minuti.toString().padStart(2, '0');
        
         s.formatedBegin = `${dan}/${mesec}/${godina}, ${sati}:${min}`;

          datum = new Date(s.dateEnd);
          s.end=new Date(s.dateEnd)

          dan = datum.getDate();
          mesec = datum.getMonth() + 1; 
          godina = datum.getFullYear();
          sati = datum.getHours();
          minuti = datum.getMinutes();
          min = minuti.toString().padStart(2, '0');
 
         
          s.formattedEnd= `${dan}/${mesec}/${godina}, ${sati}:${min}`;

 

      })


    })

    
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }




  pastClasses(){
    return this.student.scheduledClasses.find((s)=>{

      let date=new Date(s.dateEnd);
      return date<this.now
    })
  }


  futureClasses(){
    return this.student.scheduledClasses.find((s)=>{

      let date=new Date(s.dateEnd);
      return date>this.now
    })
  }

  id:number;
  comment:string="";
  rating:number=0;

  ulogovan:User;
  student:Ucenik=new Ucenik();
  now:Date;


  show:boolean=false;
  
  
  click(id){
    this.id=id;
    this.show=true;
  }

  



  
  onClickResult: ClickEvent;
  onHoverRatingChangeResult: HoverRatingChangeEvent;
  

  onClick = ($event: ClickEvent) => {
    console.log('onClick $event: ', $event);
    this.onClickResult = $event;
  };

  onRatingChange = ($event: RatingChangeEvent) => {
    //console.log('onRatingUpdated $event: ', $event);
    
    this.rating=$event.rating;
    this.onRatingChangeResult = $event;
  };

  onHoverRatingChange = ($event: HoverRatingChangeEvent) => {
    console.log('onHoverRatingChange $event: ', $event);
    this.onHoverRatingChangeResult = $event;
  };

  submit(idN){

    
    if(this.comment=="" || this.rating==0){
      alert("Please leave a comment and your rating.")
      return;
    }
        this.casService.addComment(idN,this.comment,this.rating).subscribe(resp=>{
      alert(resp["message"]);
      this.ngOnInit();
    })

  }

}


