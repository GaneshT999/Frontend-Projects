import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-filter',
  templateUrl:'./filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  oldValue:string='';
  constructor(private formBuilder: FormBuilder) { }
  filterForm: FormGroup = new FormGroup({});
  filterOptions: string[] = [];
  @Output() emitFilter = new EventEmitter<FilterModel>();
  @Input() columnName: string = '';
  @Input() columnDataType: string = '';
  @Input() reset = { isReset: false };
  @Input() allValues:any;
  oldForm:any;
  ngOnInit(): void {
    if (this.columnDataType === 'number') {
      this.filterOptions = ['Equals', 'Not equal', 'Greater than', 'Greater than or equals',
        'Less than', 'Less than or equals', 'In range'];
    }
    else if (this.columnDataType === 'string') {
      this.filterOptions = ['Contains', 'Not contains', 'Equals', 'Not equal', 'Starts with', 'Ends with'];
    }
    else if (this.columnDataType === 'date') {
      this.filterOptions = ['Equals', 'Not equal', 'Greater than', 'Less than', 'In range'];
    }
    if(this.allValues){
      if(this.allValues.length!==0){
        this.allValues.array.forEach((q: { columnName: any; filterValue: string; })=> {
          if(q.columnName===this.columnName){
              this.oldValue=q.filterValue
          }
        });
      }
    }
    this.filterForm = this.formBuilder.group({
      filterOpt: [this.filterOptions[0]],
      filterValue: [this.oldValue],
      filterValueTo: [''],
      cName: this.columnName
    });
    this.oldForm = _.cloneDeep(this.filterForm);
  }
  ngOnChanges(){
    setTimeout(()=>{if(this.allValues){
      if(this.allValues.length===0){
        if(this.filterForm){
          this.filterForm.setValue({
            filterOpt: this.filterOptions[0],
            filterValue: '',
            filterValueTo: null,
            cName: this.columnName
          });
        }
      }
    }})
  }

  ngDoCheck() {
    if (!this.filterForm.controls.filterOpt.value) {
      this.filterForm.setValue({
        filterOpt: this.filterOptions[0],
        filterValue: '',
        filterValueTo: null,
        cName: this.columnName
      });
    }
  }

  getPlaceholder() {
    if (this.filterForm.controls.filterOpt.value === FILTER_Criteria.IN_RANGE) {
      return 'From';
    }
    return 'Filter...';
  }

  sendFilterData() {
    if(this.oldForm != this.filterForm){
      this.emitFilter.emit({
        filterOpt: this.filterForm.controls.filterOpt.value,
        filterOptIndex: this.filterOptions.findIndex(x => x === this.filterForm.controls.filterOpt.value),
        filterValue: this.filterForm.controls.filterValue.value,
        filterValueTo: this.filterForm.controls.filterValueTo.value,
        columnName: this.columnName,
        columnDataType: this.columnDataType,
        form: this.filterForm
      });
    }
    else{
      this.emitFilter.emit();
    }
    
  }
}

export interface FilterModel {
  filterOpt: string;
  filterOptIndex: number;
  filterValue: string;
  filterValueTo: string;
  columnName: any;
  columnDataType: string;
  form: any;
}
export const FILTER_Criteria = {
  CONTAINS: 'Contains',
  NOT_CONTAINS: 'Not contains',
  EQUALS: 'Equals',
  NOT_EQUAL: 'Not equal',
  STARTS_WITH: 'Starts with',
  ENDS_WITH: 'Ends with',
  GREATER: 'Greater than',
  GREATER_EQ: 'Greater than or equals',
  LESSER: 'Less than',
  LESSER_EQ: 'Less than or equals',
  IN_RANGE: 'In range'
};

