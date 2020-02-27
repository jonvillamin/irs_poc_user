import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarIndexComponent } from './navbar-index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [ RouterModule, CommonModule, NgbModule ],
    declarations: [ NavbarIndexComponent ],
    exports: [ NavbarIndexComponent ]
})

export class NavbarIndexModule {}
