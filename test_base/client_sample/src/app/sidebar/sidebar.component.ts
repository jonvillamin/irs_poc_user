import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [    
    { path: 'main/dashboard',     title: 'Dashboard',         icon:'nc-bank',           class: '' },
    { path: 'main/user',          title: 'User Profile',      icon:'nc-single-02',      class: '' },
    { path: 'main/report',        title: 'New Report',        icon:'nc-simple-add',     class: '' },
    { path: 'main/history',       title: 'Incident List',     icon:'nc-bullet-list-67', class: '' },
    { path: 'main/notifications', title: 'History',           icon:'nc-bell-55',        class: '' },
    { path: 'main/chat',          title: 'Chat',              icon:'nc-chat-33',        class: '' },
    { path: 'main/logout',        title: 'Log Out',           icon:'nc-button-power',   class: '' },
    // { path: '/icons',         title: 'Icons',             icon:'nc-button-power',   class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    logOut(){
        sessionStorage.setItem("user_id", "");
    }
}
