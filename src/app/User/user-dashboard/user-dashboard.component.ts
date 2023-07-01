import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{
  constructor(private userService:UserService){}
  userId:any;
  dashBoardStats:any;
  passStats:any;
  loadingError=false;
  labeldata:any[] = [];
  maxperdata:any[] = [];
  colordata=["#003F5C", "##58508D", "#BC5090", "#FF6361", "#FFA600", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"];


  ngOnInit(): void {
      this.userId=this.userService.getUserId();
      console.log("User Id :"+this.userId);
      if(this.userId){
        console.log("yes");
        this.getDashboardStats();
        this.getPassStats();

      }
  }

  getDashboardStats(){
    this.userService.getUserDashboardStats(this.userId).subscribe((data:any)=>{
      this.dashBoardStats=data.body;
      console.log("dash stats : "+this.dashBoardStats);
     
    },
    (error: any) => {
      this.loadingError = true;
      console.log('Unable to fetch the data. Please try again.');
    })
  }

  getPassStats(){
    this.userService.getPassStats(this.userId).subscribe((data:any)=>{
      this.passStats=data.body;
      console.log("dash stats : "+this.passStats);
      if(this.passStats != null) {
        for(let i=0;i<this.passStats.length; i++) {
          this.labeldata.push(this.passStats[i].exam_Name);
          this.maxperdata.push(this.passStats[i].maxPercentage);
          this.colordata.push(this.colordata[i]);
        }
        this.passstatschart(this.labeldata,this.maxperdata,this.colordata,'bar','barchart');
      }
    })
  }
  
  passstatschart(labeldata:any, maxperdata:any,colordata:any,type:any, id:any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Max Percentage',
          data: maxperdata,
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
