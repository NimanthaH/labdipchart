import { BaseResponse } from "./base.response";

export interface  AutomationResponse<T> extends BaseResponse<T> 
{   
    data? : T;
    message?: string;
    messageDetails?: string;
    status: number;
    lastAccessedDateTime: Date;
    isSuccess: boolean;
    statusCode : number;

  
}
