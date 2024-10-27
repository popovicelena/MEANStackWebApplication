import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { AdminService } from '../services/admin.service';
import { Teacher } from 'src/models/teachert';
import { Nastavnik } from 'src/models/nastavnik';
import { Predmet } from 'src/models/predmet';
import { UserService } from '../services/user.service';
import { NastavnikService } from '../services/nastavnik.service';
import { ChartConfiguration, ChartOptions, Point } from 'chart.js';
import { ScheduledClass } from 'src/models/scheduledClass';
import { Predlog } from 'src/models/predlog';
import { Router } from '@angular/router';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  title = 'ng2-charts-demo';









  constructor(private service: AdminService, private userservice:UserService,private nastavnikservice:NastavnikService, private router:Router) {

 
   }

  ngOnInit(): void {
    

    this.days=[0,0,0,0,0,0,0];
    this.teachers=[];
    this.allTeachers=[];
    this.activeTeachers=[]
    this.allStudents=[];
    this.userservice.getActiveTeachers().subscribe((tech:User[])=>{

      this.activeTeachers=tech;
      this.userservice.getAllStudents().subscribe((stud:User[])=>{
        this.allStudents=stud;
      })
    })

    this.service.getPending().subscribe((users: Nastavnik[]) => {
      this.allTeachers = users;
      this.allTeachers.forEach((user) => {
        let teacher = new Teacher(user.username, user.firstname, user.lastname);
        this.teachers.push(teacher);
      })
      this.teachers.forEach((user) => {
        this.service.getCV(user.username).subscribe((usr: Nastavnik) => {
          user.cv = usr.cv;
          
        })
      })
    })

    this.service.getAllPredloge().subscribe((pred:Predlog[])=>{
      this.predlozi=pred;
    })

    this.userservice.getAllSubjects().subscribe((subj:Predmet[])=>{
      this.allSubjects=subj;//dohvati sve predmete

      this.allSubjects.forEach(subj=>{
        subj.numel1=0;
        subj.numel2=0;
        subj.nummiddle=0;

        subj.professors.forEach(s=>{

        
          
         if(s.grade=="1-4"){
            subj.numel1++;
           
          }else if(s.grade=="5-8"){
            subj.numel2++;
            
          }else{
            subj.nummiddle++;
          }

        })
       

      })
      this.allSubjects.forEach(s=>{
       
        
        this.lableschart1.push(s.subject);
        this.elementary1.push(s.numel1);
        this.elementary2.push(s.numel2)
        this.middle.push(s.nummiddle);
        
      })
      


      
      this.barChartData.labels=this.lableschart1;
      this.barChartData.datasets[0].data=this.elementary1;
      this.barChartData.datasets[1].data=this.elementary2;
      this.barChartData.datasets[2].data=this.middle;
    })

    this.userservice.countMaleStud().subscribe((num:User[])=>{

      this.maleStud=num;
      this.male=this.maleStud.length;
      

      this.userservice.countFemaleStud().subscribe((num:User[])=>{
        this.femaleStud=num;
        this.female=this.femaleStud.length;
        
        
        this.pieChartDatasets = [{
          data: [this.female, this.male]
        }];
        
        
       
        
    

        
      })

    })

    this.userservice.countMaleTech().subscribe((num:User[])=>{

      num.forEach(t=>{
        if(t.active){
          this.maleTech.push(t)
        }
      })

      // this.maleTech=num;
      this.maleT=this.maleTech.length;
      

      this.userservice.countFemaleTech().subscribe((num:User[])=>{

        num.forEach(t=>{
          if(t.active){
            this.femaleTech.push(t);
          }
        })
        //this.femaleTech=num;
        this.femaleT=this.femaleTech.length;
        
        
        this.pieChartDatasetsT = [{
          data: [this.femaleT, this.maleT]
        }];
        
        
       
        
    

        
      })

    })
    




    this.nastavnikservice.getAllTeachers().subscribe((tech:Nastavnik[])=>{
      this.profs=tech;
      this.profs.forEach(te=>{

        te.months=[0,0,0,0,0,0,0,0,0,0,0,0];
        if(te.scheduledClasses!=null){
          te.scheduledClasses.forEach(c=>{
            
            let date= new Date(c.time);//za svaki cas dohvati vreme
            
            if(date.getFullYear()==2023){

              te.months[date.getMonth()]++;
            }

            if(date.getFullYear()==2023){
              this.days[date.getDay()]++;
              
            }
            
           
          })
         
      
        }

        for (let index = 0; index < this.days.length; index++) {
          if(index!=0){
            this.days[index]=this.days[index]/52
          }else{
            this.days[index]/=53;
          }
          
        }
       

      })


      
      this.barChartDataD.labels=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      this.barChartDataD.datasets[0].data=this.days;
      this.readybar=true;
     

      this.profs.sort((a,b)=>{

        const suma=a.months.reduce((total, currentValue) => total + currentValue, 0)
        const sumb=b.months.reduce((total, currentValue) => total + currentValue, 0)
        
        if (suma < sumb) {
            return 1; // Ako datumA treba da ide pre datumB, vratimo negativnu vrednost
        }
        if (suma > sumb) {
            return -1; // Ako datumA treba da ide posle datumB, vratimo pozitivnu vrednost
        }
        return 0; 
      })

      if(this.profs.length>10){
        let i = this.profs.length-10;
        for (i; i>0; i--) {
          this.profs.pop();
          
        }
      }

      //

      this.profs.forEach(te=>{

        if(te.status!="pending"){
        this.lineChartData.datasets.push({
          data: te.months,
          label: te.firstname+" "+te.lastname,
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)'
         })
        }
      })

      this.ready=true;
     

    })



   
    

    

     


  }



  profs:Nastavnik[]=[];

  allStudents:Array<User>=[];
  lableschart1:Array<string>=[];
  allTeachers: Nastavnik[] = [];
  teachers: Teacher[] = [];
  teacher: Teacher;
  newsubject:string="";
  errormessage:string="";
  allSubjects:Predmet[]=[];
  numbers:Array<number>=[];
  maleStud:Array<User>=[];
  femaleStud:Array<User>=[];
  maleTech:Array<User>=[];
  femaleTech:Array<User>=[];
  elementary1:Array<number>=[];
  elementary2:Array<number>=[];
  middle:Array<number>=[];
  activeTeachers:Array<User>=[];
  mon:number[]=[];
  ready:boolean=false;
  days:number[]=[];
  
  male:number=0;
  female:number=0;

  maleT:number=0;
  femaleT:number=0;

  data:any=10;

  readybar:boolean=false;

  predlozi:Predlog[]=[]
 greska:string="";
  
  


  //barchart

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [ ],label:'1-4'},
      { data: [ ],label:'5-8'},
      { data: [ ],label:'middle school'}
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    
    responsive: false
    
  };


  public barChartDataD: ChartConfiguration<'bar'>['data'] = {
    labels: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    datasets: [
      { data: [ ],label:'avg classes'}
       ]
  };


    //Pie
    public pieChartOptions: ChartOptions<'pie'> = {
      responsive: false,
    
    };
    public pieChartLabels = [[ 'Female' ], [ 'Male' ]];
    public pieChartDatasets = [  ];
    public pieChartLegend = true;
    public pieChartPlugins = [];
    public pieChartDatasetsT = [  ];
  

      //line chart
   public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    datasets:[]
      
    
  };

   lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
   lineChartLegend = true;
 


  downloadPdf(cv,username){
    const linkSource = cv;
    const downloadlink = document.createElement('a');
    const fileName = username+"_resume" + ".pdf";

    downloadlink.href=linkSource;
    downloadlink.download=fileName;
    downloadlink.click();
  }


  accept(username){

    this.userservice.usernamecheck(username).subscribe((user:User)=>{
      let firstname = user.firstname;
      let lastanme = user.lastname;
     

      this.service.acceptUser(username).subscribe(resp=>{

        this.service.accept(username).subscribe(resp=>{
          
          this.nastavnikservice.getTeacher(username).subscribe((user:Nastavnik)=>{
          
            let grade = user.grade;
            user.subjects.forEach(subj=>{
                this.service.addTeacher(subj,firstname,lastanme,username,grade).subscribe(resp=>{
                  
                })
            })
            
          })

          alert("Accepted!");
          this.ngOnInit();
        })
      

        
      })

    })
    
     
  }

  addSubject(){

    if(this.newsubject==""){
      this.errormessage="Field empty!"
      return;
    }
    this.service.getSubject(this.newsubject).subscribe((subj:Predmet)=>{
      if(subj!=null){
        this.errormessage="Subject already added!"
      }else{
        this.errormessage="";
        this.service.addSubject(this.newsubject).subscribe(resp=>{
          alert(resp["message"]);
        })
      }
    })
   
  }

  deny(username){
    this.service.deny(username).subscribe(resp=>{
      alert(resp["message"]);
      this.ngOnInit();
    })
  }
  

acceptPredlog(subject){

  
 
  this.service.denyPredlog(subject).subscribe(resp=>{
  
  this.service.getSubject(subject).subscribe((subj:Predmet)=>{
    if(subj!=null){
      this.greska="Subject already added!"
    }else{
      this.greska="";
      this.service.addSubject(subject).subscribe(resp=>{
        alert(resp["message"]);
        this.ngOnInit();
      })
    }
  })
})



}

denyPredlog(subj){

  this.service.denyPredlog(subj).subscribe(resp=>{
    alert(resp["message"])
    this.ngOnInit();
  })

}

logout(){
  localStorage.clear();
  this.router.navigate(['']);
}

  



}
