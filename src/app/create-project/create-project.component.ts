import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import { Subscription } from 'rxjs';
import { MAIN_TITLE, Project, TAGS, TOOLBAR } from '../models/Data';
import { UtilService } from '../Util/util.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit,OnDestroy  {

  constructor(public util: UtilService) { }

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
    // console.log(this.util.uService.myProfile);

    this.util.titleService.setTitle('Create New Project | '+MAIN_TITLE)
    
  }

  createProject(){
    if(!this.util.uService.myProfile.name){
      // console.log(this.project.desc);
      alert('Profile data not loaded');
      return;
    }
    
    this.project.shortDesc=this.project.desc.substr(0, 0.4*this.project.desc.length);

    this.util.spinner.show();
    this.createSubs=this.util.pService.createProject(this.util.uService.myProfile.uid, this.project)
    .subscribe((res:any)=>{
      if(res['status']){
        this.project.pid=res['pid'];
        this.util.pService.myProjects.push(this.project);  
        this.util.snackbar.open(res['message'], 'OK');
        this.util.router.navigateByUrl('/feed');
      }
      this.util.spinner.hide();
    }, (err: HttpErrorResponse)=>{
      this.util.spinner.hide();
      if(err.status==0)
        this.util.snackbar.open('Connection Error', 'OK');
      else
        this.util.snackbar.open('Error: '+err.status+err.error['message'], 'OK');
    })
    
  }

  cancel(){
    this.util.router.navigateByUrl('/feed');
  }

  newItemSelected(){
    // console.log('selected= ', this.selectedTag);
    this.project.tags.push(this.selectedTag);
  }

  removeTag(tag: string){
    const idx=this.project.tags.indexOf(tag);
    // console.log(idx);
    
    if(idx>=0){ 
      this.project.tags.splice(idx, 1);
    }
    
  }

  ngOnDestroy(): void {
    if(this.createSubs)
      this.createSubs.unsubscribe();
    
      // console.log('destroyed');
      this.editor.destroy();
  }

}
