import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  constructor() { }

  public apiUrl="";
  public apiVer="";
}
