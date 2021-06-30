import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from 'ngx-spinner';
import { FeedComponent } from './feed/feed.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AccountDelete, DeleteDialog, ProfileComponent } from './profile/profile.component';
import { ProjectComponent } from './project/project.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyProjectsComponent } from './Projects/my-projects/my-projects.component';
import { UserProjectsComponent } from './Projects/user-projects/user-projects.component';
import { EditProjectComponent } from './Projects/edit-project/edit-project.component';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedComponent,
    NavbarComponent,
    ProjectCardComponent,
    ProfileComponent,
    ProjectComponent,
    CreateProjectComponent,
    UserProfileComponent,
    MyProjectsComponent,
    UserProjectsComponent,
    DeleteDialog,
    AccountDelete,
    EditProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    InfiniteScrollModule,
    NgxEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
