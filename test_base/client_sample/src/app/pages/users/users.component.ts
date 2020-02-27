import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
// import { TranslateService } from 'ng2-translate/ng2-translate';
import { User } from '../../class/User';
import { Log } from '../../class/Log';

@Component({
  moduleId: module.id,
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {
  users: User[];
  user_name: string;
  user_password: string;
  user_grp: string;
  user_firstname: string;
  user_lastname: string;
  user_type: number; 

  logs: Log[];
  user_id: string;
  action_id: number;
  action_name: string;
  action_date: string;
  action_viewed: boolean;
  action_removed: boolean;

  isNotFound: boolean;
  isNotMatch: boolean;

  constructor(private registerService:RegisterService, private router:Router){
    this.registerService.getUsers()
      .subscribe((users: any[]) => {
        this.users = users;
      });
      this.registerService.getLogs()
      .subscribe((logs: any[]) => {
        this.logs = logs;
      });
  }

  // guestLogin(event: { preventDefault: () => void; }){
  //   sessionStorage.setItem('user_id', 'null');
  //   var users = this.users;
  //   var user_id = users[1]._id;
  //   var user_name = users[1].user_name;
  //   sessionStorage.setItem('user_id', user_id);

  //   //Log Action
  //   var newLog = {
  //     user_id: user_id,
  //     user_name: user_name,
  //     action_id: 5,
  //     action_name: "Guest Login",
  //     action: 'A guest user had logged in.',
  //     date: new Date(Date.now()).getFullYear() + "/" + (new Date(Date.now()).getMonth() + 1) + "/" + new Date(Date.now()).getDate() + " " + new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
  //   }

  //   this.registerService.recordLog(newLog)
  //     .subscribe((log: Log) => {
  //       this.logs.push(log);
  //       this.user_id = user_id;
  //       this.user_name = user_name;
  //       this.action_id = 5
  //       this.action_name = "Guest Login";
  //       this.action = 'A guest user had logged in.';
  //       this.date = new Date(Date.now()).getFullYear() + "/" + (new Date(Date.now()).getMonth() + 1) + "/" + new Date(Date.now()).getDate() + " " + new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
  //     });

  //   this.router.navigate(['/home']);
  // }

  tryLogin(event: { preventDefault: () => void; }){
    sessionStorage.setItem('user_id', 'null');
    var creds = {
      user_name: this.user_name,
      user_password: this.user_password
    }

    var users = this.users;
    var user_id = '';
    for(var i = 0; i<users.length; i++){
      if(users[i].user_name == creds.user_name){
        this.isNotFound = false;
        if(users[i].user_password == creds.user_password){
          this.isNotMatch = false;
          sessionStorage.setItem('user_id', users[i]._id);
          if(creds.user_name == 'admin' && creds.user_password == 'admin'){
            // this.router.navigate(['/admin']);
            console.log('Admin Page not yet connected');
          } else {
            //Log Action
            var options = { hour12: false, year: 'numeric', month: 'long', day: 'numeric', hour:'2-digit', minute: '2-digit' };
            var newLog = {
              user_id: users[i]._id,
              user_name: users[i].user_name,
              action_id: 2,
              action_name: "User Login",
              action_date: new Date().toLocaleDateString("en-US", options),
              action_viewed: false,
              action_removed: false
            }

            this.registerService.recordLog(newLog)
              .subscribe((log: Log) => {
                this.logs.push(log);
                this.user_id = users[i]._id;
                this.user_name = users[i].user_name;
                this.action_id = 2;
                this.action_name = "User Login";
                this.action_date = new Date().toLocaleDateString("en-US", options);
                this.action_viewed = false;
                this.action_removed = false;
              });
            this.router.navigate(['/main/dashboard']).then(() => {
              window.location.reload();
            });
          }
          break;
        } else {
          this.isNotMatch = true;
          break;
        }
      } else {
        this.isNotFound = true;
      }
    }
  }
 }