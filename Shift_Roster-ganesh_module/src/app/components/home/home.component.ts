import { Component, ViewChild,Inject,OnInit  } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup } from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ReqData, SwapData } from 'src/app/data';
import { MonthlyRosterService } from 'src/app/services/monthly-roster.service';
import { TitlePipe } from 'src/app/utils/pipes/titlePipe';
@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  masterData = [];
  dataSource!: MatTableDataSource<ReqData>;
  swapDataSource! :MatTableDataSource<SwapData>;
  contentView: boolean = true;
  headerview: boolean = true;
  viewRoster: boolean = true;
  timeOffReq: boolean = false;
  reqTo: boolean = false;
  swapReq: boolean = false;
  myControl = new FormControl();
  displayedColumns= ['resourceName','type','startDate','endDate','currentShift','reason','action']
  swapColumns = ['resourceName','actualShiftDate','actualShift','desiredShiftDate','desiredShift','reason','action']
  reqColumns= ['resourceName','type','startDate','endDate','currentShift','reason']
  options = [
    'One12',
    'Two',
    'Three',
    'One23',
    'Two1234',
    'Three abcd',
    'Four'
  ];
  constructor(private rosterService :MonthlyRosterService,private observer: BreakpointObserver, private router: Router,private matDialog: MatDialog) { }
  filteredOptions!: Observable<string[]>;
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    let searchReq:ReqData = new ReqData();
    this.rosterService.getRequestedData(searchReq).subscribe((result:any) =>{
      console.log(result)
      if(result){
        this.masterData = result;
        this.dataSource = new MatTableDataSource<ReqData>(this.masterData);
      }
    }
    )
    let swapRequest:SwapData = new SwapData();
    this.rosterService.getSwapData(swapRequest).subscribe((result:any) =>{
      console.log(result)
      if(result){
        this.swapDataSource = new MatTableDataSource<SwapData>(result);
      }
    }
    )
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  Locations = [
    'All',
    'Bengalore',
    'Gurgaon',
    'Hyderabad',
    'Mumbai'
    
];
Teams = [
  'Team 1',
  'Team 2',
  'Team 3',
  'Team 4',
  'Team 5',
  'Team 6'
];
Shifts =[
  'shift A',
  'shift B',
  'shift C'
];
searchFn(){
  this.contentView = false;
  this.viewRoster = true;
}
request(){
  this.matDialog.open(DialogComponent);
  this.timeOffReq = false
  this.swapReq = false
}
requestProject(){
this.matDialog.open(ProjectDialogComponent,{width:'25rem',height:'30rem'});
}
requestUser(){
  this.matDialog.open(UserDialogComponent,{width:'25rem',height:'38rem'});
}
requestForm(){
this.viewRoster = false;
}
TimeOffReq(){
  this.timeOffReq = true
  this.swapReq = false
}
swapOnReq(){
  this.timeOffReq = false
  this.swapReq = true
}
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
          this.headerview = false;
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
          this.headerview = true;
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
}
