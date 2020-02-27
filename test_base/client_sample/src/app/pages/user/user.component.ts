import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { RegisterService } from '../../services/register.service';
import { User } from '../../class/User';
import { Depts } from '../../class/Depts';
import { Log } from '../../class/Log';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    user: User[];
    allUsers: User[];
    user_id: string;
    user_name: string;
    user_password: string;
    user_grp: string;
    user_firstname: string;
    user_lastname: string;
    user_type: number;

    depts: Depts[];
    dept_name: string;

    logs: Log[];
    action_id: number;
    action_name: string;
    action_date: string;
    action_viewed: boolean;
    action_removed: boolean;

    isNotMatch:boolean = false;

    constructor(private registerService:RegisterService, private router:Router, private toastr: ToastrService){
        this.registerService.getUser(sessionStorage.getItem('user_id'))
            .subscribe((user: any[]) => {
            this.user = user;
        });
        this.registerService.getUsers()
            .subscribe((users: any[]) => {
            this.allUsers = users;
        });
        this.registerService.getDepts()
            .subscribe((depts: any[]) => {
            this.depts = depts;
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

    switchToUpdate(){
        document.getElementById("view-mode").setAttribute("hidden", "hidden");
        document.getElementById("edit-mode").removeAttribute("hidden");

        document.getElementById("lbl_username").setAttribute("hidden", "hidden");
        document.getElementById("show_uName").setAttribute("hidden", "hidden");
        document.getElementById("lbl_password").removeAttribute("hidden");
        document.getElementById("edit_pWord").removeAttribute("hidden");
        document.getElementById("lbl_staticPw").setAttribute("hidden", "hidden");
        document.getElementById("show_pWord").setAttribute("hidden", "hidden");
        document.getElementById("lbl_confirmPw").removeAttribute("hidden");
        document.getElementById("conf_pWord").removeAttribute("hidden");
        document.getElementById("show_fName").setAttribute("hidden", "hidden");
        document.getElementById("edit_fName").removeAttribute("hidden");
        document.getElementById("show_lName").setAttribute("hidden", "hidden");
        document.getElementById("edit_lName").removeAttribute("hidden");
        document.getElementById("show_uDept").setAttribute("hidden", "hidden");
        document.getElementById("edit_uDept").removeAttribute("hidden");

        document.getElementById("btnSwitchOn").setAttribute("hidden", "hidden");
        document.getElementById("btnToUpdate").removeAttribute("hidden");
        document.getElementById("btnSwitchOff").removeAttribute("hidden");
    }

    switchToShow(){
        var okay = confirm("Cancel update?");
        if(okay){
            document.getElementById("view-mode").removeAttribute("hidden");
            document.getElementById("edit-mode").setAttribute("hidden", "hidden");

            document.getElementById("lbl_username").removeAttribute("hidden");
            document.getElementById("show_uName").removeAttribute("hidden");
            document.getElementById("lbl_password").setAttribute("hidden", "hidden");
            document.getElementById("edit_pWord").setAttribute("hidden", "hidden");
            document.getElementById("lbl_staticPw").removeAttribute("hidden");
            document.getElementById("show_pWord").removeAttribute("hidden");
            document.getElementById("lbl_confirmPw").setAttribute("hidden", "hidden");
            document.getElementById("conf_pWord").setAttribute("hidden", "hidden");
            document.getElementById("show_fName").removeAttribute("hidden");
            document.getElementById("edit_fName").setAttribute("hidden", "hidden");
            document.getElementById("show_lName").removeAttribute("hidden");
            document.getElementById("edit_lName").setAttribute("hidden", "hidden");
            document.getElementById("show_uDept").removeAttribute("hidden");
            document.getElementById("edit_uDept").setAttribute("hidden", "hidden");

            document.getElementById("btnSwitchOn").removeAttribute("hidden");
            document.getElementById("btnToUpdate").setAttribute("hidden", "hidden")
            document.getElementById("btnSwitchOff").setAttribute("hidden", "hidden");
            this.isNotMatch = false;
            
            this.showNotification('bottom','right', 1);

        }
    }

    updateUser(){
        var entry = (<HTMLInputElement>document.getElementById("edit_pWord")).value;
        var compare = (<HTMLInputElement>document.getElementById("conf_pWord")).value;

        if(entry == compare){
            this.isNotMatch = false;
            var okay = confirm("Confirm updates?");
            if(okay){
                var tbl_user = this.allUsers;
                var userArrId = 0;
                var user_name = "";

                for(var i=0; i<tbl_user.length; i++){
                    if(tbl_user[i]._id == sessionStorage.getItem('user_id')){
                        userArrId = i;
                        user_name = tbl_user[i].user_name;
                    }
                }

                var updates = {
                    _id: sessionStorage.getItem('user_id'),
                    user_password: this.user_password,
                    user_firstname: this.user_firstname,
                    user_lastname: this.user_lastname,
                    user_grp: this.user_grp
                }

                this.registerService.updateProfile(updates).subscribe(data => {
                    tbl_user[userArrId].user_password = updates.user_password;
                    tbl_user[userArrId].user_firstname = updates.user_firstname;
                    tbl_user[userArrId].user_lastname = updates.user_lastname;
                    tbl_user[userArrId].user_grp = updates.user_grp;
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
                    action_id: 4,
                    action_name: "Updated Profile",
                    action_date: new Date().toLocaleDateString("en-US", options),
                    action_viewed: false,
                    action_removed: false
                }

                this.registerService.recordLog(newLog)
                .subscribe((log: Log) => {
                    this.logs.push(log);
                    this.user_id = user_id;
                    this.user_name = user_name;
                    this.action_id = 4;
                    this.action_name = "Updated Profile";
                    this.action_date = new Date().toLocaleDateString("en-US", options);
                    this.action_viewed = false;
                    this.action_removed = false;
                });
                this.showNotification('bottom','right', 2);
                this.router.navigate(['/main/user']).then(() => {
                    setTimeout(() => { window.location.reload() }, 4000); 
                });
            } else {
                this.showNotification('bottom','right', 1);
                document.getElementById("btnSwitchOn").removeAttribute("hidden");
                document.getElementById("btnToUpdate").setAttribute("hidden", "hidden")
                document.getElementById("btnSwitchOff").setAttribute("hidden", "hidden");
            }
            document.getElementById("lbl_username").removeAttribute("hidden");
            document.getElementById("show_uName").removeAttribute("hidden");
            document.getElementById("lbl_password").setAttribute("hidden", "hidden");
            document.getElementById("edit_pWord").setAttribute("hidden", "hidden");
            document.getElementById("lbl_staticPw").removeAttribute("hidden");
            document.getElementById("show_pWord").removeAttribute("hidden");
            document.getElementById("lbl_confirmPw").setAttribute("hidden", "hidden");
            document.getElementById("conf_pWord").setAttribute("hidden", "hidden");
            document.getElementById("show_fName").removeAttribute("hidden");
            document.getElementById("edit_fName").setAttribute("hidden", "hidden");
            document.getElementById("show_lName").removeAttribute("hidden");
            document.getElementById("edit_lName").setAttribute("hidden", "hidden");
            document.getElementById("show_uDept").removeAttribute("hidden");
            document.getElementById("edit_uDept").setAttribute("hidden", "hidden");

            document.getElementById("btnSwitchOn").removeAttribute("hidden");
            document.getElementById("btnToUpdate").setAttribute("hidden", "hidden")
            document.getElementById("btnSwitchOff").setAttribute("hidden", "hidden");
        } else {
            this.isNotMatch = true;
        } 
    }

    showNotification(from, align, color) {
        // const color = Math.floor(Math.random() * 5 + 1);
    
        switch (color) {
          case 1:
            this.toastr.info(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Info</b> Update Cancelled.</span>',
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
              '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Success</b> Profile Updated.</span>',
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
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
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
          case 5:
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