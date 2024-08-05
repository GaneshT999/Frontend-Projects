import {  ChangeDetectorRef, Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { EmpData, Employee } from 'src/app/data';
import { MonthlyRosterService } from 'src/app/services/monthly-roster.service';
import { FilterModel, FILTER_Criteria } from '../filter/filter.component';


@Component({
  selector: 'app-update-roster',
  templateUrl: './update-roster.component.html',
  styleUrls: ['./update-roster.component.scss']
})
export class UpdateRosterComponent implements OnInit {
 dataSource!: MatTableDataSource<any>;
  filteredData: Employee[] = [];
  masterData: Employee[] = [];
  selectedTableData: Employee[] = [];
  appliedFilters: FilterModel[] = [];
  displayedColumns : string[] = ['name', 'team', 'location', 'shift'];
  tableForm!: FormGroup;
  dummyEvent:any;
  checkSelect: boolean = false;
  rosterTableSelectAll = false;
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());
  constructor(private rosterService :MonthlyRosterService,private cdr: ChangeDetectorRef) {
   }
  Shifts =[
    'shift A',
    'shift B',
    'shift C',
    'Holiday',
    'CompOFF'
  ];
  ngOnInit(): void {
    let searchReq:EmpData = new EmpData();
    this.rosterService.getRosterupdateData(searchReq).subscribe((result:any) =>{
      console.log(result)
      if(result){
        this.masterData = result;
        this.filteredData= _.cloneDeep(this.masterData);
        this.dataSource = new MatTableDataSource(this.filteredData);
        let group:any ={};
        this.masterData.forEach((e:any,i:any)=>{
          group[i] = new FormControl(false);
        });
        group['selectAll'] = new FormControl(false);
        this.tableForm = new FormGroup(group);
        this.filteredData = _.cloneDeep(this.masterData);
      }
    }
  
    )
  }
       
ngAfterViewChecked() {
  this.dataSource = new MatTableDataSource(this.filteredData);
  this.cdr.detectChanges();
}
ngOnChanges(changes: SimpleChanges){
  if(changes.tableData){
    let group:any ={};
    this.masterData.forEach((e:any,i:any)=>{
      group[i] = new FormControl(false);
    });
    group['selectAll'] = new FormControl(false);
    this.tableForm = new FormGroup(group);
    this.filteredData =_.cloneDeep(this.masterData);
    this.dataSource = new MatTableDataSource(this.filteredData);
    this.cdr.detectChanges();
  }
  
}
selectAllData(flag:any){
  if(flag!= null){
    for(let [key,value] of Object.entries(this.tableForm.controls)){
        this.tableForm.controls[key].setValue(flag);
    }
    this.tableForm.controls['selectAll'].setValue(flag);
  }
}
selectAllTable(flag:any,event:any){
if(flag){
  console.log("Ganesh")
  console.log(event)
  this.selectAllData(event.checked);
  if(event.checked){
    this.checkSelect = true;
   this.selectedTableData = this.filteredData;
   console.log(this.selectedTableData)
  }
  else{
    this.checkSelect = false;
    this.selectedTableData = [];
  }
}
else{
  if(this.selectedTableData == this.filteredData){
    this.checkSelect = true;
  }
  else{
    this.checkSelect = false;
  }
  console.log('select all uncheck')
  
}
}
checkBoxChange(event:any,item:any){
 console.log(event)
 if(event && event.checked){
   this.selectedTableData.push(item)
   if(this.selectedTableData == this.filteredData){
    this.selectAllTable(true,this.dummyEvent);
   }
 }
 else{
   this.selectedTableData = this.selectedTableData.filter(x=>x!=item)
   this.selectAllTable(false,this.dummyEvent);
 }
 console.log(this.selectedTableData)
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
        this.displayedColumns.forEach((q: string | number) => {
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
      selectedData1:[],
      filteredData1: this.filteredData
    }
    let group:any = {}
    this.filteredData.forEach((element:any,index:any) => {
      let value = false;
      let prevIndex = null
      prevIndex = _.findIndex(prevFilteredData, element)
      if(prevIndex != null && prevIndex != -1 && this.tableForm.controls[prevIndex].value){
        value = true;
        filterObj.selectedData1.push(element)
      }
      group[index] = new FormControl(value);
    });
    filterObj.all = filterObj.selectedData1.length == filterObj.filteredData1.length && filterObj.filteredData.length>0
    group['selectAll'] = new FormControl(filterObj.all);
    this.tableForm = new FormGroup(group);
    console.log('from filter obj')
    console.log(filterObj)
    filterObj.selectedData1.forEach((element:any) => {
      let selectedone = null;
      selectedone = _.findIndex(this.selectedTableData,element);
      if(selectedone == null ||  selectedone == -1){
        this.selectedTableData.push(element)
      }
    });
    console.log(this.selectedTableData)
  }


}

  


