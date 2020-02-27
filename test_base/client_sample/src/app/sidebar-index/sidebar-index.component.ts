import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [    
    { path: '/login',     title: 'Login',         icon:'nc-single-02',       class: '' },
    { path: '/register',  title: 'Register',      icon:'nc-bullet-list-67',  class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-index-cmp',
    templateUrl: 'sidebar-index.component.html',
})

export class SidebarIndexComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
