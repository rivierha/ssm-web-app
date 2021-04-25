import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InstancesComponent } from './instances/instances.component';
import {LoginComponent} from './login/login.component';
import { LogsComponent } from './logs/logs.component';
import {SignupComponent} from './signup/signup.component';
import { TeamsComponent } from './teams/teams.component';
import { AuthGuardService } from '../app/services/auth-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'teams', component: TeamsComponent, canActivate: [AuthGuardService]},
  { path: 'instances', component: InstancesComponent, canActivate: [AuthGuardService]},
  { path: 'logs/:id', component: LogsComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '/login' },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
