import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../models/Data';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private userService: UserService) { }

  authToken=this.userService.getAuthToken();
  authHeader=new HttpHeaders({'Authorization': 'Bearer '+this.authToken});

  project=new Project();
  myProjects: Project[]=[]

  createProject(uid: any, data: any){
    return this.http.post(environment.SERVER_URL+'/createProject/'+uid, data, {
      headers: this.authHeader
    })
  }

  getAllProjects(freq: number){
    return this.http.get(environment.SERVER_URL+'/getAllProjects?freq='+freq, {
      headers: this.authHeader
    })
  }

  getProjects(uid: any){
    return this.http.get(environment.SERVER_URL+'/getProjects/'+uid, {
      headers: this.authHeader
    })
  }

  getProject(pid: any){
    return this.http.get(environment.SERVER_URL+'/getProject/'+pid, {
      headers: this.authHeader
    })
  }

  updateProject(pid: any, data: any){
    return this.http.put(environment.SERVER_URL+'/updateProject/'+pid, data, {
      headers: this.authHeader
    })
  }

  deleteProject(pid: any){
    return this.http.delete(environment.SERVER_URL+'/deleteProject/'+pid, {
      headers: this.authHeader
    })
  }

}
