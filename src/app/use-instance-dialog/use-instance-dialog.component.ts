import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-use-instance-dialog',
  templateUrl: './use-instance-dialog.component.html',
  styleUrls: ['./use-instance-dialog.component.css']
})
export class UseInstanceDialogComponent implements OnInit {

  form: FormGroup;
  reason: string;

  constructor(private fb: FormBuilder,
      private dialogRef: MatDialogRef<UseInstanceDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data: any) {
      this.reason = data.description;
  }

  ngOnInit() {
        this.form = this.fb.group({
            reason: ['', [Validators.required]],
        });
    }

  save() {
        this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}
