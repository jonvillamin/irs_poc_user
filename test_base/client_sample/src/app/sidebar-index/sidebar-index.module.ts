import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarIndexComponent } from './sidebar-index.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ SidebarIndexComponent ],
    exports: [ SidebarIndexComponent ]
})

export class SidebarIndexModule {}
