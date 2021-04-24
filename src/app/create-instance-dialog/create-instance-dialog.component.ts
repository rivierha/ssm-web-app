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

  // async createNewInstance(instanceName: string): Promise<any> {
  //   try {
  //     let team: any = localStorage.getItem('team');
  //     team = JSON.parse(team);
  //     console.log(team);
  //     let newInstanceData: any = {
  //       name: instanceName,
  //       team: team.id
  //     }
  //     await this.instancesService.addInstance(newInstanceData).subscribe(
  //       (res: any) => {
  //         console.log("instance", res);
  //         this.ngOnInit();
  //         alert('Instance created succesfully!');
  //       }
  //     );
  //   } catch (error) {
  //     alert('Something went wrong. Try Again!');
  //     console.warn(error);
  //   }
  // }
}
