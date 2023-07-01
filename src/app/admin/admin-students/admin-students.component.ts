import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin/admin.service';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit{
  firstName: string | undefined;
  email: string | undefined;
  usersData: any;
  P:number = 1;
  key: string | undefined;
  reverse: boolean=true;


  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getUsersData();
  }

 //filteration of firstName as well as email

  search(): void {
    if (!this.firstName && !this.email) {
      this.getUsersData();
    } else {
      this.usersData = this.usersData.filter((res: any) => {
        const lowerCaseFirstName = res.firstName?.toLowerCase() || '';
        const lowerCaseEmail = res.email?.toLowerCase() || '';
  
        const firstNameMatch = lowerCaseFirstName.includes(this.firstName?.toLowerCase() || '');
        const emailMatch = lowerCaseEmail.includes(this.email?.toLowerCase() || '');
  
        return firstNameMatch && emailMatch;
      });
    }
  }
  
  
  getUsersData(): void {
    this.adminService.getUsersData().subscribe((data: any) => {
      this.usersData = data.body;
      console.log(this.usersData);
    });
  }

  sort(key: string) {
    if (this.key === key) {
      this.reverse = !this.reverse;
    } else {
      this.key = key;
      this.reverse = false;
    }
  
    this.usersData.sort((a: any, b: any) => {
      const valueA = this.getPropertyValue(a, key);
      const valueB = this.getPropertyValue(b, key);
  
      if (valueA < valueB) {
        return this.reverse ? 1 : -1;
      } else if (valueA > valueB) {
        return this.reverse ? -1 : 1;
      } else {
        return 0;
      }
    });
  }
  
  getPropertyValue(obj: any, key: string) {
    const keys = key.split('.');
    let value = obj;
  
    for (const k of keys) {
      value = value[k];
    }
  
    return value;
  }
  

  

}
