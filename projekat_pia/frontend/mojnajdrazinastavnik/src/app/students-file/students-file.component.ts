import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from 'src/models/user';
import { UcenikService } from '../services/ucenik.service';
import { Ucenik } from 'src/models/ucenik';
import { ScheduledClassStudent } from 'src/models/ScheduledClassStudent';

@Component({
  selector: 'app-students-file',
  templateUrl: './students-file.component.html',
  styleUrls: ['./students-file.component.css']
})
export class StudentsFileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service:UserService, private studentService:UcenikService, private router:Router){}
  ngOnInit(): void {

    this.myclasses=[];
    this.teacher=localStorage.getItem('ulogovan')


    this.service.usernamecheck(this.teacher).subscribe((usr:User)=>{
      this.prof=usr;
    })
    
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.service.usernamecheck(this.username).subscribe((usr:User)=>{
        this.user=usr;

        this.studentService.getSudent(usr.username).subscribe((stud:Ucenik)=>{

          this.student=stud;

          this.student.scheduledClasses.forEach(s=>{
            let datum = new Date(s.dateBegin);
           
            let dan = datum.getDate();
            let mesec = datum.getMonth() + 1; 
            let godina = datum.getFullYear();
            let sati = datum.getHours();
            let minuti = datum.getMinutes();
            let min = minuti.toString().padStart(2, '0');
            
             s.formatedtime = `${dan}/${mesec}/${godina}, ${sati}:${min}`;
    
          
    
          })

          
          this.student.scheduledClasses.sort((a,b)=>{

            const datumA = new Date(a.dateBegin);
            const datumB = new Date(b.dateBegin);
            const subjA = a.subject;
            const subjB = b.subject;
            
            if (subjA < subjB) {
                return -1; // Ako datumA treba da ide pre datumB, vratimo negativnu vrednost
            }
            if (subjA > subjB) {
                return 1; // Ako datumA treba da ide posle datumB, vratimo pozitivnu vrednost
            }else{

            }
            
            if (datumA < datumB) {
              return -1; // Ako datumA treba da ide pre datumB, vratimo negativnu vrednost
          }
          if (datumA > datumB) {
              return 1; // Ako datumA treba da ide posle datumB, vratimo pozitivnu vrednost
          }
          return 0;  
          })

          let now = new Date();

          this.student.scheduledClasses.forEach(s=>{

            let end = new Date(s.dateEnd);

            if(s.teacherusername==this.teacher && s.teachersgrade==0 && end<now){
              this.myclasses.push(s);
            }
           

          })

          
        
       
     

        })
        



      })
    
  })

  

}

teacher:string="";//username profesora
username:string;//username studenta
user:User=new User();
student:Ucenik=new Ucenik();//ceo objekat studenta
myclasses:Array<ScheduledClassStudent>=[];
prof:User=new User();



errormessage:string;

submit(id,techgrade,techcomm){
 
  if(techgrade==0 || techgrade>5){

    this.errormessage="The student can be graded from 1 to 5!"
    return;
  }

  this.studentService.addCommGrade(id,techcomm,techgrade,this.username).subscribe(resp=>{
    alert(resp["message"]);
    this.myclasses.filter(s=>s.idN!=id);
    this.ngOnInit();
  })
}

logout(){
  localStorage.clear();
  this.router.navigate(['']);
}

}
