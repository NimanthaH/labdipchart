import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { compilePipeFromMetadata } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import * as XLSX from "xlsx";
import { ThreadShadeResponse } from '../model/thread.sahde.response';
import { ThreadShadeProcessedVM } from '../model/thread.shade.processed.vm';
import { ThreadType } from '../model/thread.type.vm';
import { BroadCastServiceService } from '../services/broad-cast-service.service';
import { EnvService } from '../services/env.service';
import { HttpServiceService } from '../services/http-service.service';
import { NotifierService } from '../services/notifier.service';

@Component({
  selector: 'app-thread-shade',
  templateUrl: './thread-shade.component.html',
  styleUrls: ['./thread-shade.component.scss']
})
export class ThreadShadeComponent implements AfterViewInit {

  eventSubject : Subject<void> = new Subject<void>();

  notNewFileSelect : boolean = false;
  recordCountZero : boolean = false;
  
  toppings = new FormControl();
  threadTypeList: string[] = ['A&E ', 'A&E  Wild Cat', 'A&E Perma Core','A&E Perma Spun ','A&E STRONG','Anecot Plus EC ','ANESOFT-SEAM SOFT','Garl','PERMA CORE'
                             ,'PERMA SPUN','PFD','SEAM SOFT','WATERSOULBLE ','WILD CAT ','WILD CAT PLUS'];
  threadTypes : ThreadType[] = [];

  selectedlabdipChart : File;
  selectedThreadShadeFile : File;
  selectedThredTypes : string[] = [];
  selectedThredTypesString : string = "";
  formDataObject:FormData;

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private _http:HttpClient,
              private _broadCast:BroadCastServiceService,
              private _notifierService:NotifierService,
              private _httpService:HttpServiceService,
              private _envService:EnvService) { 
      
                this.formDataObject = new FormData();
                this._httpService.getThredTypes().subscribe(result=>{
                  this.threadTypes = <ThreadType[]>result.data; 
                })
                this.clearData();

               }
  
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
   

  }

  ngOnInit(): void {
    
  }


  onLabdipFileSelected(event:any){
    this.selectedlabdipChart = event.target.files[0];
    this.clearData();
  }

  onTreadShadeFileSelected(event:any){
    this.selectedThreadShadeFile = event.target.files[0];
    this.clearData();

  }

  processFiles(){
    this.prepareRequest();    
    console.log(this.formDataObject); 
    //'http://18.208.148.189:5700/api/labdip/threadShade
    this._http.post(`${this._envService.apiUrl}labdip/threadShade`,this.formDataObject).subscribe(result => {       
      if(result)
       {
         /* this.dataSource.data = <LabdipChartVM[]> result; 
         if(this.dataSource.data.length > 0) 
         {
             this.notNewFileSelect = true;
             this.recordCountZero = true;
             this._notifierService.showNotification("success",'OK');
         } */          
         
           let response =  <ThreadShadeResponse>result;
           if(response.isSuccess){
            //console.log(response.result);
            this.recordCountZero = true ;
            console.log(response.data);
            this._broadCast.broadcast(response.data)
            this._notifierService.showNotification("success",'OK');
           }    
       }
     else
       {
         this._notifierService.showNotification("Error",'OK');
       } 
   });
  }

  onThreadTypeChange(event:any){   
    this.selectedThredTypes = event.value; 
    this.selectedThredTypesString = "";    
    this.selectedThredTypes.forEach((value,index) => {     
      this.selectedThredTypesString += (index > 0) ? ","+value : value;
   }); 
   this.notNewFileSelect = false;
  }

  prepareRequest(){
    this.formDataObject = new FormData();
    this.formDataObject.append('labdipChart',this.selectedlabdipChart);
    this.formDataObject.append('ThreadShade',this.selectedThreadShadeFile);
    this.formDataObject.append('ThreadTypes',this.selectedThredTypesString); 
  }
  
  clearData(){
    let response : ThreadShadeResponse = new ThreadShadeResponse();
    this._broadCast.broadcast(response);
    this.selectedThredTypes = [];
    this.recordCountZero = false;
    this.toppings.setValue(0);
    this.notNewFileSelect = true;
  }

  exportThreadshadeResultToExcel(){
    this.eventSubject.next();
  }

  setupDropDownListFormat(colum1:string,colum2:string):string{
    let fillWidth = 100-colum1.length ;
    let spaceString='-';
    for(var i = 1; i <= fillWidth; i++){
      spaceString=spaceString + '-';
    }
    return colum1 + spaceString + colum2;
  }
}



