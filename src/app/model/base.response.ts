export interface BaseResponse<T>
{
    data? : T;
    message?: string;
    messageDetails?: string;
    status: number;
    lastAccessedDateTime: Date;
    isSuccess: boolean;
    statusCode : number;
}