import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UcenikComponent } from './ucenik/ucenik.component';
import { NastavnikComponent } from './nastavnik/nastavnik.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
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
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ClassesComponent } from './classes/classes.component';
import { StarRatingComponent, StarRatingModule } from 'angular-star-rating';
import { StudentsCommentComponent } from './students-comment/students-comment.component';
import { TeacherClassesComponent } from './teacher-classes/teacher-classes.component';
import { MystudentsComponent } from './mystudents/mystudents.component';
import { StudentsFileComponent } from './students-file/students-file.component';
import { NgChartsModule } from 'ng2-charts';
import { ChpassmainComponent } from './chpassmain/chpassmain.component';










@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UcenikComponent,
    NastavnikComponent,
    AdminloginComponent,
    PocetnaComponent,
    RegisterComponent,
    RegistracijaucenikComponent,
    RegistracijanastavnikComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent,
    SafetyComponent,
    NewpasswordComponent,
    AdminComponent,
    EditprofileComponent,
    NastavniciComponent,
    TeacherDetailsComponent,
    CalendarComponent,
    EditProfileTeacherComponent,
    ClassesComponent,
    StudentsCommentComponent,
    TeacherClassesComponent,
    MystudentsComponent,
    StudentsFileComponent,
    ChpassmainComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    StarRatingModule.forRoot(),
    NgChartsModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
