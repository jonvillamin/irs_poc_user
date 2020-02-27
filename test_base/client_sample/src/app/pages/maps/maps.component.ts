import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { User } from '../../class/User';
import { Chat } from '../../class/Chat';
import { Log } from '../../class/Log';
import * as $ from 'jquery';

@Component({
    moduleId: module.id,
    selector: 'maps-cmp',
    templateUrl: 'maps.component.html',
    styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {
    allUsers: User[];
    user_id: string;
    user_name: string;

    chats: Chat[];
    allChats: Chat[];

    sender: string;
    receiver: string;
    messages: string;
    dateTime: string;
    viewed: boolean;
    
    logs: Log[];
    action_id: number;
    action_name: string;
    action_date: string;
    action_viewed: boolean;
    action_removed: boolean;

    constructor(private registerService:RegisterService, private router:Router, private toastr: ToastrService){
        this.registerService.getUsers()
            .subscribe((users: any[]) => {
            this.allUsers = users;
        });
        this.registerService.getChats()
            .subscribe((chat: any[]) => {
            this.allChats= chat;
            localStorage.setItem("previousChats", this.allChats.length.toString());
        });
        this.registerService.getUserChats(sessionStorage.getItem('user_id'))
            .subscribe((chats: any[]) => {
            this.chats= chats;
        });
    }

    ngOnInit() {
        if(sessionStorage.getItem('user_id')=="" || sessionStorage.getItem('user_id')==undefined){
            this.showNotification('top','center', 4);
            this.router.navigate(['/login']).then(() => {
                setTimeout(() => { window.location.reload() }, 4000);
            });
        }
        // $('#chatbox').load(document.URL);
    }

    refreshChat() {
        $('#chatbox').load(document.URL);
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

    scrollToThis(){
        window.scrollTo(0, document.querySelector("#chatbox").scrollHeight);
    }

    sendMessage(){
        var tbl_user = this.allUsers;
        var user_id = sessionStorage.getItem('user_id');
        var userArrId = 0;
        var user_name = "";
        for(var i=0; i<tbl_user.length; i++){
            if(tbl_user[i]._id == sessionStorage.getItem('user_id')){
                userArrId = i;
                user_name = tbl_user[i].user_name;
            }
        }

        var options = { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        var message_details = {
            user_id: user_id,
            sender: user_name,
            receiver: "Admin",
            messages: this.messages,
            dateTime: new Date().toLocaleDateString("en-US", options),
            viewed: false
        }

        var allChats = this.allChats;
        //ADD NEW
        this.registerService.sendNewMessage(message_details)
            .subscribe((chat: Chat) => {
                this.allChats.push(chat);
                this.user_id = user_id;
                this.sender = user_name;
                this.receiver = "Admin";
                this.dateTime = message_details.dateTime;
                this.messages = message_details.messages;
                this.viewed = false;
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
             action_id: 6,
             action_name: "Sent new Message",
             action_date: new Date().toLocaleDateString("en-US", options),
             action_viewed: false,
             action_removed: false
         }

         this.registerService.recordLog(newLog)
         .subscribe((log: Log) => {
             this.logs.push(log);
             this.user_id = user_id;
             this.user_name = user_name;
             this.action_id = 6;
             this.action_name = "Sent new Message";
             this.action_date = new Date().toLocaleDateString("en-US", options);
             this.action_viewed = false;
             this.action_removed = false;
         });
         $('#chatbox').load(document.URL);
    }
}