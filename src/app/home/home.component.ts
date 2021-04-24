import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name = new FormControl('');

  updateName() {
    console.log(name);
    this.name.setValue('Nancy');
  }
  constructor() { }

  ngOnInit(): void {
  }

}
