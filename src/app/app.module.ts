import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';

import { MatInputModule } from '@angular/material/input';

import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { Ng2OrderModule } from 'ng2-order-pipe';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from './User/user-dashboard/user-dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminNavBarComponent } from './admin/admin-nav-bar/admin-nav-bar.component';
import { AdminBodyComponent } from './admin/admin-body/admin-body.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminResultsComponent } from './admin/admin-results/admin-results.component';
import { AdminStudentsComponent } from './admin/admin-students/admin-students.component';
import { AdminExamsComponent } from './admin/admin-exams/admin-exams.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminEditExamsComponent } from './admin/admin-edit-exams/admin-edit-exams.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SaveDialogComponent } from './admin/Dialogs/save-dialog/save-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { DeleteDialogComponent } from './admin/Dialogs/delete-dialog/delete-dialog.component';
import { CRUDExamsComponent } from './admin/crudexams/crudexams.component';
import { LogoutComponent } from './admin/Dialogs/logout/logout.component';
import { Chart } from 'chart.js';
import { UserBodyComponent } from './User/user-body/user-body.component';
import { UserNavBarComponent } from './User/user-nav-bar/user-nav-bar.component';
import { UserHomeComponent } from './User/user-home/user-home.component';
import { UserExamsComponent } from './User/user-exams/user-exams.component';
import { UserResultsComponent } from './User/user-results/user-results.component';
import { UserTestComponent } from './User/user-test/user-test.component';
import { UserProfileComponent } from './User/user-profile/user-profile.component';
import { ExamInstructionsComponent } from './User/exam-instructions/exam-instructions.component';
import { AnswerSheetComponent } from './User/answer-sheet/answer-sheet.component';
import { UserAnswerSheetComponent } from './admin/user-answer-sheet/user-answer-sheet.component';
import { AddAdminComponent } from './admin/Dialogs/add-admin/add-admin.component';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    SignUpPageComponent,
    UserDashboardComponent,
    NavBarComponent,
    AdminDashboardComponent,
    AdminNavBarComponent,
    AdminBodyComponent,
    AdminHomeComponent,
    AdminResultsComponent,
    AdminStudentsComponent,
    AdminExamsComponent,
    AdminExamsComponent,
    AdminProfileComponent,
    AdminEditExamsComponent,
    AdminCategoryComponent,
    AddCategoryComponent,
    SaveDialogComponent,
    DeleteDialogComponent,
    CRUDExamsComponent,
    LogoutComponent,
    UserBodyComponent,
    UserNavBarComponent,
    UserHomeComponent,
    UserExamsComponent,
    UserResultsComponent,
    UserTestComponent,
    UserProfileComponent,
    ExamInstructionsComponent,
    AnswerSheetComponent,
    UserAnswerSheetComponent,
    AddAdminComponent
    
  ],
  imports: [
    BrowserModule,
    MatStepperModule,

    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TooltipModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    Ng2SearchPipeModule,
    MatInputModule,


Ng2OrderModule,
    NgxPaginationModule,

    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[SaveDialogComponent]
})
export class AppModule { }
