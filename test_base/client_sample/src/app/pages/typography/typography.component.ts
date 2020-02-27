import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { RegisterService } from '../../services/register.service';
import { IncidentType } from '../../class/IncidentType';
import { IncidentReport } from '../../class/IncidentReport';
import { User } from '../../class/User';
import { Log } from '../../class/Log';
// import { FileUploader } from 'ng2-file-upload';
// const URL = 'http://localhost:8000/api/upload';

@Component({
    selector: 'typography-cmp',
    moduleId: module.id,
    templateUrl: 'typography.component.html'
})

export class TypographyComponent implements OnInit{
    allUsers: User[];
    logs: Log[];
    types: IncidentType[];
    report: IncidentReport[];
    incident_type: string;
    record_no: number;
    incident_who: string;
    incident_when: string;
    incident_comments: string;
    incident_attachment: File;
    incident_complainant_id: string;
    incident_status: string;
    record_date: string;
    anonymous: boolean;
    displayed: boolean;
    user_id: string;
    action_id: number;
    user_name: string;
    action_name: string;
    action_date: string;
    action_viewed: boolean;
    action_removed: boolean;

    afuConfig;

    // public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'incident_attachment'});

    constructor(private registerService:RegisterService, private router:Router, private toastr: ToastrService){
        this.registerService.getTypes()
            .subscribe((types: any[]) => {
            this.types = types;
        });
        this.registerService.getReports()
            .subscribe((report: any[]) => {
            this.report = report;
        });
        this.registerService.getUsers()
            .subscribe((users: any[]) => {
            this.allUsers = users;
        });
        this.registerService.getLogs()
            .subscribe((log: any[]) => {
                this.logs = log;
        });
        // this.afuConfig = {
        //     multiple:true,
        //     uploadAPI: {
        //       url:"http://localhost:3000/api/fileModel/create-user"
        //     }
        // };
    }

    ngOnInit() {
        if(sessionStorage.getItem('user_id')=="" || sessionStorage.getItem('user_id')==undefined){
            this.showNotification('top','center', 4);
            this.router.navigate(['/login']).then(() => {
                setTimeout(() => { window.location.reload() }, 4000);          
            });
        }

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var d = '';
        var m = '';
        if(dd<10){
            d = '0' + dd;
        } else {
            d = dd.toString();
        }
        if(mm<10){
            m = '0' + mm;
        } else {
            m = mm.toString();
        }

        var date_today = yyyy + '-' + m + '-' + d;
        document.getElementById("inc_when").setAttribute("max", date_today);
        // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false };
        // this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        //     console.log("ImageUpload:uploaded:", item, status, response);
        // };
    }

    submitReport(){
        // this.uploader.uploadAll();
        var inc_type = (<HTMLInputElement>document.getElementById("inc_type")).value;
        var inc_name = (<HTMLInputElement>document.getElementById("inc_name")).value;
        var inc_when = (<HTMLInputElement>document.getElementById("inc_when")).value;

        if(inc_type == "" || inc_type == undefined || inc_name == "" || inc_name == undefined || inc_when == "" || inc_when == undefined){
            this.showNotification('bottom','right', 3);
        } else {
            var okay = confirm("Confirm Report Submission");
            if(okay){
    
                var options = { hour12: false, year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
                var options2 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                
                if(this.anonymous == true){
                    var report_details = {
                        incident_type: this.incident_type,
                        incident_who: this.incident_who,
                        incident_when: new Date(this.incident_when).toLocaleDateString("en-US", options2),
                        incident_comments: this.incident_comments,
                        incident_attachment: this.incident_attachment,
                        incident_complainant_id: sessionStorage.getItem('user_id'),
                        incident_status: "Pending",
                        record_date: new Date().toLocaleDateString("en-US", options),
                        anonymous: true,
                        displayed: false
                    }
                } else {
                    var report_details = {
                        incident_type: this.incident_type,
                        incident_who: this.incident_who,
                        incident_when: new Date(this.incident_when).toLocaleDateString("en-US", options2),
                        incident_comments: this.incident_comments,
                        incident_attachment: this.incident_attachment,
                        incident_complainant_id: sessionStorage.getItem('user_id'),
                        incident_status: "Pending",
                        record_date: new Date().toLocaleDateString("en-US", options),
                        anonymous: false,
                        displayed: false
                    }
                }
                
                this.registerService.createReport(report_details)
                    .subscribe((record : IncidentReport) => {
                        this.report.push(record);
                        this.incident_type = report_details.incident_type;
                        this.incident_who = report_details.incident_who;
                        this.incident_when = report_details.incident_when;
                        this.incident_comments = report_details.incident_comments;
                        this.incident_attachment = report_details.incident_attachment;
                        this.incident_complainant_id = sessionStorage.getItem('user_id');
                        this.incident_status = "Pending";
                        this.record_date = report_details.record_date;
                        this.anonymous = report_details.anonymous;
                        this.displayed = report_details.displayed;
                    });
    
                
    
                //Log Action
                var user_id = sessionStorage.getItem('user_id');
                var user_name = "";
                for(var i=0; i<this.allUsers.length; i++){
                    if(this.allUsers[i]._id == user_id){
                        user_name = this.allUsers[i].user_name;
                        break;
                    }
                }
    
                if(report_details.anonymous == true){
                    var newLog = {
                        user_id: user_id,
                        user_name: "Anonymous",
                        action_id: 3,
                        action_name: "Sent Report",
                        action_date: new Date().toLocaleDateString("en-US", options),
                        action_viewed: false,
                        action_removed: false
                    }
                    this.registerService.recordLog(newLog)
                        .subscribe((log: Log) => {
                            this.logs.push(log);
                            this.user_id = user_id;
                            this.user_name = "Anonymous";
                            this.action_id = 3;
                            this.action_name = "Sent Report";
                            this.action_date = new Date().toLocaleDateString("en-US", options);
                            this.action_viewed = false;
                            this.action_removed = false;
                        });
                } else {
                    var newLog = {
                        user_id: user_id,
                        user_name: user_name,
                        action_id: 3,
                        action_name: "Sent Report",
                        action_date: new Date().toLocaleDateString("en-US", options),
                        action_viewed: false,
                        action_removed: false
                    }
                    this.registerService.recordLog(newLog)
                        .subscribe((log: Log) => {
                            this.logs.push(log);
                            this.user_id = user_id;
                            this.user_name = user_name;
                            this.action_id = 3;
                            this.action_name = "Sent Report";
                            this.action_date = new Date().toLocaleDateString("en-US", options);
                            this.action_viewed = false;
                            this.action_removed = false;
                        });
                }
                this.showNotification('bottom','right', 2);
                this.router.navigate(['/main/dashboard']).then(() => {
                    setTimeout(() => { window.location.reload() }, 4000);
                });
            } else {
                // this.playSound();
                this.showNotification('bottom','right', 1);
            }
        }        
    }

    uploadFile(){

    }

    showNotification(from, align, color) {
        switch (color) {
          case 1:
            this.toastr.info(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Info</b> Report Submission Cancelled.</span>',
              "",
              {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-info alert-with-icon",
                positionClass: "toast-" + from + "-" + align
              }
            );
            break;
          case 2:
            this.toastr.success(
              '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Success</b> Report Submission Successful.</span>',
              "",
              {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-success alert-with-icon",
                positionClass: "toast-" + from + "-" + align
              }
            );
            break;
          case 3:
            this.toastr.warning(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Warning</b> Please fill in all items.</span>',
              "",
              {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-warning alert-with-icon",
                positionClass: "toast-" + from + "-" + align
              }
            );
            break;
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
