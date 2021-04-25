import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { TeamsService } from '../services/teams.service';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teamsControl: FormControl;
  newTeamForm: FormControl;
  selectedValue: any;
  @Input() teams: any = [];

  constructor(private teamsService: TeamsService, private usersService: UsersService, private router: Router ) { 
    this.teamsControl = new FormControl('', Validators.required);
    this.newTeamForm = new FormControl('', Validators.required);
  }

  async ngOnInit(): Promise<any> {
    await this.getAllTeams();
  }

  async getAllTeams() {
    try {
      await this.teamsService.getAllTeams().subscribe((res: any) => {
        console.log("team", res);
        this.teams = res;
      });
    } catch (error) {
      alert('Something went wrong. Try Again!');
      console.error(error);
    }
  }

  async addTeam() {
    try {
      let user: any = localStorage.getItem('user');
      user = JSON.parse(user);
      user.team = this.selectedValue.id;
      await this.usersService.editUser(user).subscribe(
        (res: any) => {
          console.log("user", res);
          localStorage.setItem('user', JSON.stringify(res));
          alert('User updated succesfully!');
          this.router.navigate(['/instances']);
        }
      );
    } catch (error) {
      alert('Something went wrong. Try Again!');
      console.warn(error);
    }
    console.warn(this.teamsControl.value);
  }

  async createTeam() {
    try {
      await this.teamsService.addTeam({ name: this.newTeamForm.value }).subscribe(
        (res: any) => {
          console.log("teams", res.team);
          this.teams.push(res);
          this.ngOnInit();
          alert('Team created succesfully!');
        });
    } catch (error) {
      alert('Something went wrong. Try Again!');
      console.warn(error);
    }
  }

}
