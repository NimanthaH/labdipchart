import { BaseRequest } from "./base.requests";

export class AutomationRequest<T> implements BaseRequest<T>
{
    request? : T;
    lastAccessedDateTime : Date;

    constructor (modelVM : T){
       
        this.request = modelVM;
        this.lastAccessedDateTime = new Date;        
    }
}