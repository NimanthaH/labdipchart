import { CrudAction } from "./crud.action.enum";
import { ThreadType } from "./thread.type.vm";

export interface ThreadTypeDialogVM extends ThreadType {
    actionType : number
    //1-AddNew, 2-Update, 3-Delete
}