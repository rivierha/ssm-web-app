import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
// import { InstancesService } from '../services/instances.service';

@Component({
  selector: 'app-create-instance-dialog',
  templateUrl: './create-instance-dialog.component.html',
  styleUrls: ['./create-instance-dialog.component.css']
})
export class CreateInstanceDialogComponent implements OnInit {

  form: FormGroup;
  name: string;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<CreateInstanceDialogComponent>,
      // private instancesService: InstancesService,
      @Inject(MAT_DIALOG_DATA) data: any) {
      this.name = data.description;
  }

  ngOnInit() {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
        });
    }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}
