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

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.css']
})
export class InstancesComponent implements OnInit, AfterViewInit {

  @Input() instances: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [ 'name', 'status', 'created-at', 'logs', 'action','delete'];
  dataSource = new MatTableDataSource<Instance>(this.instances);
  timeInterval: Subscription;
  
  constructor(private dialog: MatDialog, private router: Router, private instancesService: InstancesService, private logsService: LogsService ) {   }

  async ngOnInit(): Promise<any> {
    try {
      let user: any = localStorage.getItem('user');
        user = JSON.parse(user);
        console.log(user);
      this.timeInterval = interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.instancesService.getAllInstances(user.team.id))
      ).subscribe((res: any) => {
          this.instances = res;
          this.dataSource = new MatTableDataSource<Instance>(this.instances);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      });
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Try Again!');
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  redirectToLogsPage(instance: any) {
    console.warn(instance, "RedirectToLogsPage called");
    this.router.navigate([`/logs/${instance.id}`]);                                                                                                                        
  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        console.log("Dialog output:", data);
        if(data.name)
          await this.createNewInstance(data.name);
      }
    ); 
  }

  async deleteInstance(instance: any) {
    try {
      await this.instancesService.deleteInstance(instance).subscribe(
        (res: any) => {
          console.log("instance-delete", res);
          this.instances.pop(instance);
          this.ngOnInit();
          alert('Instance deleted succesfully!');
        }
      );
    } catch (error) {
      alert('Something went wrong. Try Again!');
      console.warn(error);
    }
  }

  async createNewInstance(instanceName: string): Promise<any> {
    try {
      let user: any = localStorage.getItem('user');
      user = JSON.parse(user);
      console.log(user);
      let newInstanceData: any = {
        name: instanceName,
        team: user.team.id
      }
      await this.instancesService.addInstance(newInstanceData).subscribe(
        (res: any) => {
          console.log("instance", res);
          this.instances.push(res);
          this.ngOnInit();
          alert('Instance created succesfully!');
        }
      );
    } catch (error) {
      alert('Something went wrong. Try Again!');
      console.warn(error);
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
        if(data.reason)
          await this.createInstanceLog(data.reason, instance.id);
      }
    );  
  }

  async createInstanceLog(reason: string, instanceId: string) {
    try {
      let user: any = localStorage.getItem('user');
      user = JSON.parse(user);
      console.log(user);
      let newInstanceLogData: any = {
        reason: reason,
        user: user.id,
        instance: instanceId
      };
      await this.logsService.addLog(newInstanceLogData).subscribe(
        (res: any) => {
          console.log("log", res);
          this.ngOnInit();
          alert('Instance in use!');
        }
      )
    } catch (error) {
      alert('Something went wrong. Try Again!');
      console.warn(error);
    }
    

  }

  getDateFormat(val: string): string {
    let date = new Date(val);
    return date.getDate() + ":" + date.getMonth() + ":" + date.getFullYear()
      + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }

  ngOnDestroy(): void {
    this.timeInterval.unsubscribe();
  }

}