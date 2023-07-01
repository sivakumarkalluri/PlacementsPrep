import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { AdminService } from 'src/app/Services/admin/admin.service';
import { navUserData } from './NavData';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from 'src/app/Services/Dialogs/dialogs.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.css']
})
export class UserNavBarComponent implements OnInit{

  constructor(private adminService:AdminService,private authService:AuthenticationService,private router:Router,private toastr: ToastrService,private dialogService:DialogsService){}
  ngOnInit(): void {

  }
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  navData = navUserData;


  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  closeSidenav(): void{
    this.collapsed = false;
  }

  Logout() {
    this.dialogService.openLogOutDialog("Are you sure want to Log Out ?").afterClosed().subscribe((res: any) => {
      if (res === true) {
    this.authService.removeToken();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
    // 
  }
  
  
});
}
  
}
