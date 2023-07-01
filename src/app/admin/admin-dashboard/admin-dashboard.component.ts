import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AdminService } from 'src/app/Services/admin/admin.service';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  constructor(private adminService:AdminService){}
  adminStats:any;
  loadingError:any;
  passStatistics:any;
  examAttemptStatistics:any;
  categoryAttemptStatistics:any;
  formModal:any;


  
  labeldata: any[] = [];
  namedata:any[] =[];
  namesdata:any[]=[];
  passdata: any[] = [];
  faildata: any[] = [];
  studentattemptdata: any[] = [];
  categoryattemptdata:any[] = [];
  colordata=["#64C2A6", "#FF2E7E", "#00529B", "#7031AC", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"];
  ngOnInit(): void {
   
   this.getAdminStatistics();
   this.getExamPassStatistics();
   this.getCategoryAttemptStatistics();
   this.getExamAttemptsStatistics();
  }
  
  getAdminStatistics() {
    this.adminService.getAdminStats().subscribe(
      (response: any) => {
        this.adminStats = response.body;
        console.log(this.adminStats);
      },
      (error: any) => {
        this.loadingError = true;
        console.log('Unable to fetch the data. Please try again.');
      }
    );
 
    }

    getExamPassStatistics(){
      this.adminService.getExamPassStatistics().subscribe((data:any)=>{
        this.passStatistics=data.body;
        console.log("pass statistics : ",data);
        if (this.passStatistics != null) {
          for (let i = 0; i < this.passStatistics.length; i++) {
            this.labeldata.push(this.passStatistics[i].exam_Name);
            this.passdata.push(this.passStatistics[i].passedCount);
            this.faildata.push(this.passStatistics[i].failedCount);
          }
          this.PassFailChart(this.labeldata, this.passdata, this.faildata, 'bar', 'barchart');
        }
        
      })

    }

    PassFailChart(labeldata: any, passdata: any, faildata: any, type: any, id: any) {
      const myChart = new Chart(id, {
        type: type,
        data: {
          labels: labeldata,
          datasets: [{
            label: 'Pass',
            data: passdata,
            backgroundColor: '#00529B',
            borderColor: [
  
              'rgba(75, 192, 192, 1)',
  
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          },
          {
            label: 'Fail',
            data: faildata,
            backgroundColor: '#F13C59',
            borderColor: [
  
              'rgba(75, 192, 192, 1)',
  
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    getExamAttemptsStatistics(){
      this.adminService.getExamAttemptsStatistics().subscribe((data:any)=>{
        this.examAttemptStatistics=data.body;
        console.log("Exam attempt statistics : ",data.body);

        if (this.examAttemptStatistics != null) {
          for (let i = 0; i < this.examAttemptStatistics.length; i++) {
            this.namedata.push(this.examAttemptStatistics[i].exam_Name);
            this.studentattemptdata.push(this.examAttemptStatistics[i].studentsAttempted);
            this.colordata.push(this.colordata[i]);
          }
          this.studentattemptChart(this.namedata, this.studentattemptdata,this.colordata, 'pie', 'piechart')
        }
      })

    }



    studentattemptChart(namedata: any, studentattemptdata: any,colordata:any, type: any, id: any) {
      const myChart = new Chart(id, {
        type: type,
        data: {
          labels: namedata,
          datasets: [{
            label: 'Students Attempted',
            data: studentattemptdata,
            backgroundColor: colordata,
            borderColor: [
  
              'rgba(75, 192, 192, 1)',
  
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            // y: {
            //   beginAtZero: false
            // }
          }
        }
      });
    }

    getCategoryAttemptStatistics(){
      this.adminService.getCategoryAttemptsStatistics().subscribe((data:any)=>{
        this.categoryAttemptStatistics=data.body;
        console.log("Category attempt statistics : ",data.body);

        if(this.categoryAttemptStatistics != null) {
          for(let i=0;i<this.categoryAttemptStatistics.length;i++){
            this.namesdata.push(this.categoryAttemptStatistics[i].category_Name);
            this.categoryattemptdata.push(this.categoryAttemptStatistics[i].studentsAttempted);
            this.colordata.push(this.colordata[i]);
          }
          this.categoryattemptchart(this.namesdata,this.categoryattemptdata,this.colordata,'bar', 'barchartType2');
        }

      })
    }

    
  categoryattemptchart(namesdata:any,categoryattemptdata:any,colordata:any,type:any,id:any){
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: namesdata,
        datasets: [{
          label: 'Category Attempts',
          data: categoryattemptdata,
          backgroundColor: colordata,
          borderColor: [

            'rgba(75, 192, 192, 1)',

            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}

   
