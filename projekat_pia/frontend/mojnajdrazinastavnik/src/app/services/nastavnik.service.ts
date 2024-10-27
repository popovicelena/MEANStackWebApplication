import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NastavnikService {

  constructor(private http:HttpClient) { }

  registrujse(firstname,lastname,username,subjects,grade,question,cv,scheduledclass,status){

    const data = {
      firstname:firstname,
      lastname:lastname,
      username:username,
      subjects:subjects,
      grade:grade,
      question:question,
      cv:cv,
      scheduledclasses:scheduledclass,
      status:status
    }

    return this.http.post("http://localhost:4000/users/regnastavnik",data)

  }

  searchTeacher(sn,sl,ss){

    
    const data={
      searchParamName:sn,
      searchParamLastname:sl,
      searchParamSubject:ss
    }

    return this.http.post("http://localhost:4000/nastavnici/searchTeacher",data)
  }

  getTeacher(username){
    const data = {
      username:username
    }
    return this.http.post("http://localhost:4000/users/getTeacher",data)
  }

  addScheduledClass(idN,username,subject,time,doubleclass,firstname,lastname,studentusername){
    const data = {
      idN:idN,
      username:username,
      subject:subject,
      time:time,
      doubleclass:doubleclass,
      firstname:firstname,
      lastname:lastname,
      studentusername:studentusername
      
    }

    return this.http.post("http://localhost:4000/nastavnici/addScheduledClasses",data)
  }

  updateTeacher(username,firstname,lastname,grade){
    const data={
      username:username,
      firstname:firstname,
      lastname:lastname,
      grade:grade
    }
    return this.http.post("http://localhost:4000/nastavnici/updateTeacher",data)
  }

  removeTeacher(s,username,firstname,lastanme){

    const data ={
      s:s,
      username:username
    }
    return this.http.post("http://localhost:4000/nastavnici/removeProfessor",data)
  }

  deleteSubject(s,username){
    const data ={
      s:s,
      username:username
    }
    return this.http.post("http://localhost:4000/nastavnici/deleteSubject",data)
  }

  addTeacher(subject,firstname,lastname,username,grade){
    const data = {
      username:username,
      subject:subject,
      firstname:firstname,
      lastname:lastname,
      grade:grade
    }
    return this.http.post("http://localhost:4000/nastavnici/addTeacher",data)
  }

  addSubject(s,username){
    const data={
      username:username,
      s:s
    }
    return this.http.post("http://localhost:4000/nastavnici/addSubject",data)
  }

  addClassRequest(idN,cas,username,firstname,lastname,themes,avg,begin,end,doubleClass,studentusername){
    const data = {
      idN:idN,
      cas:cas,
      username:username,
      firstname:firstname,
      lastname:lastname,
      themes:themes,
      avg:avg,
      begin:begin,
      end:end,
      doubleClass:doubleClass,
      studentusername:studentusername
    }

    return this.http.post("http://localhost:4000/nastavnici/addClassRequest",data)
  }

  removeClassRequest(id,username){
    const data = {
      id:id,
       username:username
      
    }

    return this.http.post("http://localhost:4000/nastavnici/removeClassRequest",data)
  }

  deny(id,comm){
    const data = {
      id:id,
      comm:comm
    }

    return this.http.post("http://localhost:4000/cas/denyClass",data)
  }

  getAllTeachers(){
    return this.http.get("http://localhost:4000/nastavnici/getAllTeachers")
  }

  addPredlog(subject,prof){
    const data = {
      subject:subject,
      prof:prof
    }
    return this.http.post("http://localhost:4000/nastavnici/addPredlog",data)
  }

  getTeachersClass(teacher){
    const data = {
      teacher:teacher
    }

    return this.http.post("http://localhost:4000/cas/getTeachersClass",data)

  }
  


}
