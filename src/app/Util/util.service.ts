import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    public titleService: Title,
    public spinner: NgxSpinnerService,
    public snackbar: MatSnackBar,
    public router: Router,
    public uService: UserService,
    public pService: ProjectService,
    public dialog: MatDialog,
    public aroute: ActivatedRoute
  ) { }
}
