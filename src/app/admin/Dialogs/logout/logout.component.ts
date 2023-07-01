import { Component,OnInit,Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public dialogRef:MatDialogRef<LogoutComponent>){}

  closeDialog(){
    this.dialogRef.close(false);
  }
}
