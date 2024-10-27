import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UcenikService {

  constructor(private http:HttpClient) { }

  registrujse(username,skola,razred,scheduledClasses){

    const data = {
      username:username,
      skola:skola,
      razred:razred,
      scheduledClasses:scheduledClasses
    }

    return this.http.post("http://localhost:4000/users/regucenik",data)

  }

  getSudent(username){
    const data = {
      username:username
    }

    return this.http.post("http://localhost:4000/users/getStudent",data)
  }

  updateStudent (username,param,change){
    const data = {
      username:username,
      param:param,
      change:change
    }
    return this.http.post("http://localhost:4000/users/updateStudent",data)
  }

  updateGrade(username,grade,school){

    const data = {
      username:username,
      grade:grade,
      school:school
    }

    return this.http.post("http://localhost:4000/users/updateGrade",data)

  }

  getTeachers(grade){
    const data = {
      grade:grade
    }

    return this.http.post("http://localhost:4000/users/getTeachers",data)
  }

  addclass(idN,username,teacherusername,subject,firstname,lastname,begin,end,comment,theme){
    const data = {
      idN:idN,
      username:username,
      teacherusername:teacherusername,
      subject:subject,
      firstname:firstname,
      lastname:lastname,
      begin:begin,
      end:end,
      comment:comment,
      theme:theme,
      
    }
    return this.http.post("http://localhost:4000/ucenici/addScheduledClasses",data)
  }

  addCommGrade(id,techcomm,techgrade,username){
    const data = {
      username:username,
      id:id,
      techcomm:techcomm,
      techgrade:techgrade
    }

    return this.http.post("http://localhost:4000/ucenici/addCommGrade",data)
  }

 

}
