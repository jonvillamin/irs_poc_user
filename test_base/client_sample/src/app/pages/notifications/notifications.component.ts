import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { Log } from '../../class/Log';
import { User } from '../../class/User';


@Component({
    selector: 'notifications-cmp',
    moduleId: module.id,
    templateUrl: 'notifications.component.html',
    styleUrls: ['notifications.component.css']
}) 

export class NotificationsComponent implements OnInit {
  users: User[];
  logs: Log[];
  user_id: string;
  action_id: number;
  user_name: string;
  action_name: string;
  action_date: string;

  constructor(private registerService:RegisterService, private router:Router, private toastr: ToastrService){
    this.registerService.getUsers()
      .subscribe((users: any[]) => {
        this.users = users;
      });
    var user_id = sessionStorage.getItem('user_id');
    this.registerService.getUserLogs(user_id)
      .subscribe((logs: any[]) => {
        this.logs = logs;
      });
  }
      
  ngOnInit() {
    if(sessionStorage.getItem('user_id')=="" || sessionStorage.getItem('user_id')==undefined){
      this.showNotification('top','center', 4);
        this.router.navigate(['/login']).then(() => {
          setTimeout(() => { window.location.reload() }, 4000);          
        });
    }
    window.scrollTo(0, document.querySelector("body").scrollHeight);
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
