import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MAIN_TITLE, TAGS } from '../models/Data';
import { UtilService } from '../Util/util.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(public  util: UtilService){ }

  editMode=false;
  editSI=false;
  private subs: Subscription[]=[];

  personalDetails={'name': '', 'email': '','yearOfStudy': '', 'gender': ''}
  projects=[];

  tags=TAGS
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  newSkills: string[]=[]
  newInterests: string[]=[];

  ngOnInit(): void {
    this.util.titleService.setTitle('My Profile | '+MAIN_TITLE);
    this.mapPersonalDetails();
    this.newSkills=this.util.uService.myProfile.skills;
    this.newInterests=this.util.uService.myProfile.interests;
  }

  mapPersonalDetails(){
    this.personalDetails.name=this.util.uService.myProfile.name;
    this.personalDetails.email=this.util.uService.myProfile.email;
    this.personalDetails.yearOfStudy=this.util.uService.myProfile.yearOfStudy;
    this.personalDetails.gender=this.util.uService.myProfile.gender;
  }

  checkForChangedData(){
    var data: any={};
    console.log('data before= ', data);
    
    if(this.util.uService.myProfile.name!=this.personalDetails.name)
      data['name']=this.personalDetails.name;
    if(this.util.uService.myProfile.email!=this.personalDetails.email)
      data['email']=this.personalDetails.email
    if(this.util.uService.myProfile.yearOfStudy!=this.personalDetails.yearOfStudy)
      data['yearOfStudy']=this.personalDetails.yearOfStudy;
    if(this.util.uService.myProfile.gender!=this.personalDetails.gender)
      data['gender']=this.personalDetails.gender;

    // console.log('data after verification', data);
    return data;
  }

  reverseMap(data: any){
    if(data.name!=undefined){
      this.util.uService.myProfile.name=data.name;
    }
    if(data.email!=undefined){
      this.util.uService.myProfile.email=data.email;
    }
    if(data.yearOfStudy!=undefined){
      this.util.uService.myProfile.yearOfStudy=data.yearOfStudy;
    }
    if(data.gender!=undefined){
      this.util.uService.myProfile.gender=data.gender;
    }
  }

  onPersonalEditFormSubmit(){
    // console.log('edit data= ', this.personalDetails);
    // console.log(this.util.uService.info.uid);
    const data=this.checkForChangedData();
    console.log(data);
    // return;
    this.util.spinner.show();
    var s1=this.util.uService.updatePersonalInfo(this.util.uService.myProfile.uid, data)
    .subscribe((res:any)=>{
      if(res['status']){
        this.util.spinner.hide();
        this.util.snackbar.open(res['message'], 'OK');
        this.reverseMap(data);
        this.editMode=false;
      }
    }, (err: HttpErrorResponse)=>{
      this.util.spinner.hide();
      this.util.snackbar.open(err['error']['message'], 'OK');
    })

    this.subs.push(s1);
  }

  goToProject(prj: any){
    console.log('pid= ',prj);
    this.util.pService.project=prj;
    this.util.router.navigateByUrl('/project');
    
  }

  editProject(prj: any){
    this.util.pService.project=prj;
    this.util.router.navigateByUrl('/editProject');
  }

  openDialog(prj: any){
    const delDialog=this.util.dialog.open(DeleteDialog);

    const s1=delDialog.afterClosed().subscribe(res=>{
      console.log('after dialog close= ', res, prj);
      if(res['data']=='Delete'){
        this.util.pService.myProjects.splice(this.util.pService.myProjects.indexOf(prj), 1);
        this.deleteProject(prj['pid']);
      }
    })

    this.subs.push(s1);
  }

  deleteProject(pid: any){
    console.log('deleting pid= ', pid);
    this.util.spinner.show();
    const s2= this.util.pService.deleteProject(pid)
    .subscribe((res:any)=>{
      if(res['status']){
        this.util.snackbar.open(res['message'], 'OK');
      }
      this.util.spinner.hide();
    }, (err: HttpErrorResponse)=>{
      this.util.snackbar.open(err.error['message'], 'OK');
      this.util.spinner.hide();
    })

    this.subs.push(s2);
  }

  addSkill(evt: MatChipInputEvent){
    const value = (evt.value || '').trim();

    // Add our fruit
    if (value) {
      this.newSkills.push(value);
    }

    console.log('after adding= ', this.newSkills);
    
    // Clear the input value
    evt.chipInput!.clear();
  }

  addInterest(evt: MatChipInputEvent){
    const value = (evt.value || '').trim();

    if (value) {
      this.newInterests.push(value);
    }

    console.log('after adding= ', this.newInterests);
    // Clear the input value
    evt.chipInput!.clear();
  }

  removeSkill(skill: any){
    const index = this.newSkills.indexOf(skill);

    if (index >= 0) {
      this.newSkills.splice(index, 1);
    }
  }

  removeInterest(interest: any){
    const idx = this.newInterests.indexOf(interest);

    if (idx >= 0) {
      this.newInterests.splice(idx, 1);
    }
  }

  updateSI(){
    console.log('new= ', this.newInterests, this.newSkills);
    const data={
      skills: this.newSkills,
      interests: this.newInterests
    }

    this.util.spinner.show();
    const s=this.util.uService.updatePersonalInfo(
      this.util.uService.myProfile.uid,
      data
    ).subscribe((res:any)=>{
      if(res['status']){
        this.util.snackbar.open(res['message'], 'OK');
        this.util.uService.myProfile.skills=this.newSkills;
        this.util.uService.myProfile.interests=this.newInterests;
        this.editSI=!this.editSI;
      }
      this.util.spinner.hide();
    }, (err: HttpErrorResponse)=>{
      this.util.snackbar.open('Error: '+err.error['message'], 'OK');
      this.util.spinner.hide();
    })

    this.subs.push(s);
    
  }

  deleteAccount(){
    this.util.spinner.show();

    const s=this.util.uService.deleteAccount(
      this.util.uService.myProfile.uid
    ).subscribe((res:any)=>{
      if(res['status']){
        this.util.snackbar.open(res['message'], 'OK');
        this.util.uService.logout();
      }
      this.util.spinner.hide();
    }, (err: HttpErrorResponse)=>{
      this.util.snackbar.open('Error: '+err.error['message'], 'OK');
      this.util.spinner.hide();
    })

    this.subs.push(s);
  }

  openAccountDelete(){
    const dialog=this.util.dialog.open(AccountDelete);

    const s=dialog.afterClosed().subscribe(res=>{
      if(res['data']=='Delete'){
        this.deleteAccount();
      }
    })
  }

  ngOnDestroy(): void{
    this.subs.forEach(sub=>{
      sub.unsubscribe();
    })
  }

}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html'
})
export class DeleteDialog{

  constructor(private dialogRef: MatDialogRef<DeleteDialog>){}

  content='Are you sure you want to delete this project?';

  deleteClick(){
    console.log('delete clicked');
    this.dialogRef.close({data: 'Delete'});
    
  }
}

@Component({
  selector: 'account-delete',
  templateUrl: 'delete-dialog.html'
})
export class AccountDelete{

  constructor(private dialogRef: MatDialogRef<AccountDelete>){}

  content='All your data will be lost.\nDelete Account?'

  deleteClick(){
    console.log('deleting account...');
    this.dialogRef.close({data: 'Delete'});
    
  }

}