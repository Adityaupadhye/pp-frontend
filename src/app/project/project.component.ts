import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(public pService: ProjectService, private location: Location, 
              private spinner: NgxSpinnerService, private arouter: ActivatedRoute) { }
  
  params:any={};

  ngOnInit(): void {
    this.arouter.params.subscribe((params)=>{
      this.params=params;
    })

    console.log(this.params, JSON.stringify(this.params));
    
  }

  goBack(){
    this.location.back();
  }

}
