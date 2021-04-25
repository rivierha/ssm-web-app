import {
	Component,
	OnInit,
	Input
} from '@angular/core';
import {
	Validators,
	FormControl
} from '@angular/forms';
import {
	TeamsService
} from '../services/teams.service';
import {
	UsersService
} from '../services/users.service';
import {
	Router
} from '@angular/router';
import {
	AlertService
} from '../alert';

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

	constructor(private teamsService: TeamsService, private usersService: UsersService, private router: Router, private alertService: AlertService) {
		this.teamsControl = new FormControl('', Validators.required);
		this.newTeamForm = new FormControl('', Validators.required);
	}

	async ngOnInit(): Promise < any > {
		await this.getAllTeams();
	}

	async getAllTeams() {
		try {
			await this.teamsService.getAllTeams().subscribe((res: any) => {
				this.teams = res;
			});
		} catch (error) {
			this.alertService.error('Something went wrong. Try Again!', {
				autoClose: true,
				keepAfterRouteChange: true
			})
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
					localStorage.setItem('user', JSON.stringify(res.user));
					this.router.navigate(['/instances']);
				}
			);
		} catch (error) {
			this.alertService.error('Something went wrong. Try Again!', {
				autoClose: true,
				keepAfterRouteChange: true
			});
			console.error(error);
		}
	}

	async createTeam() {
		try {
			await this.teamsService.addTeam({
				name: this.newTeamForm.value
			}).subscribe(
				(res: any) => {
					this.teams.push(res);
					this.ngOnInit();
					this.alertService.success('Team added successfully!', {
						autoClose: true,
						keepAfterRouteChange: true
					})
				});
			this.newTeamForm.reset();
		} catch (error) {
			this.alertService.error('Something went wrong. Try Again!', {
				autoClose: true,
				keepAfterRouteChange: true
			});
			console.error(error);
		}
	}

}