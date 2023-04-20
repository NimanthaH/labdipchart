import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutomationRequest } from '../model/automation.request';
import { AutomationResponse } from '../model/automation.response';
import { LabdipChartVM } from '../model/labdip.chart.vm';
import { LabdipChartRequest } from '../model/labdipchart.request';
import { Options } from '../model/options';
import { ThreadType } from '../model/thread.type.vm';
import { EnvService } from './env.service';
import { Customers } from '../model/customers';
import { HeaderMaster } from '../model/header.master';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  apiPath : string = '';
    apiVer : string = '';

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'api-version' : this.apiVer          
        })
      }; 

      
  constructor(private envService: EnvService, private http : HttpClient,  private router: Router) { 
    this.apiPath = envService.apiUrl;   //environment.apiBase.toString();
  }

  getPath():string {
    return this.apiPath;
  } 

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('api-version', `${environment.apiVer.toString()}`);
    return headers;
  }

  labdipChartProcess(body:AutomationRequest<LabdipChartRequest>):Observable<AutomationResponse<LabdipChartVM>>{
    return this.http.post<AutomationResponse<LabdipChartVM>>(`${this.getPath()}labdipchart`,body, {headers : this.getHeaders()})
  }

  getOptions():Observable<AutomationResponse<Options[]>>{
    console.log(this.getPath());
    return this.http.get<AutomationResponse<Options[]>>(`${this.getPath()}labdip/options`)
  }

  getCustomers():Observable<AutomationResponse<Customers[]>>{
    console.log(this.getPath());
    return this.http.get<AutomationResponse<Customers[]>>(`${this.getPath()}labdip/customers`)
  }

  getThredTypes():Observable<AutomationResponse<ThreadType[]>>{
    console.log(this.getPath());
    return this.http.get<AutomationResponse<ThreadType[]>>(`${this.getPath()}labdip/threadtypes`)
  }

  getHeaderMasterDetails():Observable<AutomationResponse<HeaderMaster[]>>{
    console.log(this.getPath());
    return this.http.get<AutomationResponse<HeaderMaster[]>>(`${this.getPath()}labdip/headermaster`)
  }

  //Insert
  insertThreaType(body:AutomationRequest<ThreadType>) : Observable<AutomationResponse<ThreadType[]>> {
    return this.http.post<AutomationResponse<ThreadType[]>>(`${this.getPath()}labdip/insertNewThread`, body,{ headers:this.getHeaders()} )
  }
  //Update
  updateThreadType(body:AutomationRequest<ThreadType>) : Observable<AutomationResponse<ThreadType[]>> {
    return this.http.post<AutomationResponse<ThreadType[]>>(`${this.getPath()}labdip/updateThread`, body,{ headers:this.getHeaders()} )
  }

  //Delete
  deleteThreadType(body:AutomationRequest<ThreadType>) : Observable<AutomationResponse<ThreadType[]>> {
    return this.http.post<AutomationResponse<ThreadType[]>>(`${this.getPath()}labdip/deleteThread`, body,{ headers:this.getHeaders()} )
  }


}
