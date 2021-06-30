import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../models/Data';
import { ProjectService } from '../services/project.service';
@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  @Input() title: string='';
  @Input() prj!: Project;
  @Input() link='/project/'

  name=localStorage.getItem('name');

  constructor(public router: Router, private pService: ProjectService) { }

  ngOnInit(): void {
  }

  onProfileClick(){
    console.log('profile requested= ', this.prj.author);
    this.router.navigateByUrl('/profile/'+this.prj.author);
  }

  onCardClick(ev: MouseEvent){
    console.log('card clicked ', ev.target);
    
  }

  goToProject(){
    this.pService.project=this.prj;
    this.router.navigateByUrl('/project');
  }

}
