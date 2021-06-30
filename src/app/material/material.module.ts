import { NgModule } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const MaterialComponents = [
  MatCardModule,
  MatButtonModule,
  MatSnackBarModule,
  MatIconModule,
  MatFormFieldModule,
  MatChipsModule,
  MatSidenavModule,
  MatDialogModule,
  MatAutocompleteModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
