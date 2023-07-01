import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/admin/Dialogs/delete-dialog/delete-dialog.component';
import { LogoutComponent } from 'src/app/admin/Dialogs/logout/logout.component';
import { SaveDialogComponent } from 'src/app/admin/Dialogs/save-dialog/save-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(private dialog:MatDialog) { }

  openSubmitDialog(msg:any){
   return this.dialog.open(SaveDialogComponent,{
      width:'390px',
      panelClass:'confirm-dialog-container',
      disableClose:true,
      data:{
        message:msg
      }
    });
  }
  openDeleteDialog(msg:any){
    return this.dialog.open(DeleteDialogComponent,{
      width:'390px',
      panelClass:'confirm-dialog-container',
      disableClose:true,
      data:{
        message:msg
      }
    });
  }
  openLogOutDialog(msg:any){
    return this.dialog.open(LogoutComponent,{
      width:'390px',
      panelClass:'confirm-dialog-container',
      disableClose:true,
      data:{
        message:msg
      }
    });
  }
}
