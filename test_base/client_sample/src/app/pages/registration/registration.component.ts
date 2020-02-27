import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { RegisterService } from '../../services/register.service';
import { User } from '../../class/User';
import { Log } from '../../class/Log';
import { Depts } from '../../class/Depts';
// var bcrypt = require('bcrypt');

@Component({
  moduleId: module.id,
  selector: 'registration-content',
  templateUrl: './registration.component.html',
  styleUrls: ['registration.component.css']
}) 

export class RegistrationComponent {
  users: User[];
  _id: string;
  user_type: number;
  user_name: string;
  user_password: string;
  user_firstname: string;
  user_lastname: string;
  user_grp: string;

  logs: Log[];
  user_id: string;
  action_id: number;
  action_name: string;
  action: string;
  date: string;

  depts: Depts[];
  dept_name: string;

  isTaken: boolean;
  isNotMatch: boolean;

  constructor(private registerService:RegisterService, private router:Router, private toastr: ToastrService){
    this.registerService.getUsers()
      .subscribe((users:any[]) => {
        this.users = users;
      });
    this.registerService.getLogs()
      .subscribe((logs:any[]) => {
        this.logs = logs;
      });
    this.registerService.getDepts()
      .subscribe((depts: any[]) => {
        this.depts = depts;
      });
  }

  addUser(){
    var inputPw = (<HTMLInputElement>document.getElementById("userPw")).value;
    var checkPw = (<HTMLInputElement>document.getElementById("reUserPw")).value;
    // var BCRYPT_SALT_ROUNDS = 12;
    if(inputPw == checkPw){
      this.isNotMatch = false;
      var newUser = {
        user_type: 1,
        user_name: this.user_name,
        user_password: this.user_password,
        user_firstname: this.user_firstname,
        user_lastname: this.user_lastname,
        user_grp: this.user_grp
      }

      if(newUser.user_name == undefined || newUser.user_password == undefined || newUser.user_firstname == undefined || newUser.user_lastname == undefined || newUser.user_grp == undefined || newUser.user_name == "" || newUser.user_password == "" || newUser.user_firstname == "" || newUser.user_lastname == "" || newUser.user_grp == ""){
        this.showNotification('top','center', 3);
      } else {
        //Add User Validation
        var users = this.users;
        var flag = true;
        for(var i = 0; i<users.length; i++){
          if(newUser.user_name == users[i].user_name || newUser.user_name == "admin"){
            flag = false;
          }
        }
        if(flag){  
          this.isTaken = false;    
          //Register New User
          this.registerService.addUser(newUser)
            .subscribe((user:User) => {
              this.users.push(user);
              this.user_type = 1;
              this.user_name = newUser.user_name;
              this.user_password = newUser.user_password;
              this.user_firstname = newUser.user_firstname;
              this.user_lastname = newUser.user_lastname;
              this.user_grp = newUser.user_grp;
            });
            this.showNotification('top','center', 2);
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
        } else {
          this.isTaken = true;
        }
      }
    } else {
      this.isNotMatch = true;
    }
  }
  showNotification(from, align, color) {
    // const color = Math.floor(Math.random() * 5 + 1);

    switch (color) {
      case 2:
        this.toastr.success(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Success</b> Registration Successful</span>',
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
      default:
        break;
    }
  }
 }