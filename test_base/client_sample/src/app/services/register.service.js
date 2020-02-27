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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var RegisterService = /** @class */ (function () {
    function RegisterService(http, router) {
        this.http = http;
        this.router = router;
        console.log('Registration Service Initialized');
    }
    RegisterService.prototype.getUsers = function () {
        return this.http.get('/api/users')
            .map(function (res) { return res.json(); });
    };
    RegisterService.prototype.getFreqs = function () {
        return this.http.get('/api/freqs')
            .map(function (res) { return res.json(); });
    };
    RegisterService.prototype.getFreq = function () {
        return this.http.get('/api/freqs')
            .map(function (res) { return res.json(); });
    };
    RegisterService.prototype.getLogs = function () {
        return this.http.get('/api/logs')
            .map(function (res) { return res.json(); });
    };
    RegisterService.prototype.addUser = function (newUser) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.router.navigate(['/index']);
        return this.http.post('/api/user', JSON.stringify(newUser), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    RegisterService.prototype.update = function (_freq) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/freq', JSON.stringify(_freq), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    RegisterService.prototype.clearUserSel = function (freq) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/freq', JSON.stringify(freq), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    RegisterService.prototype.recordLog = function (log) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/log', JSON.stringify(log), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    RegisterService.prototype.userSelected = function (details) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/user/' + details._id, JSON.stringify(details), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    RegisterService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, router_1.Router])
    ], RegisterService);
    return RegisterService;
}());
exports.RegisterService = RegisterService;
//# sourceMappingURL=register.service.js.map