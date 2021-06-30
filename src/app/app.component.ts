import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from './services/nav.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'frontend';
  @ViewChild('drawer') drawer:any;

  constructor(public navService: NavService, public uService: UserService,
              public router: Router){ }

  navList=[
    {'link': '/feed', 'src': '/assets/icons/feed.svg', 'alt': 'feed icon', 'name': 'Project Feed'},
    {'link': '/myprofile', 'src': '/assets/icons/profile.svg', 'alt': 'profile icon', 'name': 'My Profile'},
    {'link': '/myprojects', 'src': '/assets/icons/project.svg', 'alt': 'project icon', 'name': 'My Projects'},
    {'link': '/createProject', 'src': '/assets/icons/new_project.svg', 'alt': 'new project icon', 'name': 'New Project'},
  ]

  logoutItem={'src': '/assets/icons/logout.svg', 'alt': 'logout icon', 'name': 'Logout'}

  ngAfterViewInit(): void {
    this.navService.drawer=this.drawer;
    // console.log(this.navService.drawer, this.drawer);
  }

  ngOnInit(): void{
    
  }
}
