import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor() { }

  drawer:any;

  toggleSidenav(){
    this.drawer.toggle();
  }
}
