import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InstancesComponent } from './instances/instances.component';
import {LoginComponent} from './login/login.component';
import { LogsComponent } from './logs/logs.component';
import {SignupComponent} from './signup/signup.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'instances', component: InstancesComponent },
  { path: 'logs', component: LogsComponent },
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
