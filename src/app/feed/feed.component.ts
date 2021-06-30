import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAIN_TITLE, Project } from '../models/Data';
import { UtilService } from '../Util/util.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {

  constructor(private util: UtilService) { }

  projects: Project[]=[];
  scroll=0;
  subs: Subscription[]=[];

  ngOnInit(): void {

    this.util.titleService.setTitle('Feed | '+MAIN_TITLE)
    
    // this.util.spinner.show();
    console.log('init projects= ', this.projects.length);
    
    this.loadInitProjects();

    if(JSON.stringify(this.util.uService.myProfile)=='{}')
      this.loadMyProfile();
    
      // console.log(this.util.pService.myProjects);
      
    if(this.util.pService.myProjects.length==0)
      this.loadMyprojects();
    
  }

  loadInitProjects(){
    var initsubs=this.util.pService.getAllProjects(this.scroll)
    .subscribe((res:any)=>{
      if(res['status']){
        this.projects=res['projects'];
        // console.log(this.projects.length);
      }
      this.util.spinner.hide();
    }, (err: HttpErrorResponse)=>{
      this.util.spinner.hide();
      this.util.snackbar.open('Error: '+err.error['message'], 'OK');
    })
    this.subs.push(initsubs);
  }

  loadMyProfile(){
    const profile=this.util.uService.getUserInfo(localStorage.getItem('uid'))
    .subscribe((res:any)=>{
      if(res['status']){
        this.util.uService.myProfile=res['user'];
        // console.log(res['message'], this.util.uService.myProfile);
      }
    }, (err: HttpErrorResponse)=>{
      this.util.snackbar.open('Error: '+err.error['message'], 'OK');
    })

    this.subs.push(profile);
  }
  
  loadMyprojects(){
    const myprj=this.util.pService.getProjects(localStorage.getItem('uid'))
    .subscribe((res:any)=>{
      if(res['status']){
        this.util.pService.myProjects=res['projects'];
        // console.log(this.util.pService.myProjects);
      }
    }, (err: HttpErrorResponse)=>{
      this.util.snackbar.open('Error: '+err.error['message'], 'OK').onAction()
      .subscribe(result=>{
        this.util.router.navigateByUrl('/');
      })
    })

    this.subs.push(myprj);
  }

  onScroll(){
    this.scroll++;
    // console.log('scrolled', this.scroll);
    this.util.spinner.show();
    this.loadMoreProjects(this.scroll);
  }

  loadMoreProjects(scroll_freq: number){
    this.util.spinner.show();
    const prjs=this.util.pService.getAllProjects(scroll_freq)
      .subscribe((res:any)=>{
        if(res['status']){
          this.projects=this.projects.concat(res['projects']);
          // console.log('more projects= ', this.projects.length);
        }
        this.util.spinner.hide();
      }, (err: HttpErrorResponse)=>{
        this.util.snackbar.open('Error: '+err.error['message'], 'OK');
        this.util.spinner.hide();
      })

      this.subs.push(prjs);
  }

  goToProject(item: any){
    this.util.pService.project=item;
    this.util.router.navigateByUrl('/project');
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub=>{
      // console.log(sub);
      sub.unsubscribe();
    })
  }

}
