import { BrowserAnimationsModule }        from "@angular/platform-browser/animations";
import { NgModule }                       from '@angular/core';
import { NgbModule }                      from '@ng-bootstrap/ng-bootstrap';
import { RouterModule }                   from '@angular/router';
import { ToastrModule }                   from "ngx-toastr";
import { CommonModule }                   from '@angular/common';
import { FormsModule }                    from '@angular/forms';
import { BrowserModule }                  from '@angular/platform-browser';
import { HttpClientModule }               from '@angular/common/http';
import { Ng2SearchPipeModule }            from 'ng2-search-filter';
import { FileSelectDirective }            from 'ng2-file-upload';
import { AppComponent }                   from './app.component';
import { AppRoutes }                      from './app.routing';
import { NgChatModule }                   from 'ng-chat';
import { AngularFileUploaderModule }      from 'angular-file-uploader'

//HOME
//HOME_Modules
import { SidebarModule }            from './sidebar/sidebar.module';
import { FooterModule }             from './shared/footer/footer.module';
import { NavbarModule}              from './shared/navbar/navbar.module';
import { FixedPluginModule}         from './shared/fixedplugin/fixedplugin.module';

//Home Components
import { AdminLayoutComponent }     from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent }       from './pages/dashboard/dashboard.component';
import { UserComponent }            from './pages/user/user.component';
import { TableComponent }           from './pages/table/table.component';
import { TypographyComponent }      from './pages/typography/typography.component';
import { IconsComponent }           from './pages/icons/icons.component';
import { MapsComponent }            from './pages/maps/maps.component';
import { NotificationsComponent }   from './pages/notifications/notifications.component';
import { UpgradeComponent }         from './pages/upgrade/upgrade.component';

//INDEX
//INDEX_Modules
import { SidebarIndexModule }       from './sidebar-index/sidebar-index.module';
import { NavbarIndexModule }        from './shared/navbar-index/navbar-index.module';
//INDEX_Components
import { IndexLayoutComponent }     from './layouts/index-layout/index-layout.component';
import { RegistrationComponent }    from './pages/registration/registration.component';
import { LoginComponent }           from './pages/login/login.component';
import { UsersComponent }           from './pages/users/users.component';

// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [ 
    AppComponent, 
    IndexLayoutComponent, 
    AdminLayoutComponent,
    DashboardComponent, 
    UserComponent, 
    TableComponent, 
    UpgradeComponent, 
    TypographyComponent, 
    IconsComponent, 
    MapsComponent, 
    NotificationsComponent, 
    // LoginComponent, 
    UsersComponent,
    RegistrationComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    NgChatModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    FormsModule,
    NgbModule,
    SidebarIndexModule,
    NavbarIndexModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    Ng2SearchPipeModule,
    AngularFileUploaderModule,
    // SocketIoModule.forRoot(config) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
