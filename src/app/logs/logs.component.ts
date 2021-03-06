import {
	AfterViewInit,
	Component,
	OnInit,
	ViewChild,
	Input
} from '@angular/core';
import {
	MatPaginator
} from '@angular/material/paginator';
import {
	MatSort
} from '@angular/material/sort';
import {
	MatTableDataSource
} from '@angular/material/table';
import {
	Validators,
	FormControl
} from '@angular/forms';
import {
	LogsService
} from '../services/logs.service';
import {
	ActivatedRoute
} from '@angular/router';
import {
	Log
} from '../models/log.model';
import {
	interval
} from "rxjs/internal/observable/interval";
import {
	Subscription
} from 'rxjs';
import {
	startWith,
	switchMap
} from "rxjs/operators";
import {
	AlertService
} from '../alert';

@Component({
	selector: 'app-logs',
	templateUrl: './logs.component.html',
	styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit, AfterViewInit {

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@Input() logs: any = [];

	displayedColumns: string[] = ['reason', 'user', 'start-time', 'end-time', 'total-time', 'delete'];
	dataSource = new MatTableDataSource < Log > (this.logs);
	logsControl: FormControl;
	timeInterval: Subscription;


	constructor(private logsService: LogsService, private route: ActivatedRoute, private alertService: AlertService) {
		this.logsControl = new FormControl('', Validators.required);
	}

	async ngOnInit(): Promise < any > {
		try {
			const instanceId = this.route.snapshot.paramMap.get('id');
			this.timeInterval = interval(5000)
				.pipe(
					startWith(0),
					switchMap(() => this.logsService.getAllLogs({
						instanceId,
						time: 100
					}))
				).subscribe((res: any) => {
					this.logs = res;
					this.dataSource = new MatTableDataSource < Log > (this.logs);
					this.dataSource.sort = this.sort;
					this.dataSource.paginator = this.paginator;
				});
		} catch (error) {
			console.error(error);
			this.alertService.error('Something went wrong. Try Again!', {
				autoClose: true,
				keepAfterRouteChange: true
			});
		}
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	async getAllLogs(time: number) {
		try {
			const instanceId = this.route.snapshot.paramMap.get('id');
			await this.logsService.getAllLogs({
				instanceId,
				time
			}).subscribe((res: any) => {
				this.logs = res;
				this.dataSource = new MatTableDataSource < Log > (this.logs);
				this.dataSource.sort = this.sort;
				this.dataSource.paginator = this.paginator;
			});
			this.timeInterval.unsubscribe();
		} catch (error) {
			console.error(error);
			this.alertService.error('Something went wrong. Try Again!', {
				autoClose: true,
				keepAfterRouteChange: true
			});
    }
	}

	async deleteLog(value: any) {
		try {
			await this.logsService.deleteLog(value).subscribe(
				(res: any) => {
					this.logs.pop(value);
					this.ngOnInit();
					this.alertService.info('Log deleted!', {
						autoClose: true,
						keepAfterRouteChange: true
					});
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

	public doFilter = (value: string) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	getLogs() {
		this.getAllLogs(this.logsControl.value);
	}

	getDateFormat(val: string): string {
		let date = new Date(val);
		return date.getDate() + ":" + date.getMonth() + ":" + date.getFullYear() +
			" " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	}

	ngOnDestroy(): void {
		this.timeInterval.unsubscribe();
	}

}