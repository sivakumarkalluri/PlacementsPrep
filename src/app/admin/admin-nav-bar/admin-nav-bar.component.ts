import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './NavData';
import { AdminService } from 'src/app/Services/admin/admin.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DialogsService } from 'src/app/Services/Dialogs/dialogs.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit{

  constructor(private authService:AuthenticationService,private router:Router,private toastr: ToastrService,private dialogService:DialogsService){}
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;

  navData = navbarData;
  
  ngOnInit(): void {
   
    
  }


  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  closeSidenav(): void{
    this.collapsed = false;
  }
  LogOut() {
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
