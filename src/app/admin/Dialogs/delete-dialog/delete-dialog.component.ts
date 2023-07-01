import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public dialogRef:MatDialogRef<DeleteDialogComponent>){}

  ngOnInit(): void {
      
  }
  closeDialog(){
    this.dialogRef.close(false);
  }

}
