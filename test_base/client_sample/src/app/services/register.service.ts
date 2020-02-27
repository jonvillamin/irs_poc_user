import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
})
export class RegisterService{
    constructor(private http:HttpClient, private router:Router){
        console.log('Registration Service Initialized');
    }

    getUsers(){
        return this.http.get('http://localhost:3000/api/userModel/users')
        .pipe(map(res => res));
    }

    getUser(user_id){
        return this.http.get('http://localhost:3000/api/userModel/user/'+user_id)
        .pipe(map(res => res));
    }

    getTypes(){
        return this.http.get('http://localhost:3000/api/incidentModel')
        .pipe(map(res => res));
    }

    getReports(){
        return this.http.get('http://localhost:3000/api/incidentRecordModel/incidentRecords')
        .pipe(map(res => res));
    }

    getLogs(){
        return this.http.get('http://localhost:3000/api/logModel')
        .pipe(map(res => res));
    }

    getUserLogs(id){
        return this.http.get('http://localhost:3000/api/logModel/myLogs/'+id)
        .pipe(map(res => res));
    }

    getMyReports(id){
        return this.http.get('http://localhost:3000/api/incidentRecordModel/record/'+id)
        .pipe(map(res => res));
    }

    updateProfile(updates){
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            })
        };
        var url = 'http://localhost:3000/api/userModel/user/' + updates._id;
        return this.http.put(url, JSON.stringify(updates), httpOptions)
            .pipe(map(res => JSON.stringify(updates)));
    }

    getDepts(){
        return this.http.get('http://localhost:3000/api/deptModel')
        .pipe(map(res => res));
    }
    
    createReport(report_details){
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            })
        };
        return this.http.post('http://localhost:3000/api/incidentRecordModel', JSON.stringify(report_details), httpOptions)
            .pipe(map(res => res));
    }

    countPending(uId){
        return this.http.get('http://localhost:3000/api/incidentRecordModel/record/pending/'+uId).pipe(map(res => res));
    }

    countVerified(uId){
        return this.http.get('http://localhost:3000/api/incidentRecordModel/record/verified/'+uId).pipe(map(res => res));
    }

    countRejected(uId){
        return this.http.get('http://localhost:3000/api/incidentRecordModel/record/rejected/'+uId).pipe(map(res => res));
    }

    countCompleted(uId){
        return this.http.get('http://localhost:3000/api/incidentRecordModel/record/completed/'+uId).pipe(map(res => res));
    }

    countTotal(uId){
        return this.http.get('http://localhost:3000/api/incidentRecordModel/record/all/'+uId).pipe(map(res => res));
    }

    recordLog(log){
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            })
        };
        return this.http.post('http://localhost:3000/api/logModel', JSON.stringify(log), httpOptions)
            .pipe(map(res => res));
    }

    getUserNotifs(uId){
        return this.http.get('http://localhost:3000/api/logModel/myLogs/notif/'+uId)
            .pipe(map(res => res));
    }

    viewNotif(recordInfo){
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            })
        };
        var url = 'http://localhost:3000/api/logModel/myLog/' + recordInfo._id;
        return this.http.put(url, JSON.stringify(recordInfo), httpOptions)
            .pipe(map(res => JSON.stringify(recordInfo)));
    }

    countUnviewedNotif(uId){
        return this.http.get('http://localhost:3000/api/logModel/myLogs/notif/unviewed/'+uId).pipe(map(res => res));
    }

    addUser(newUser){
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            })
        };
        return this.http.post('http://localhost:3000/api/userModel', JSON.stringify(newUser), httpOptions)
            .pipe(map(res => res));
    }

    deleteRecord(record){
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            })
        };
        var url = 'http://localhost:3000/api/incidentRecordModel/incidentRecord/' + record._id;
        return this.http.put(url, JSON.stringify(record), httpOptions)
            .pipe(map(res => JSON.stringify(record)));
    }

    getChats(){
        return this.http.get('http://localhost:3000/api/chatModel')
        .pipe(map(res => res));
    }

    getUserChats(user_id){
        return this.http.get('http://localhost:3000/api/chatModel/'+user_id)
        .pipe(map(res => res));
    }

    sendNewMessage(message_content){
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            })
        };
        return this.http.post('http://localhost:3000/api/chatModel', JSON.stringify(message_content), httpOptions)
            .pipe(map(res => res));
    }

    // saveToMessages(message_content){
    //     var httpOptions = {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json',
    //             'Authorization': 'my-auth-token'
    //         })
    //     }
    //     var url = 'http://localhost:3000/api/chatModel/chat/' + message_content.user_id;
    //     return this.http.put(url, JSON.stringify(message_content), httpOptions)
    //         .pipe(map(res => JSON.stringify(message_content)));
    // }

    //.pipe(map(res => res));


    //OLD VERSION
    // getFreqs(){
    //     return this.http.get('http://localhost:3000/api/freqs')
    //         .pipe(map(res => res));
    // }

    // getFreq(){
    //     return this.http.get('http://localhost:3000/api/freqs')
    //         .pipe(map(res => res));
    // }
    
    // getLogs(){
    //     return this.http.get('http://localhost:3000/api/logs')
    //         .pipe(map(res => res));
    // }

    

    // update(_freq){
    //     var headers = new HttpHeaders();
    //     headers.append('Content-Type', 'application/json');
    //     return this.http.put('http://localhost:3000/api/freq', JSON.stringify(_freq), {headers: headers})
    //         .pipe(map(res => res));
    // }

    // clearUserSel(freq){
    //     var headers = new HttpHeaders();
    //     headers.append('Content-Type', 'application/json');
    //     return this.http.put('http://localhost:3000/api/freq', JSON.stringify(freq), {headers: headers})
    //         .pipe(map(res => res));
    // }

    

    // userSelected(details){
    //     var headers = new HttpHeaders();
    //     headers.append('Content-Type', 'application/json');
    //     return this.http.put('http://localhost:3000/api/user/'+details._id, JSON.stringify(details), {headers: headers})
    //         .pipe(map(res => res));
    // }
}