import { UserHomeComponent } from './User/user-home/user-home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './User/user-dashboard/user-dashboard.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminExamsComponent } from './admin/admin-exams/admin-exams.component';
import { AdminStudentsComponent } from './admin/admin-students/admin-students.component';
import { AdminResultsComponent } from './admin/admin-results/admin-results.component';
import { AdminEditExamsComponent } from './admin/admin-edit-exams/admin-edit-exams.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { CRUDExamsComponent } from './admin/crudexams/crudexams.component';
import { AuthGuard } from './Guards/Auth/auth.guard';
import { UserProfileComponent } from './User/user-profile/user-profile.component';
import { UserExamsComponent } from './User/user-exams/user-exams.component';
import { UserResultsComponent } from './User/user-results/user-results.component';
import { UserTestComponent } from './User/user-test/user-test.component';
import { ExamInstructionsComponent } from './User/exam-instructions/exam-instructions.component';
import { AnswerSheetComponent } from './User/answer-sheet/answer-sheet.component';
import { UserAnswerSheetComponent } from './admin/user-answer-sheet/user-answer-sheet.component';


const routes: Routes = [
 {path:'',redirectTo:'homePage',pathMatch:'full'},
 {path:'homePage',component:HomePageComponent},
 {path:'loginPage',component:LoginPageComponent},
 {path:'signUpPage',component:SignUpPageComponent},

 { path: 'adminHome', component: AdminHomeComponent,canActivate: [AuthGuard], data: { roles: ['Admin'] }, 
 children: [
  { path: 'adminDashboard', component: AdminDashboardComponent },
  { path: 'adminProfile', component: AdminProfileComponent },
  { path: 'adminExams', component: AdminExamsComponent },
  { path: 'adminStudents', component: AdminStudentsComponent },
  { path: 'adminResults', component: AdminResultsComponent },
  {path:'adminEditExams',component:AdminEditExamsComponent},
  {path:'adminCategories',component:AdminCategoryComponent},
  {path:'addCategory',component:AddCategoryComponent},
  {path:'ViewQuestions',component:CRUDExamsComponent},
  {path:'UsersAnswerSheet',component:UserAnswerSheetComponent}
]},

{path:'userHome',component:UserHomeComponent,canActivate: [AuthGuard], data: { roles: ['User'] },
children:[
  {path:'userDashboard',component:UserDashboardComponent},
  {path:'userProfile',component:UserProfileComponent},
  {path:'userExams',component:UserExamsComponent},
  {path:'userResults',component:UserResultsComponent},
  {path:'examInstructions',component:ExamInstructionsComponent},
  {path:'AnswerSheet',component:AnswerSheetComponent}
 
]

},
{path:'userTest',component:UserTestComponent,canActivate: [AuthGuard], data: { roles: ['User']}}


 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
