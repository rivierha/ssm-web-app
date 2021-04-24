import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [ 'reason', 'user', 'start-time', 'end-time', 'total-time', 'delete'];
  dataSource = new MatTableDataSource<Logs>(LOG_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  logsControl: FormControl;

  constructor() { 
    this.logsControl = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  redirectToPage(value: any) {
    console.warn(value, "Redirect called");
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

}

export interface Logs {
  id: number;
  reason: string;
  user: {};
  startTime: Date;
  endTime: Date;
  totalTime: number;
  createdAt: Date;
}

const LOG_DATA: Logs[] = [
  {id: 1, reason: 'Hydrogen', createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 2, reason: 'Helium', createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 3, reason: 'Lithium', createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 4, reason: 'Beryllium', createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 5, reason: 'Boron',createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 6, reason: 'Carbon', createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 7, reason: 'Nitrogen', createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 8, reason: 'Oxygen', createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 9, reason: 'Fluorine', createdAt: new Date(),user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 10, reason: 'Neon', createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 11, reason: 'Sodium', createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 12, reason: 'Magnesium', createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 13, reason: 'Aluminum', createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 14, reason: 'Silicon', createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 15, reason: 'Phosphorus', createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 16, reason: 'Sulfur', createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 17, reason: 'Chlorine', createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 18, reason: 'Argon', createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  {id: 19, reason: 'Potassium', createdAt: new Date(), user: { name: 'ABC'}, startTime: new Date(), endTime: new Date(), totalTime: 5},
  { id: 20, reason: 'Calcium', createdAt: new Date(), user: { name: 'ABC' }, startTime: new Date(), endTime: new Date(), totalTime: 5 }
]