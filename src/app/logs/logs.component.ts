import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LogsService } from '../services/logs.service';
import { ActivatedRoute } from '@angular/router';
import { Log } from '../models/log.model';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() logs: any = [];

  displayedColumns: string[] = [ 'reason', 'user', 'start-time', 'end-time', 'total-time', 'delete'];
  dataSource = new MatTableDataSource<Log>(this.logs);

  logsControl: FormControl;

  constructor(private logsService: LogsService, private route: ActivatedRoute) { 
    this.logsControl = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    this.getAllLogs();
  }

  async getAllLogs() {
    try {
      const id = this.route.snapshot.paramMap.get('id');
      console.log(id, "id");
      await this.logsService.getAllLogs(id).subscribe((res: any) => {
        console.log("logs", res);
        this.logs = res;
        this.dataSource = new MatTableDataSource<Log>(this.logs);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    } catch (error) {
      console.error(error);
    }
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async deleteLog(value: any) {
    try {
      await this.logsService.deleteLog(value).subscribe(
        (res: any) => {
          console.log("log-delete", res);
          this.logs.pop(value);
          this.ngOnInit();
          alert('Instance log deleted succesfully!');
        }
      );
    } catch (error) {
      alert('Something went wrong. Try Again!');
      console.warn(error);
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
    console.warn(this.logsControl.value);
  }

  getDateFormat(val: string): string {
    let date = new Date(val);
    return date.getDate() + ":" + date.getMonth() + ":" + date.getFullYear()
      + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }

}