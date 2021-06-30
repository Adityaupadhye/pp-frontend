import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Editor } from 'ngx-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { MAIN_TITLE, Project, TAGS, TOOLBAR } from '../models/Data';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { UtilService } from '../Util/util.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit,OnDestroy  {

  constructor(public uService: UserService, private pService: ProjectService, 
              private spinner: NgxSpinnerService, private snackbar: MatSnackBar,
              private util: UtilService) { }

  project!: Project
  tags=TAGS;
  selectedTag=''
  private createSubs?: Subscription;
  toolbar=TOOLBAR;
  editor!: Editor;

  ngOnInit(): void {
    
    this.project=new Project();
    this.project.authorGender=this.util.uService.myProfile.gender;
    this.project.desc='';
    this.editor=new Editor();
    this.tags.sort();
    console.log(this.uService.myProfile);

    this.util.titleService.setTitle('Create New Project | '+MAIN_TITLE)
    
  }

  createProject(){
    if(!this.uService.myProfile.name){
      // console.log(this.project.desc);
      alert('Profile data not loaded');
      return;
    }
    
    this.project.shortDesc=this.project.desc.substr(0, 0.4*this.project.desc.length);

    this.spinner.show();
    this.createSubs=this.pService.createProject(this.uService.myProfile.uid, this.project)
    .subscribe((res:any)=>{
      if(res['status']){
        this.pService.myProjects.push(this.project);  
        this.snackbar.open(res['message'], 'OK');
        this.util.router.navigateByUrl('/feed');
      }
      this.spinner.hide();
    }, (err: HttpErrorResponse)=>{
      this.spinner.hide();
      this.snackbar.open(err.error['message'], 'OK');
    })
    
  }

  newItemSelected(){
    console.log('selected= ', this.selectedTag);
    this.project.tags.push(this.selectedTag);
  }

  removeTag(tag: string){
    const idx=this.project.tags.indexOf(tag);
    console.log(idx);
    
    if(idx>=0){ 
      this.project.tags.splice(idx, 1);
    }
    
  }

  ngOnDestroy(): void {
    if(this.createSubs)
      this.createSubs.unsubscribe();
    
      console.log('destroyed');
  }

}
