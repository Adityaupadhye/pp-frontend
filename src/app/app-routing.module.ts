import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.component';
import { FeedComponent } from './feed/feed.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectComponent } from './project/project.component';
import { EditProjectComponent } from './Projects/edit-project/edit-project.component';
import { MyProjectsComponent } from './Projects/my-projects/my-projects.component';
import { UserProjectsComponent } from './Projects/user-projects/user-projects.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'feed',
    component: FeedComponent
  },
  {
    path: 'myprofile',
    component: ProfileComponent
  },
  {
    path: 'profile/:uid',
    component: UserProfileComponent
  },
  {
    path: 'project',
    component: ProjectComponent
  },
  {
    path: 'project/:pid',
    component: ProjectComponent
  },
  {
    path: 'myprojects',
    component: MyProjectsComponent
  },
  {
    path: 'projects/:uid',
    component: UserProjectsComponent
  },
  {
    path: 'createProject',
    component: CreateProjectComponent
  },
  {
    path: 'editProject',
    component: EditProjectComponent
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
