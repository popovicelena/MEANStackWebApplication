import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CasService {

  constructor(private http:HttpClient) { }

  addClass(idN,teacher,student,subject,datetime,doubleclass,themes,comment,rating){

    const data = {
      idN:idN,
      teacher:teacher,
      student:student,
      themes:themes,
      datetime:datetime,
      subject:subject,
      doubleclass:doubleclass,
      comment:comment,
      rating:rating
    }

    return this.http.post("http://localhost:4000/cas/addClass",data)

  }

  getObj(){

    return this.http.get('http://localhost:4000/cas/getObj')
  }

  getCas(id){

    const data ={
      id:id
    }

    return this.http.post('http://localhost:4000/cas/getCas',data)
  }

  addComment(id,comm,rating){
    const data={
      comm:comm,
      id:id,
      rating:rating
    }
    return this.http.post('http://localhost:4000/cas/addComment',data)
  }

  denyClass(id,comm){
    const data = {
      id:id,
      comm:comm
    }

    return this.http.post('http://localhost:4000/cas/denyClass',data)
  }
}
