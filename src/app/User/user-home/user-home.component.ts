import { Component } from '@angular/core';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {

  
  isSideNavCollapsaed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void{
    this.isSideNavCollapsaed = data.collapsed;
  }
  

}
