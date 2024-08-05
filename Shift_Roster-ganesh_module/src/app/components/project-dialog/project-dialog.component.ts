import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { customEmail } from '../register/register.component';
@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {
  EditProjectForm !: FormGroup;

  constructor(public dialogRef: MatDialogRef<ProjectDialogComponent>,private formBuilder : FormBuilder) { }

  ngOnInit(): void { this.EditProjectForm = this.formBuilder.group({
    userName:['',Validators.required],
    emailId:['',[Validators.required , customEmail.emailDomain, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
    project:['',Validators.required]
  })
  }
  onSubmit() {
  }

  onClose() {

    this.dialogRef.close();
  }

}
