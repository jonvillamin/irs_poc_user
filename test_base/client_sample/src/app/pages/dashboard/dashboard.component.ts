import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import Chart from 'chart.js';
import * as $ from 'jquery';

import { ChatAdapter } from 'ng-chat';
import { DemoAdapter } from '../../demo-adapter';
import { SignalRAdapter } from '../../signalr-adapter';
import { SignalRGroupAdapter } from '../../signalr-group-adapter';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})

export class DashboardComponent implements OnInit{

    public canvas : any;
    public ctx;
    public chartColor;
    public chartEmail;
    public chartHours;
    
    reports_pending: number;
    reports_complete: number;
    reports_verified: number;
    reports_rejected: number;
    reports_countEach: number[] = [];
    reports_total: number;

    constructor(private registerService:RegisterService, private router:Router, private toastr: ToastrService, private http: HttpClient){
      var user_id = sessionStorage.getItem('user_id');
      
      this.registerService.countPending(user_id)
        .subscribe((count_pending:number) => {
          this.reports_pending = count_pending;
          this.reports_countEach[0] = this.reports_pending;
        });
      this.registerService.countVerified(user_id)
        .subscribe((count_verified:number) => {
          this.reports_verified = count_verified;
          this.reports_countEach[1] = this.reports_verified;
        });
      this.registerService.countRejected(user_id)
        .subscribe((count_rejected:number) => {
          this.reports_rejected = count_rejected;
          this.reports_countEach[2] = this.reports_rejected;
        });
      this.registerService.countCompleted(user_id)
        .subscribe((count_complete:number) => {
          this.reports_complete = count_complete;          
          this.reports_countEach[3] = this.reports_complete;
        });
      this.registerService.countTotal(user_id)
        .subscribe((count_total:number) => {
          this.reports_total = count_total;

          this.chartColor = "#FFFFFF";
          this.canvas = document.getElementById("chartEmail");
          this.ctx = this.canvas.getContext("2d");
          this.chartEmail = new Chart(this.ctx, {
            type: 'doughnut',
            
            data: {
              
              labels: ["Pending", "Verified", "Rejected", "Completed"],
              datasets: [{
                label: "Reports",
                pointRadius: 0,
                pointHoverRadius: 0,
                backgroundColor: [
                  '#9BBFE0',
                  '#FBE29F',
                  '#E8A09A',
                  '#C6D68F'
                ],
                borderWidth: 0,
                data: [this.getDataPending(), this.getDataVerified(), this.getDataRejected(), this.getDataCompleted() ]
              }]
            },
    
            options: {    
              
              legend: {
                display: true
              },
    
              pieceLabel: {
                render: 'percentage',
                fontColor: ['white'],
                precision: 2
              },
    
              tooltips: {
                enabled: false
              },
    
              scales: {
                yAxes: [{
    
                  ticks: {
                    display: false
                  },
                  gridLines: {
                    drawBorder: false,
                    zeroLineColor: "transparent",
                    color: 'rgba(255,255,255,0.05)'
                  }
    
                }],
    
                xAxes: [{
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: 'rgba(255,255,255,0.1)',
                    zeroLineColor: "transparent"
                  },
                  ticks: {
                    display: false,
                  }
                }]
              },
            }
          });
        });
    }

    refreshDashboard() {
      $('#main-dash').load(document.URL);
  }

    title = 'app';
    currentTheme = 'dark-theme';
    triggeredEvents = [];
    fileUploadUrl: string = `${SignalRAdapter.serverBaseUrl}UploadFile`;

    userId: string = "offline-demo";
    username: string;

    adapter: ChatAdapter = new DemoAdapter();
    signalRAdapter: SignalRGroupAdapter;

    switchTheme(theme: string): void {
      this.currentTheme = theme;
    }

    onEventTriggered(event: string): void {
      this.triggeredEvents.push(event);
    }

    joinSignalRChatRoom(): void {
      const userName = prompt('Please enter a user name:');

      this.signalRAdapter = new SignalRGroupAdapter(userName, this.http);
    }
        
    getDataPending() {
      if(this.reports_countEach[0] == undefined){
        $('#chartEmail').load(document.URL);
      } else {
        return this.reports_countEach[0];
      }
    }

    getDataVerified() {
      if(this.reports_countEach[1] == undefined){
        $('#chartEmail').load(document.URL);
      } else {
        return this.reports_countEach[1];
      }
    }

    getDataRejected() {
      if(this.reports_countEach[2] == undefined){
        $('#chartEmail').load(document.URL);
      } else {
        return this.reports_countEach[2];
      }
    }

    getDataCompleted() {
      if(this.reports_countEach[3] == undefined){
        $('#chartEmail').load(document.URL);
      } else {
        return this.reports_countEach[3];
      }
    }

    ngOnInit(){
      if(sessionStorage.getItem('user_id')=="" || sessionStorage.getItem('user_id')==undefined){
        this.showNotification('top','center', 4);
        this.router.navigate(['/login']).then(() => {
          setTimeout(() => { window.location.reload() }, 4000);          
        });
      }
    }

    showNotification(from, align, color) {
      switch (color) {
        case 4:
          this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Warning</b> You are not logged in.</span>',
            "",
            {
              timeOut: 4000,
              enableHtml: true,
              closeButton: false,
              toastClass: "alert alert-danger alert-with-icon",
              positionClass: "toast-" + from + "-" + align
            }
          );
          break;
        default:
          break;
      }
    }
}
