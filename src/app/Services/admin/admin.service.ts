import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements OnInit{

  constructor(private http:HttpClient) { }
  // toggleClicked=false;
  ngOnInit(): void {
   
  }
  
  baseUrl="https://app-examportal.azurewebsites.net/api";

  getAdminStats():any{
    return this.http.get(this.baseUrl+"/AdminDashboard/AdminStatistics", { observe: 'response' });
  }

  getCategories():any{
    return this.http.get(this.baseUrl+'/Categories', { observe: 'response' })
  }

  postCategoryExamsQuestions(data:any):any{
    return this.http.post(this.baseUrl+'/CreateCategoryExamQuestions',data, { observe: 'response' })
  }

  deleteCategory(id:any):any{
    return this.http.delete(this.baseUrl+'/DeleteCategory/'+id,{ observe: 'response' })
  }

  postNewExam(data:any){
    return this.http.post(this.baseUrl+'/AddExam',data, { observe: 'response' })
  }

  getExamPassStatistics():any{
    return this.http.get(this.baseUrl+'/AdminDashboard/ExamPassStats', { observe: 'response' });
  }
  getCategoryAttemptsStatistics():any{
    return this.http.get(this.baseUrl+'/AdminDashboard/CategoryAttemptStats', { observe: 'response' });
  }
  getExamAttemptsStatistics():any{
    return this.http.get(this.baseUrl+'/AdminDashboard/ExamAttemptsStats', { observe: 'response' })
  }

  getUsersData():any{
    return this.http.get(this.baseUrl+'/AdminDashboard/GetUsersData', { observe: 'response' })

  }

  getUserResults():any{
    return this.http.get(this.baseUrl+'/AdminDashboard/GetAdminUserResults', { observe: 'response' })

  }

  editCategory(data:any,id:any){
    return this.http.put(this.baseUrl+'/EditCategory/'+id,data, { observe: 'response' });
  }

  getCRUDExamData(){
    return this.http.get(this.baseUrl+'/GetExamCrudData',{ observe: 'response' })
  }

  getExamQuestionsById(id:any){
    return this.http.get(this.baseUrl+"/GetExamQuestions/"+id,{ observe: 'response' })
  }

  deleteQuestion(id:any){
    return this.http.delete(this.baseUrl+'/DeleteQuestion/'+id,{ observe: 'response' })
  }

  editQuestion(data:any,id:any){
    return this.http.put(this.baseUrl+'/EditQuestion/'+id,data,{ observe: 'response' })
  }

  getExamData(id:any){
    return this.http.get(this.baseUrl+'/ExamData/'+id,{observe:'response'})
  }

  EditExam(data:any,id:any){
    return this.http.put(this.baseUrl+'/EditExam/'+id,data,{ observe: 'response' })
  }

  AddQuestion(data:any){
    return this.http.post(this.baseUrl+'/AddQuestion',data,{ observe: 'response' })
  }

  deleteExam(id:any){
    return this.http.delete(this.baseUrl+'/DeleteExam/'+id,{ observe: 'response' })
  }

  getUserData(id:any){
    return this.http.get(this.baseUrl+'/UserData/UserData/'+id,{ observe: 'response' })
  }
  getExamImages():any{
    return this.http.get(this.baseUrl+'/Exam/ExamImages',{ observe: 'response' })
  }
  getExamListData():any{
    return this.http.get(this.baseUrl+'/Exam/ExamsList',{ observe: 'response' })
  }

  uploadImage(id:Int16Array,file:File):Observable<any>{
    const formData=new FormData();
    formData.append("ProfileImage",file);
   return this.http.post(`${this.baseUrl}/ProfileImage/${id}/upload-image`,formData,{
      responseType:'text'
    });
  }

  updateProfile(data:any,id:any){
    return this.http.put(this.baseUrl+"/UserData/EditUserData/"+id,data,{ observe: 'response' })
  }


  getAnswerSheet(id:any){
    return this.http.get(this.baseUrl+'/AnswerSheet/'+id,{ observe: 'response' });
    
  }

  AddAdmin(data:Array<String>){
    return this.http.post(this.baseUrl+'/UserData/AddAdmin',{
    FirstName:data[0],
    LastName:data[1],
    Email:data[2],
    Mobile:data[3],
    Password:data[4],
    Gender:data[5],
    Role:data[6],
    ImagePath:data[7]}, {
      responseType:'text'
    });
  }

  getAdminsData(){
    return this.http.get(this.baseUrl+'/UserData/GetAdminsData',{ observe: 'response' });
  }

  deleteAdmin(id:any){
    return this.http.delete(this.baseUrl+'/UserData/DeleteAdmin/'+id,{ observe: 'response' });

  }

}
