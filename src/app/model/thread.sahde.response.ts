import { ThreadShadeProcessedVM } from "./thread.shade.processed.vm";

export class ThreadShadeResponse
{
    data? : ThreadShadeProcessedVM;
    message?: string;
    messageDetails?: string;
    status? : number;
    lastAccessedDateTime? : Date;
    isSuccess? : boolean;
    statusCode? : number;
}