import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/Data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  info: any={
    name: '',
    uid: '',
    token: '',
    tokenExpiry: ''
  }

  myProfile=new Profile()

  authHeader=new HttpHeaders({'Authorization': 'Bearer '+this.getAuthToken()})

  checkLocalStorage(){
    var exp=localStorage.getItem('tokenExpiry');
    return localStorage.getItem('token') && exp && (Date.now()<Date.parse(exp)) && true;
  }

  fillInfoFromStorage(){
    // this.info['age']=19;

    for(var key in Object.keys(this.info)){
      this.info[key]=localStorage.getItem(key); 
    }
  }

  addLocalStorageData(data: any){
    for(var key in data){
      //console.log(key, data[key]);
      localStorage.setItem(key, data[key]);
    }
  }

  getAuthToken(){
    return localStorage.getItem('token');
  }

  logout(){
    for(var key in this.info){
      localStorage.removeItem(key);
    }

    this.router.navigateByUrl('home');
    this.myProfile=new Profile();
    // this.pService.myProjects=[];
  }

  login(data: any){
    return this.http.post(environment.SERVER_URL+'/login', data, {
      headers: this.authHeader
    });
  }

  signup(data: any){
    var user:any={};
    for(var key in data){
      if(key!='repswd'){
        user[key]=data[key];
      }
    }
    return this.http.post(environment.SERVER_URL+'/signup', user)
  }

  getUserInfo(uid: any){
    return this.http.get(environment.SERVER_URL+'/getUserInfo/'+uid, {
      headers: this.authHeader
    })
  }

  updatePersonalInfo(uid: any, data: any){
    return this.http.put(environment.SERVER_URL+'/update/'+uid, data, {
      headers: this.authHeader
    })
  }

  updateSI(uid: any, item: any, data: any){
    return this.http.put(environment.SERVER_URL+'/update/'+uid+'/'+item, data, {
      headers: this.authHeader
    })
  }

  deleteField(uid: string, key: string){
    return this.http.delete(environment.SERVER_URL+'/delete/'+uid+'/'+key, {
      headers: this.authHeader
    })
  }

  deleteAccount(uid: any){
    return this.http.delete(environment.SERVER_URL+'/deleteAccount/'+uid, {
      headers: this.authHeader
    })
  }

}
