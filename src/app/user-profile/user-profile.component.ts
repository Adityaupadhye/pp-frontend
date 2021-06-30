import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAIN_TITLE, Profile } from '../models/Data';
import { UtilService } from '../Util/util.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  constructor(public util: UtilService) { }

  projects!: []
  userProfile=new Profile()
  urlParams:any={}
  private subs: Subscription[]=[];

  ngOnInit(): void {
    this.util.spinner.show();
    
    const s=this.util.aroute.params.subscribe((params: any)=>{
      console.log('params= ', params);
      this.urlParams=params;
    })

    this.subs.push(s);

    this.loadAnotherUserProfile(this.urlParams['uid']);
    this.loadUserProjects(this.urlParams['uid']);
  }

  loadAnotherUserProfile(uid: any){
    this.util.spinner.show();
    const s=this.util.uService.getUserInfo(uid)
    .subscribe((res:any)=>{
      if(res['status']){
        this.userProfile=res['user'];
        this.util.titleService.setTitle(this.userProfile.name+' | '+MAIN_TITLE);
      }
      this.util.spinner.hide();
    }, (err: HttpErrorResponse)=>{
      this.util.spinner.hide();
      this.util.snackbar.open(err.error['message'], 'OK');
    })

    this.subs.push(s);
  }

  loadUserProjects(uid: any){
    this.util.spinner.show();

    const s=this.util.pService.getProjects(uid)
    .subscribe((res:any)=>{
      if(res['status']){
        this.projects=res['projects'];
      }
      this.util.spinner.hide();
    }, (err: HttpErrorResponse)=>{
      this.util.spinner.hide();
      this.util.snackbar.open(err.error['message'], 'OK');
    })

    this.subs.push(s);

  }

  goToProject(prj: any){
    console.log('pid= ',prj);
    this.util.pService.project=prj;
    this.util.router.navigateByUrl('/project');
    
  }

  ngOnDestroy(): void{
    this.subs.forEach(sub=>{
      sub.unsubscribe();
    })
  }

}
