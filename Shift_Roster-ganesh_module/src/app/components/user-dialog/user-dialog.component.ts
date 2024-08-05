import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { customEmail } from '../register/register.component';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  EditUserForm ! : FormGroup;
  options = [
    'One12',
    'Two',
    'Three',
    'One23',
    'Two1234',
    'Three abcd',
    'Four'
  ];
  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,private formBuilder : FormBuilder) { }
  filteredOptions!: Observable<string[]>;
  ngOnInit(): void {
    this.EditUserForm = this.formBuilder.group({
      userName:['',Validators.required],
      emailId:['',[Validators.required , customEmail.emailDomain, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      project:['',Validators.required],
      role:['',Validators.required]
    })
    this.filteredOptions = this.EditUserForm.controls.project.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  onSubmit() {
  }

  onClose() {

    this.dialogRef.close();
  }
}
