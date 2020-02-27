import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { RegisterService } from '../../services/register.service';
import { IncidentReport } from'../../class/IncidentReport';
import { User } from '../../class/User';
import { Log } from '../../class/Log';

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html',
    styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit{
    allUsers: User[];
    logs: Log[];
    reports: IncidentReport[];
    _id: string;
    record_no: number;
    incident_type: string;
    incident_who: string;
    incident_when: string;
    incident_comments: string;
    incident_attachment: string;
    incident_complainant_id: string;
    incident_status: string;
    record_date: string;
    anony: boolean;
    user_id: string;
    action_id: number;
    user_name: string;
    action_name: string;
    action_date: string;
    action_viewed: boolean;
    action_removed: boolean;

    constructor(private registerService:RegisterService, private router:Router, private toastr: ToastrService){
        this.registerService.getMyReports(sessionStorage.getItem('user_id'))
            .subscribe((reports: any[]) => {
            this.reports = reports;
        });
        this.registerService.getUsers()
            .subscribe((users: any[]) => {
            this.allUsers = users;
        });
    }

    ngOnInit() {
        if(sessionStorage.getItem('user_id')=="" || sessionStorage.getItem('user_id')==undefined){
            this.showNotification('top','center', 4);
            this.router.navigate(['/login']).then(() => {
                setTimeout(() => { window.location.reload() }, 4000);
            });
        }
    }

    showNotification(from, align, color) {
        switch (color) {
          case 1:
            this.toastr.info(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Info</b> Record Delete Cancelled.</span>',
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
          case 5:
            this.toastr.error(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Success</b> Record Deleted.</span>',
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

    collapse(){
        var coll = document.getElementsByClassName("collapsible");
        for (var i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.add("active");
                this.nextElementSibling.classList.remove("closed");       
            });
        }

        // var cont = document.getElementsByClassName("content");
        // for (var i = 0; i < cont.length; i++) {
        //     cont[i].addEventListener("click", function() {
        //         this.classList.add("closed");        
        //     });
        // }
    }

    deleteRecord(record){
        var okay = confirm("Confirm deleting record...");
            if(okay){
                var tbl_reports = this.reports;
                var reportArrId = 0;

                for(var i=0; i<tbl_reports.length; i++){
                    if(tbl_reports[i]._id == record._id){
                        reportArrId = i;
                    }
                }

                var toDelete = {
                    _id: record._id,
                    incident_status: "Deleted"
                }

                this.registerService.deleteRecord(toDelete).subscribe(data => {
                    tbl_reports[reportArrId]._id = toDelete._id;
                    tbl_reports[reportArrId].incident_status = toDelete.incident_status;
                });

                //Log Action
                var user_id = sessionStorage.getItem('user_id');
                var user_name = "";
                for(var i=0; i<this.allUsers.length; i++){
                    if(this.allUsers[i]._id == user_id){
                        user_name = this.allUsers[i].user_name;
                    }
                }

                var options = { hour12: false, year: 'numeric', month: 'long', day: 'numeric', hour:'2-digit', minute: '2-digit' };
                var newLog = {
                    user_id: user_id,
                    user_name: user_name,
                    action_id: 5,
                    action_name: "Deleted Report",
                    action_date: new Date().toLocaleDateString("en-US", options),
                    action_viewed: false,
                    action_removed: false
                }

                this.registerService.recordLog(newLog)
                .subscribe((log: Log) => {
                    this.logs.push(log);
                    this.user_id = user_id;
                    this.user_name = user_name;
                    this.action_id = 5;
                    this.action_name = "Deleted Report";
                    this.action_date = new Date().toLocaleDateString("en-US", options);
                    this.action_viewed = false;
                    this.action_removed = false;
                });
                this.showNotification('bottom','right', 5);
                setTimeout(() => { window.location.reload() }, 4000);
            } else {
                this.showNotification('bottom','right', 1);
            }
    }

    
}
