import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { Log } from '../../class/Log';
import * as $ from 'jquery';

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})

export class NavbarComponent implements OnInit{
  
    logs: Log[];
    log_id: string;
    action_viewed: boolean;
    action_removed: boolean;
    unviewed: number;

    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;

    public isCollapsed = true;
    @ViewChild("navbar-cmp", {static: false}) button;

    constructor(private registerService:RegisterService, location:Location, private renderer : Renderer, private element : ElementRef, private router: Router) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
        
        this.registerService.getUserNotifs(sessionStorage.getItem('user_id'))
            .subscribe((log: any[]) => {
                this.logs = log;
        });

        this.registerService.countUnviewedNotif(sessionStorage.getItem('user_id'))
            .subscribe((count: number) => {
                this.unviewed = count;
        });
    }

    ngOnInit(){
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe((event) => {
          this.sidebarClose();
       });
    }
    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 2 );
      }
      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
      }
      sidebarOpen() {
          const toggleButton = this.toggleButton;
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          setTimeout(function(){
              toggleButton.classList.add('toggled');
          }, 500);

          html.classList.add('nav-open');
          if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
          }
          this.sidebarVisible = true;
      };
      sidebarClose() {
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          if (window.innerWidth < 991) {
            setTimeout(function(){
              mainPanel.style.position = '';
            }, 500);
          }
          this.toggleButton.classList.remove('toggled');
          this.sidebarVisible = false;
          html.classList.remove('nav-open');
      };
      collapse(){
        this.isCollapsed = !this.isCollapsed;
        const navbar = document.getElementsByTagName('nav')[0];
        console.log(navbar);
        if (!this.isCollapsed) {
          navbar.classList.remove('navbar-transparent');
          navbar.classList.add('bg-white');
        }else{
          navbar.classList.add('navbar-transparent');
          navbar.classList.remove('bg-white');
        }

      }

      viewNotif(recordInfo){
        var updates = {
          _id: recordInfo._id,
          action_viewed: true
        }

        this.registerService.viewNotif(updates).subscribe(data => {
          this.log_id = updates._id;
          this.action_viewed = updates.action_viewed;
        });

        $('#navbarDropdownMenuLink').load(document.URL);
      }

      removeNotif(recordInfo){
        // alert("Removing Notif");
        var updates = {
          _id: recordInfo._id,
          action_viewed: true,
          action_removed: true
        }

        this.registerService.viewNotif(updates).subscribe(data => {
          this.log_id = updates._id;
          this.action_viewed = updates.action_viewed;
          this.action_removed = updates.action_removed;
        });

        $('#navbarDropdownMenuLink').load(document.URL);
      }

}
