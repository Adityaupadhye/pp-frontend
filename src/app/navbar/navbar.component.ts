import { Component, OnInit } from '@angular/core';
import { NavService } from '../services/nav.service';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public userService: UserService, private navService: NavService, 
              private pservice: ProjectService) { }

  ngOnInit(): void {
  }

  logout(){
    console.log('logging out...');
    this.pservice.myProjects=[];
    this.userService.logout();
  }

  toggleSidenav(){
    console.log('toggled');
    this.navService.toggleSidenav();
  }

}
