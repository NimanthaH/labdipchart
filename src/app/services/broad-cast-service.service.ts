import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadCastServiceService {

  private broadcastData  = new BehaviorSubject<any>({});

 currentData = this.broadcastData.asObservable();
 
  constructor() { }

  broadcast(proposal:any)
  {
    this.broadcastData.next(proposal);
  }
}
