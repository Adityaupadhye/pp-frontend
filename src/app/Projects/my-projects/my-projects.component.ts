import { Component, OnInit } from '@angular/core';
import { MAIN_TITLE } from 'src/app/models/Data';
import { UtilService } from 'src/app/Util/util.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

  constructor(public util: UtilService) { }

  ngOnInit(): void {
    this.util.titleService.setTitle('My Projects | '+MAIN_TITLE);
  }

  gotoProject(curProject: any){
    this.util.pService.project=curProject;
    this.util.router.navigateByUrl('/project');
  }

}
