import {AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateInstanceDialogComponent } from '../create-instance-dialog/create-instance-dialog.component';
import { UseInstanceDialogComponent } from '../use-instance-dialog/use-instance-dialog.component';
import { Router } from '@angular/router';
import { Instance } from '../models/instance.model';
import { InstancesService } from '../services/instances.service';
import { LogsService } from '../services/logs.service';
import {interval} from "rxjs/internal/observable/interval";
import { Subscription } from 'rxjs';
import {startWith, switchMap} from "rxjs/operators";
import { AlertService } from '../alert';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.css']
})
  
export class InstancesComponent implements OnInit, AfterViewInit {

  @Input() instances: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'status', 'createdAt', 'logs', 'action', 'delete'];
  dataSource = new MatTableDataSource < Instance > (this.instances);
  timeInterval: Subscription;
 
  constructor(public alertService: AlertService, private dialog: MatDialog, private router: Router, private instancesService: InstancesService, private logsService: LogsService) {}

  async ngOnInit(): Promise < any > {
    try {
      let user: any = localStorage.getItem('user');
      user = JSON.parse(user);
      this.timeInterval = interval(5000)
        .pipe(
          startWith(0),
          switchMap(() => this.instancesService.getAllInstances(user.team.id))
        ).subscribe((res: any) => {
          this.instances = res;
          this.dataSource = new MatTableDataSource < Instance > (this.instances);
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

  redirectToLogsPage(instance: any) {
    this.router.navigate([`/logs/${instance.id}`]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.timeInterval.unsubscribe();
  }

  async openCreateInstanceDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };
    this.dialog.open(CreateInstanceDialogComponent, dialogConfig);
    const dialogRef = this.dialog.open(CreateInstanceDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      async (data: any) => {
        if (data.name)
          await this.createNewInstance(data.name);
      }
    );
  }

  async deleteInstance(instance: any) {
    try {
      await this.instancesService.deleteInstance(instance).subscribe(
        (res: any) => {
          this.instances.pop(instance);
          this.ngOnInit();
          this.alertService.success('Instance successfully deleted!', {
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

  async createNewInstance(instanceName: string): Promise < any > {
    try {
      let user: any = localStorage.getItem('user');
      user = JSON.parse(user);
      let newInstanceData: any = {
        name: instanceName,
        team: user.team.id
      }
      await this.instancesService.addInstance(newInstanceData).subscribe(
        (res: any) => {
          this.instances.push(res);
          this.ngOnInit();
          this.alertService.success('Instance successfully created!', {
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

  openUseInstanceDialog(instance: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };
    this.dialog.open(UseInstanceDialogComponent, dialogConfig);
    const dialogRef = this.dialog.open(UseInstanceDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      async (data: any) => {
        if (data.reason)
          await this.createInstanceLog(data.reason, instance.id);
      }
    );
  }

  async createInstanceLog(reason: string, instanceId: string) {
    try {
      let user: any = localStorage.getItem('user');
      user = JSON.parse(user);
      let newInstanceLogData: any = {
        reason: reason,
        user: user.id,
        instance: instanceId
      };
      await this.logsService.addLog(newInstanceLogData).subscribe(
        (res: any) => {
          this.ngOnInit();
          this.alertService.info('Instance in-use!', {
            autoClose: true,
            keepAfterRouteChange: true
          });
        }
      )
    } catch (error) {
      this.alertService.error('Something went wrong. Try Again!', {
        autoClose: true,
        keepAfterRouteChange: true
      });
      console.error(error);
    }


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