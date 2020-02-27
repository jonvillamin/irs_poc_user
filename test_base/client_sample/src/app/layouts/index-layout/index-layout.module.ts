import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { IndexLayoutRoutes } from './index-layout.routing';

import { RegisterComponent }        from '../../pages/register/register.component';
import { LoginComponent } from '../../pages/login/login.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(IndexLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
  ]
})

export class IndexLayoutModule {}
