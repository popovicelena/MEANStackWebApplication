import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UcenikComponent } from './ucenik/ucenik.component';
import { NastavnikComponent } from './nastavnik/nastavnik.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { RegisterComponent } from './register/register.component';
import { RegistracijaucenikComponent } from './registracijaucenik/registracijaucenik.component';
import { RegistracijanastavnikComponent } from './registracijanastavnik/registracijanastavnik.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { SafetyComponent } from './safety/safety.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { AdminComponent } from './admin/admin.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { NastavniciComponent } from './nastavnici/nastavnici.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EditProfileTeacherComponent } from './edit-profile-teacher/edit-profile-teacher.component';
import { ClassesComponent } from './classes/classes.component';
import { StudentsCommentComponent } from './students-comment/students-comment.component';
import { TeacherClassesComponent } from './teacher-classes/teacher-classes.component';
import { MystudentsComponent } from './mystudents/mystudents.component';
import { StudentsFileComponent } from './students-file/students-file.component';
import { ChpassmainComponent } from './chpassmain/chpassmain.component';


const routes: Routes = [

  {path:"", component:PocetnaComponent},
  {path:"login", component:LoginComponent},
  {path:"ucenik", component:UcenikComponent},
  {path:"nastavnik",component:NastavnikComponent},
  {path:"adminlogin",component:AdminloginComponent},
  {path:"register", component:RegisterComponent},
  {path:"regucenik", component:RegistracijaucenikComponent},
  {path:"regnastavnik", component:RegistracijanastavnikComponent},
  {path:"forgotpassword", component:ForgotpasswordComponent},
  {path:"safety", component:SafetyComponent},
  {path:"changepassword", component:ChangepasswordComponent},
  {path:"changepassmain", component:ChpassmainComponent}, 
  {path:"newpassword", component:NewpasswordComponent},
  {path:"admin", component:AdminComponent},
  {path:"admin/changepassword", component:ChangepasswordComponent},
  {path:"adminlogin/forgotpassword",component:ForgotpasswordComponent},
  {path:"editprofile",component:EditprofileComponent},
  {path:"nastavnici",component:NastavniciComponent},
  {path:"classes",component:ClassesComponent},
  {path:"ucenik/nastavnici/teacherDetails",component:TeacherDetailsComponent},
  {path:"calendar",component:CalendarComponent},
  {path:"edit-profile-teacher",component:EditProfileTeacherComponent},

  {path:"ucenik/classes/studentscomment",component:StudentsCommentComponent},
  {path:"teacherclasses",component:TeacherClassesComponent},
  {path:"mystudents",component:MystudentsComponent},
  {path:"nastavnik/mystudents/studentsFile",component:StudentsFileComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
