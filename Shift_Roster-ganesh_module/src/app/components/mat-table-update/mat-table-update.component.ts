import { ChangeDetectorRef, Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { FilterModel, FILTER_Criteria } from '../filter/filter.component';

@Component({
  selector: 'app-mat-table-update',
  templateUrl: './mat-table-update.component.html',
  styleUrls: ['./mat-table-update.component.scss']
})
export class MatTableUpdateComponent implements OnInit {
  @Input() tableData: any;
  @Input() tableColumns: any;
  dataSource!: MatTableDataSource<any>;
  @Input() formReq: any;
  @Output() selectedRow = new EventEmitter();
  @Output() selectionAfterFilter = new EventEmitter();
  @Output() selectAllEvent = new EventEmitter();
  filteredData: any;
  masterData: any;
  appliedFilters: FilterModel[] = [];
  tableForm!: FormGroup;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    let group:any ={};
    this.tableData.forEach((e:any,i:any)=>{
      group[i] = new FormControl(false);
    });
    group['selectAll'] = new FormControl(false);
    this.tableForm = new FormGroup(group);
    this.masterData = _.cloneDeep(this.tableData);
    this.filteredData = _.cloneDeep(this.tableData);
  }
// Get remote serve data using HTTP call

     
ngAfterViewChecked() {
  this.dataSource = new MatTableDataSource(this.filteredData);
  this.cdr.detectChanges();
}
ngOnChanges(changes: SimpleChanges){
  if(changes.tableData){
    let group:any ={};
    this.tableData.forEach((e:any,i:any)=>{
      group[i] = new FormControl(false);
    });
    group['selectAll'] = new FormControl(false);
    this.tableForm = new FormGroup(group);
    this.masterData =_.cloneDeep(this.tableData);
    this.filteredData =_.cloneDeep(this.tableData);
    this.dataSource = new MatTableDataSource(this.filteredData);
    this.cdr.detectChanges();
  }
  
}
selectAll(flag:any){
  if(flag!= null){
    for(let [key,value] of Object.entries(this.tableForm.controls)){
        this.tableForm.controls[key].setValue(flag);
    }
    this.tableForm.controls['selectAll'].setValue(flag);
  }
}
selectAllTable(flag:any,event:any){
if(event){
  console.log("Ganesh")
  console.log(event)
  this.selectAll(event.checked);
  if(event.checked){
    this.selectAllEvent.emit(this.tableData);
  }
  else{
    this.selectAllEvent.emit('');
  }
}
}
checkBoxChange(event:any,item:any){
 let selection:any={
   checked:event,
   item: item
 }
this.selectedRow.emit(selection);
}

  getType(column: string) {
    return 'string';
    // return 'true';
  }

  resetAll() {
    this.appliedFilters.forEach(x=>{
      x.form.reset();
    });
    this.appliedFilters=[];
    this.filterData();
  }
  isFiltered(columnName: string){
    return this.appliedFilters.find(x=>x.columnName===columnName);
  }
  filterData(event?: any | FilterModel) {
    const prevFilteredData:any[] = this.filteredData;
    this.filteredData = _.cloneDeep(this.masterData);
    this.dataSource = new MatTableDataSource(this.filteredData);
   
      if (this.appliedFilters.length > 0) {
         const filterIndex = this.appliedFilters.findIndex(x=>x.columnName===event.columnName);
        if(filterIndex>-1){
          if(!event.filterValue && event.filterOptIndex===0){
                this.appliedFilters.splice(filterIndex,1);
          }
          else if(event.filterValue==""){
            this.appliedFilters.splice(filterIndex,1);
          }
          else{
            this.appliedFilters[filterIndex] = event;
          }
        }
        else if(filterIndex === -1 && event.filterValue){
           this.appliedFilters.push(event)
        }
      }
      else if(!_.isEmpty(event)&& event.filterValue){
         this.appliedFilters.push(event);
      }

      for (let i = 0; i < this.appliedFilters.length; i++) {
        this.tableColumns.forEach((q: string | number) => {
          if (q === this.appliedFilters[i].columnName && this.appliedFilters[i].filterValue) {
            let filterOpt = this.appliedFilters[i].filterOpt;
            this.dataSource.filterPredicate = function (data:any, filter: string): boolean {
              let result = false;
              if (filterOpt === FILTER_Criteria.CONTAINS) {
                result = data[q]?.toString().toLowerCase().includes(filter);
              }
              else if (filterOpt === FILTER_Criteria.NOT_CONTAINS) {
                result = !data[q]?.toString().toLowerCase().includes(filter);
              }
              else if (filterOpt === FILTER_Criteria.STARTS_WITH) {
                result = data[q]?.toString().toLowerCase().startsWith(filter);
              }
              else if (filterOpt === FILTER_Criteria.ENDS_WITH) {
                result = data[q]?.toString().toLowerCase().endsWith(filter);
              }
              else if (filterOpt === FILTER_Criteria.EQUALS) {
                result = data[q]?.toString().toLowerCase() == (filter);
              }
              else if (filterOpt === FILTER_Criteria.NOT_EQUAL) {
                result =  data[q]?.toString().toLowerCase() != (filter);
              }
              return result;
            }
            let filterValue = this.appliedFilters[i].filterValue.trim();
            filterValue = filterValue.toLowerCase();
            this.dataSource.filter = filterValue;
            this.filteredData = this.dataSource.filteredData;
            this.dataSource = new MatTableDataSource(this.filteredData);
          }
        });
      };
    let filterObj:any = {
      all:null,
      selectedData:[],
      filteredData: this.filteredData
    }
    let group:any = {}
    this.filteredData.forEach((element:any,index:any) => {
      let value = false;
      let prevIndex = null
      prevIndex = _.findIndex(prevFilteredData, element)
      if(prevIndex != null && prevIndex != -1 && this.tableForm.controls[prevIndex].value){
        value = true;
        filterObj.selectedData.push(element)
      }
      group[index] = new FormControl(value);
    });
    filterObj.all = filterObj.selectedData.length == filterObj.filteredData.length && filterObj.filteredData.length>0
    group['selectAll'] = new FormControl(filterObj.all);
    this.tableForm = new FormGroup(group);
    this.selectionAfterFilter.emit(filterObj);
    
  }


}
