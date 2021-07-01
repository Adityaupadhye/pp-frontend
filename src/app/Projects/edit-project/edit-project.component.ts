import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { Subscription } from 'rxjs';
import { Project, TAGS } from 'src/app/models/Data';
import { UtilService } from 'src/app/Util/util.service';


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit, OnDestroy {

  constructor(public util: UtilService) { }

  project!: Project
  tags=TAGS;
  selectedTag=''
  private subs: Subscription[]=[];
  editor!: Editor;
  html='';

  toolbar: Toolbar=[
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    ['link', 'text_color', 'code']
  ]

  ngOnInit(): void {
    this.editor=new Editor();
    this.project=new Project();
    console.log(this.util.pService.project.pid);
    
  }

  newItemSelected(){
    console.log('selected= ', this.selectedTag);
    this.util.pService.project.tags.push(this.selectedTag);
  }

  removeTag(tag: string){
    const idx=this.util.pService.project.tags.indexOf(tag);
    console.log(idx);
    
    if(idx>=0){ 
      this.util.pService.project.tags.splice(idx, 1);
    }
    
  }

  editProject(){
    console.log(this.util.pService.project);
    this.util.spinner.show();
    const s1=this.util.pService.updateProject(this.util.pService.project.pid, this.util.pService.project)
    .subscribe((res:any)=>{
      if(res['status']){
        const snackbarRef=this.util.snackbar.open(res['message'], 'OK');
        snackbarRef.onAction().subscribe(action=>{
          // console.log(action);
          this.util.router.navigateByUrl('/myprofile');
        })
      }
      this.util.spinner.hide();
    }, (err: HttpErrorResponse)=>{
      this.util.snackbar.open('Error: '+err.error['message'], 'OK');
    })
    
  }

  cancel(){
    this.util.router.navigateByUrl('/feed');
  }

  ngOnDestroy(): void{
    this.subs.forEach(sub=>{
      sub.unsubscribe();
    })
    
    this.editor.destroy();
    
  }

}
