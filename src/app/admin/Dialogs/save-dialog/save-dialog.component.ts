import { Component, OnInit,Inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public dialogRef:MatDialogRef<SaveDialogComponent>){}

  ngOnInit(): void {
      
  }
  closeDialog(){
    this.dialogRef.close(false);
  }

}
