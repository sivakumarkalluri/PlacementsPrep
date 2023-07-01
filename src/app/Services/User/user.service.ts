import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{

  userId:any;
  constructor(private authService:AuthenticationService,private http:HttpClient) {

   }
  ngOnInit(): void {
    this.getUserId();
  }

   baseUrl='https://app-examportal.azurewebsites.net/api'

  getUserId():any{
    this.authService.loadCurrentUser();
    this.userId=this.authService.userInfo.id;
    console.log("user"+this.userId);
    if(this.userId){
      console.log("userId"+this.userId);
    }
    return this.userId;
  }


  getUserDashboardStats(id:any):any{
    return this.http.get(this.baseUrl+'/DashBoardStats/'+id,{observe:'response'})

  }

  getPassStats(id:any):any{
    return this.http.get(this.baseUrl+'/UserPassStats/'+id,{observe:'response'})
  }

  getUserResultsAll(id:any):any{
    return this.http.get(this.baseUrl+'/UserAllResults/'+id,{observe:'response'})
  }

  getExamDataById(id:any){
    return this.http.get(this.baseUrl+'/ExamData/'+id,{observe:'response'})

  }

  getExamQuestions(id:any){
    return this.http.get(this.baseUrl+'/GetExamQuestions/'+id,{observe:'response'})

  }

  postUserResults(data:any){
    return this.http.post(this.baseUrl+'/ExamEvaluation',data)

  }

  




}
