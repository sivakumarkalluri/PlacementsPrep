import { Component } from '@angular/core';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {

   
  isSideNavCollapsaed = false;

  onToggleSideNav(data: SideNavToggle): void{
    this.isSideNavCollapsaed = data.collapsed;
  }
  

}
