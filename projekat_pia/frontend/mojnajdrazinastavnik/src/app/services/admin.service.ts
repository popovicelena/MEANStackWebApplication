import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getAllTeachers(){
    return this.http.get("http://localhost:4000/users/getAllTeachers")
  }

  getCV(username){
    const data = {
      username:username
    }
    return this.http.post("http://localhost:4000/users/getCV",data)
  }

  acceptUser(username){
    const data = {
      username:username
    }
    return this.http.post("http://localhost:4000/users/acceptUser",data)
  }

  addSubject(subject){
    const data = {
      subject:subject
    }

    return this.http.post("http://localhost:4000/users/addSubject",data)
  }

  getSubject(name){
    const data = {
      name:name
    }
    return this.http.post("http://localhost:4000/users/getSubject",data)
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

  deny(username){
    const data = {
      username:username
    }
    return this.http.post("http://localhost:4000/nastavnici/rejectTeacher",data)
  }

  getAllPredloge(){
    return this.http.get("http://localhost:4000/nastavnici/getAllPredloge")
  }


  denyPredlog(subj){
    const data = {
      subj:subj
    }
    return this.http.post("http://localhost:4000/nastavnici/denyPredlog",data)
  }

  getPending(){
    return this.http.get("http://localhost:4000/nastavnici/getPending")
  }

  accept(username){
    const data = {
      username:username
    }
    return this.http.post("http://localhost:4000/nastavnici/accept",data)
  }


  
}
