import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { NotificationsService } from '../shared/notifications.service';
import { FormControl,FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  myForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<DialogComponent>,private notificationService: NotificationsService,) { }
Reasons = [
  'Sick Day','Vacation','Parental Leave','Off','unpaid','Causal Leave'
]
Shifts = [
  '1','2','3'
]
  
  onClear() {
    this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {
  }

  onClose() {

    this.dialogRef.close();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      pic2: new FormControl(''),
      pic3: new FormControl('')
    });
  }

}
