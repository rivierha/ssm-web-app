import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateInstanceDialogComponent } from '../create-instance-dialog/create-instance-dialog.component';
import { UseInstanceDialogComponent } from '../use-instance-dialog/use-instance-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.css']
})
export class InstancesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [ 'name', 'status', 'created-at', 'logs', 'action','delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  constructor(private dialog: MatDialog, private router: Router ) {   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  redirectToPage(value: any) {
    console.warn(value, "Redirect called");
  }

  redirectToLogsPage(value: any) {
    console.warn(value, "RedirectToLogsPage called");
    this.router.navigate(['/logs']);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreateInstanceDialog() {

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
        data => console.log("Dialog output:", data)
    );  
  }
  
  openUseInstanceDialog() {
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
        data => console.log("Dialog output:", data)
    );  
  }

}
export interface PeriodicElement {
  id: number;
  name: string;
  status: string;
  createdAt: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', createdAt: new Date(), status: 'FREE'},
  {id: 2, name: 'Helium', createdAt: new Date(), status: 'FREE'},
  {id: 3, name: 'Lithium', createdAt: new Date(), status: 'FREE'},
  {id: 4, name: 'Beryllium', createdAt: new Date(), status: 'FREE'},
  {id: 5, name: 'Boron',createdAt: new Date(), status: 'FREE'},
  {id: 6, name: 'Carbon', createdAt: new Date(),status: 'FREE'},
  {id: 7, name: 'Nitrogen', createdAt: new Date(), status: 'FREE'},
  {id: 8, name: 'Oxygen', createdAt: new Date(), status: 'INUSE'},
  {id: 9, name: 'Fluorine', createdAt: new Date(),status: 'INUSE'},
  {id: 10, name: 'Neon', createdAt: new Date(), status: 'INUSE'},
  {id: 11, name: 'Sodium', createdAt: new Date(), status: 'INUSE'},
  {id: 12, name: 'Magnesium', createdAt: new Date(), status: 'INUSE'},
  {id: 13, name: 'Aluminum', createdAt: new Date(), status: 'INUSE'},
  {id: 14, name: 'Silicon', createdAt: new Date(), status: 'INUSE'},
  {id: 15, name: 'Phosphorus', createdAt: new Date(), status: 'INUSE'},
  {id: 16, name: 'Sulfur', createdAt: new Date(), status: 'INUSE'},
  {id: 17, name: 'Chlorine', createdAt: new Date(), status: 'INUSE'},
  {id: 18, name: 'Argon', createdAt: new Date(), status: 'INUSE'},
  {id: 19, name: 'Potassium', createdAt: new Date(), status: 'INUSE'},
  {id: 20, name: 'Calcium', createdAt: new Date(), status: 'INUSE'},
];