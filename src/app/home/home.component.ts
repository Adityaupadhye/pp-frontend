import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAIN_TITLE } from '../models/Data';
import { UtilService } from '../Util/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(public util: UtilService) { }

  loginVisible=true;
  errorTxt='';
  reCheckPswd='';
  pswd='';
  msg:string="";
  private subs: Subscription[]=[];

  user={
    'name':'', 'mis': '', 'pswd':'', 'repswd': ''
  }

  ngOnInit(): void {

    this.util.titleService.setTitle(MAIN_TITLE);

    if(this.util.uService.checkLocalStorage()){
      console.log('found');
      this.util.uService.fillInfoFromStorage();
      this.util.router.navigateByUrl('feed');
    }else{
      console.log('not found');
    }
    
    
  }

  checkPassword(): boolean{
    if(this.user.pswd!=this.user.repswd){
      this.errorTxt='Passwords Not matching';
      return false;
    }
    else{
      this.errorTxt='';
      return true;
    }
  }

  checkAllConditions(){
    return this.user.mis.length>0 && this.user.name.length>0 && 
            this.user.pswd.length>0 && this.user.repswd.length>0 && this.errorTxt.length==0;
  }

  onLoginFormSubmit(data: any){
    console.log(data, typeof(data));
    if(data['mis']==="" || data['pswd']===""){
      this.msg="Enter all credentials";
      return;
    }
    this.msg="";

    this.util.spinner.show();

    const login=this.util.uService.login(data).subscribe((res:any)=>{
      this.util.spinner.hide();
      if(res['status']){
        // console.log('login data', res['data']);
        this.util.uService.addLocalStorageData(res['data']);
        this.util.router.navigateByUrl('feed');
      }
    }, (err: HttpErrorResponse)=>{
      this.util.spinner.hide();
      // console.log(err['error'], err['error']['message']);
      this.msg='Error: '+err['error']['message'];
    })

    this.subs.push(login);
  }

  private isANumber(str: string){
    return !/\D/.test(str);
  }

  onSignUpFormSubmit(){
    console.log(this.user);
    if(this.user.pswd.length<8){
      this.msg="Password should be atleast 8 characters";
      return;
    }
    if(!this.checkPassword()) return;
    if(!this.isANumber(this.user.mis)){
      this.msg="Enter a valid MIS number";
      return;
    }
    this.msg="";

    this.util.spinner.show();
    const signup=this.util.uService.signup(this.user)
    .subscribe((res:any)=>{
      if(res['status']){
        this.loginVisible=true;
        this.util.snackbar.open(res['message']);
      }
      this.util.spinner.hide();
    }, (err: HttpErrorResponse)=>{
      this.util.spinner.hide();
      this.util.snackbar.open('Error: '+err['error']['message']); 
    })

    setTimeout(() => {
      this.util.snackbar.dismiss();
    }, 3000);

    this.subs.push(signup);
  }

  ngOnDestroy(): void{

    this.subs.forEach(sub=>{
      sub.unsubscribe();
    })
  }

}
