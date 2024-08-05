import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestData, tableData, swapData} from '../data';
import { dummyData } from '../data';

@Injectable({
  providedIn: 'root'
})
export class MonthlyRosterService {

  constructor(private http: HttpClient) { }
  getMonthlyRosterData(body:any): Observable<any>{
    if(environment.localData){
      return of(tableData);
    }
    return this.http.post(environment.baseUrl+'monthlyRoster',body)
  }
  getRosterupdateData(body:any): Observable<any>{
    if(environment.localData){
      return of(dummyData);
    }
  
    return this.http.post(environment.baseUrl+'updateRoster',body)
  }
  getRequestedData(body:any): Observable<any>{
    if(environment.localData){
      return of(RequestData);
    }
  
    return this.http.post(environment.baseUrl+'Request',body)
  }
  getSwapData(body:any): Observable<any>{
    if(environment.localData){
      return of(swapData);
    }
  
    return this.http.post(environment.baseUrl+'Request',body)
  }

}
