import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  login(username){

      const data = {
        username:username,
        
        
      }

      return this.http.post("http://localhost:4000/users/login",data)
  }

  register(username,password,tip,pitanje,odgovor,ime,prezime,pol,adresa,kontakt,email, active){
    
    const data = {

      username:username,
      password:password,
      pitanje:pitanje,
      odgovor:odgovor,
      ime:ime,
      prezime:prezime,
      pol:pol,
      adresa:adresa,
      kontakt:kontakt,
      email:email,
      type:tip,
      active:active
      

    }
    return this.http.post("http://localhost:4000/users/register",data)

  }

  emailcheck(email){
    const data = {
        email:email
    }
    return this.http.post("http://localhost:4000/users/emailcheck",data)
  }

  usernamecheck(username){
    const data = {
        username:username
    }
    return this.http.post("http://localhost:4000/users/usernamecheck",data)
  }

  uploadImage(slika,username){
    const data = {
      slika:slika,
      username:username
    }
    
    return this.http.post("http://localhost:4000/users/uploadimage",data)
  }

  changePassword(username,newpassword){

    const data = {
      username:username,
      newpassword:newpassword
    }

    return this.http.post("http://localhost:4000/users/changepassword",data)

  }

  getStudentsNum(){
    return this.http.get("http://localhost:4000/users/numstudents")
  }
  getTeachersNum(){
    return this.http.get("http://localhost:4000/users/numteachers")
  }

  getAllSubjects(){
    return this.http.get("http://localhost:4000/users/getAllSubjects")
  }

  edit(username,firstname,lastname,address,email,phone,avatar){
    const data = {
      username:username,
      firstname:firstname,
      lastname:lastname,
      address:address,
      email:email,
      phone:phone,
      avatar:avatar
    }
    return this.http.post("http://localhost:4000/users/edit",data)
  }

  countMaleStud(){

    return this.http.get("http://localhost:4000/users/countMaleStudents")

  }

  countFemaleStud(){
    
    return this.http.get("http://localhost:4000/users/countFemaleStudents")

  }

  countFemaleTech(){
    
    return this.http.get("http://localhost:4000/users/countFemaleTeachers")

  }

  countMaleTech(){
    
    return this.http.get("http://localhost:4000/users/countMaleTeachers")

  }

  getActiveTeachers(){
    return this.http.get("http://localhost:4000/users/getActiveTeachers")
  }

  deleteUser(username){
    const data = {
      username:username
    }
    return this.http.post("http://localhost:4000/users/deleteUser",data)
  }

  getAllStudents(){
    return this.http.get("http://localhost:4000/users/getAllStudents")
  }

  getAllClasses(){
    return this.http.get("http://localhost:4000/users/getAllClasses")
  }





}
