import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin/admin.service';

@Component({
  selector: 'app-admin-results',
  templateUrl: './admin-results.component.html',
  styleUrls: ['./admin-results.component.css']
})
export class AdminResultsComponent implements OnInit {

  userResults: any[] = [];
  originalUserResults: any[] = [];
  P: number = 1;
  email: any;
  categories: string[] = [];
  exams: string[] = [];
  fullName: any;
  firstName: any;
  usersData: any;
  filteredUsersData: any;

  constructor(private adminService: AdminService,private router:Router) { }

  ngOnInit(): void {
    this.getUserResults();
    this.getCategoryExamData();
  }

  // Apply all filters
  applyFilters(): void {
    let filteredResults = this.originalUserResults;

    if (this.fullName && this.fullName.trim() !== '') {
      filteredResults = filteredResults.filter((res: any) => {
        return res.fullName.toLowerCase().includes(this.fullName.toLowerCase());
      });
    }

    const subject = (document.querySelector('.myDiv1 select') as HTMLSelectElement).value;
    if (subject !== 'none') {
      filteredResults = filteredResults.filter((result: any) => {
        return result.examName === subject;
      });
    }

    const passFail = (document.querySelector('.myDiv2 select') as HTMLSelectElement).value;
    if (passFail !== 'none') {
      filteredResults = filteredResults.filter((result: any) => {
        return result.passorFail === passFail;
      });
    }

    const category = (document.querySelector('.myDiv3 select') as HTMLSelectElement).value;
    if (category !== 'none') {
      filteredResults = filteredResults.filter((result: any) => {
        return result.categoryName === category;
      });
    }

    this.userResults = filteredResults;
  }

  // search
  search(): void {
    this.applyFilters();
  }

  // sorting for Subject
  searchExam(): void {
    this.applyFilters();
  }

  // sorting for pass/fail
  searchPassFail(): void {
    this.applyFilters();
  }

  // sorting for category
  searchCategory(): void {
    this.applyFilters();
  }

  getCategoryExamData() {
    this.adminService.getCategories().subscribe((data: any) => {
      if (data.body) {
        for (const result of data.body) {
          console.log(result);
          if (result.categoryName) {
            this.categories.push(result.categoryName);
          }
        }
      }
    });

    this.adminService.getCRUDExamData().subscribe((data: any) => {
      if (data.body) {
        for (const result of data.body) {
          console.log(result);
          if (result.exam_Name) {
            this.exams.push(result.exam_Name);
          }
        }
      }
    });
  }

  getUserResults(): void {
    this.adminService.getUserResults().subscribe((data: any) => {
      this.userResults = data.body;
      this.originalUserResults = data.body;
      console.log(this.userResults);
    });
  }

  key: string = '';
  reverse: boolean = true;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  
    this.userResults.sort((a: any, b: any) => {
      if (a[key] < b[key]) {
        return this.reverse ? 1 : -1;
      }
      if (a[key] > b[key]) {
        return this.reverse ? -1 : 1;
      }
      return 0;
    });
  }

  AnswerSheet(id:any){
    this.router.navigate(['/adminHome/UsersAnswerSheet'],{ queryParams: { testId:id } })

    console.log("testId : "+id);
  }

  
}
