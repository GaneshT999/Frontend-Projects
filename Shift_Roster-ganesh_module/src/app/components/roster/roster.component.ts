import {Component,ChangeDetectionStrategy,ViewChild,TemplateRef,OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Employee } from 'src/app/data';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { FilterModel, FILTER_Criteria } from '../filter/filter.component';
import * as _ from 'lodash';
import { UpdateRosterComponent } from '../update-roster/update-roster.component';
import { MonthlyRosterService } from 'src/app/services/monthly-roster.service';
@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {
  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;
  @ViewChild('rosterDate')
  rosterDate! : TemplateRef<any>;
  dataSource = new MatTableDataSource();
  view: CalendarView = CalendarView.Month;
  element: Employee[] = [];
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  selection = new SelectionModel<Employee>(true, []);
  filterSelectObj = [];
  filterValues = {};
  tableDataSrc: any;
  date = new Date();
  m:any;
  y:any;
  d:any;
  dates:any=[];
  i=0;
  dy:any;
  weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  monthBool: boolean = false;
  dt:any;
  public searchForm!: FormGroup;
  public Name = '';
  public Team = '';
  public Location = '';
  public Shift = '';
  filteredData: any;
  masterData: any;
  appliedFilters: FilterModel[] = [];
  resetObj = { isReset: false };
  tableSource: any;
  resetFilter:boolean = false;
  constructor(private matDialog: MatDialog, private rosterService:MonthlyRosterService) {
    this.getData();
  }
  

  refresh = new Subject<void>();

  


activeDayIsOpen: boolean = true;
previous(){
  this.dates= ["resourceName","team","location"];
  if(this.m==0){
     this.m=11;
     this.y=this.y-1;
  }
  else{
    this.m = this.m-1;
  }
  this.renderTable(this.m,this.y);

}
Today(){
    this.dates= ["resourceName","team","location"];
    this.m = this.date.getMonth();
    this.y = this.date.getFullYear();
    this.renderTable(this.m,this.y);
}
NextMonth(){
  this.dates= ["resourceName","team","location"];
  if(this.m==11){
     this.m=0;
     this.y=this.y+1;
  }
  else{
    this.m = this.m+1;
  }
  this.renderTable(this.m,this.y);
}
renderTable(m:any,y:any){
  this.dataSource = new MatTableDataSource(this.filteredData);
  if(this.m==0 || this.m==2 || this.m==4 || this.m==6 || this.m==7 || this.m==9 || this.m==11){
      this.d=31;
  }
  else if(this.m==1){
      if(this.y%4==0){
          this.d=29;
      }
      else{
          this.d=28;
      }
  }
  else{
      this.d=30;
  }
var firstDay = new Date(y, m, 1);
for(this.i=1;this.i<=this.d;this.i++){
 var wd =  this.weekday[firstDay.getDay()] 
 wd = this.i.toString()+" "+wd;
 this.dates.push(wd);
 firstDay.setDate(firstDay.getDate() + 1);
}
}
  ngOnInit(): void {
    this.dates= ["resourceName","team","location"];
    this.m = this.date.getMonth();
    this.y = this.date.getFullYear();
    this.renderTable(this.m,this.y);
  }
  requestUpdate(){
    this.matDialog.open(UpdateRosterComponent,{height:'45rem',width:'80rem'});
  }

dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  setView(view: CalendarView) {
    this.view = view;
    this.monthBool = !this.monthBool;
  }
  
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.filteredData);
  }
  getData() {
    let searchReq:any;
    this.rosterService.getMonthlyRosterData(searchReq).subscribe((result:any) =>{
      if(result){
        console.log(result)
        this.masterData = result;
        this.filteredData= _.cloneDeep(this.masterData);
        this.dataSource = new MatTableDataSource(this.filteredData);
      }
    }

    )
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
          this.dates.forEach((q: string | number) => {
            if (q === this.appliedFilters[i].columnName && this.appliedFilters[i].filterValue) {
              let filterOpt = this.appliedFilters[i].filterOpt;
              let fromFilter = this.appliedFilters[i].filterValue;
              let toFilter = this.appliedFilters[i].filterValueTo;
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
     
  
    }
  

}
