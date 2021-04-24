import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teamsControl: FormControl;
  newTeamForm: FormControl;
  selectedValue: string = '';
  teams: any = [
    {id: 1, name: 'Frontend'},
    {id: 2, name: 'Backend'},
    {id: 3, name: 'UI/UX'},
    {id: 4, name: 'Observability'},
  ];

  constructor() { 
    this.teamsControl = new FormControl('', Validators.required);
    this.newTeamForm = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
  }

  addTeam() {
    console.warn(this.teamsControl.value);
  }

  createTeam() {
    console.warn(this.newTeamForm.value);
  }

}
