import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'upgrade-cmp',
    moduleId: module.id,
    templateUrl: 'upgrade.component.html'
})

export class UpgradeComponent implements OnInit{
    constructor(private router:Router){
        
    }

    ngOnInit() {
        if(sessionStorage.getItem('user_id')=="" || sessionStorage.getItem('user_id')==undefined){
            alert("You are not logged in!");
            this.router.navigate(['/login']).then(() => {
                window.location.reload();
              });
          }
    }
}
