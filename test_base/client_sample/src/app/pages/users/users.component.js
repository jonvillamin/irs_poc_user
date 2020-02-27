"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var register_service_1 = require("../../services/register.service");
var UsersComponent = /** @class */ (function () {
    function UsersComponent(registerService, router) {
        var _this = this;
        this.registerService = registerService;
        this.router = router;
        this.registerService.getUsers()
            .subscribe(function (users) {
            _this.users = users;
        });
        this.registerService.getLogs()
            .subscribe(function (logs) {
            _this.logs = logs;
        });
    }
    UsersComponent.prototype.guestLogin = function (event) {
        var _this = this;
        sessionStorage.setItem('user_id', 'null');
        var users = this.users;
        var user_id = users[1]._id;
        var user_name = users[1].user_name;
        sessionStorage.setItem('user_id', user_id);
        //Log Action
        var newLog = {
            user_id: user_id,
            user_name: user_name,
            action_id: 5,
            action_name: "Guest Login",
            action: 'A guest user had logged in.',
            date: new Date(Date.now()).getFullYear() + "/" + (new Date(Date.now()).getMonth() + 1) + "/" + new Date(Date.now()).getDate() + " " + new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        };
        this.registerService.recordLog(newLog)
            .subscribe(function (log) {
            _this.logs.push(log);
            _this.user_id = user_id;
            _this.user_name = user_name;
            _this.action_id = 5;
            _this.action_name = "Guest Login";
            _this.action = 'A guest user had logged in.';
            _this.date = new Date(Date.now()).getFullYear() + "/" + (new Date(Date.now()).getMonth() + 1) + "/" + new Date(Date.now()).getDate() + " " + new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
        });
        this.router.navigate(['/home']);
    };
    UsersComponent.prototype.tryLogin = function (event) {
        var _this = this;
        sessionStorage.setItem('user_id', 'null');
        var creds = {
            user_name: this.user_name,
            password: this.password
        };
        var users = this.users;
        var user_id = '';
        for (var i = 0; i < users.length; i++) {
            if (users[i].user_name == creds.user_name) {
                if (users[i].password == creds.password) {
                    sessionStorage.setItem('user_id', users[i]._id);
                    if (creds.user_name == 'admin' && creds.password == 'admin') {
                        this.router.navigate(['/admin']);
                    }
                    else {
                        //Log Action
                        var newLog = {
                            user_id: users[i]._id,
                            user_name: users[i].user_name,
                            action_id: 3,
                            action_name: "User Login",
                            action: 'User ' + users[i].user_name + ' logged in.',
                            date: new Date(Date.now()).getFullYear() + "/" + (new Date(Date.now()).getMonth() + 1) + "/" + new Date(Date.now()).getDate() + " " + new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
                        };
                        this.registerService.recordLog(newLog)
                            .subscribe(function (log) {
                            _this.logs.push(log);
                            _this.user_id = users[i]._id;
                            _this.user_name = users[i].user_name;
                            _this.action_id = 3;
                            _this.action_name = "User Login";
                            _this.action = 'User ' + users[i].user_name + ' logged in.';
                            _this.date = new Date(Date.now()).getFullYear() + "/" + (new Date(Date.now()).getMonth() + 1) + "/" + new Date(Date.now()).getDate() + " " + new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
                        });
                        this.router.navigate(['/home']);
                    }
                    break;
                }
                else {
                    console.log('Invalid Credentials [Password Mismatch]');
                    break;
                }
            }
            else {
                console.log('Invalid Credentials [Username Not Found]');
            }
        }
    };
    UsersComponent.prototype.LogUserLogin = function () {
    };
    UsersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'users',
            templateUrl: './users.component.html',
            styleUrls: ['./users.component.css']
        }),
        __metadata("design:paramtypes", [register_service_1.RegisterService, router_1.Router])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map