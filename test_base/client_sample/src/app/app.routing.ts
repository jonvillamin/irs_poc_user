import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { IndexLayoutComponent } from './layouts/index-layout/index-layout.component';

//Home Components
import { DashboardComponent }       from './pages/dashboard/dashboard.component';
import { UserComponent }            from './pages/user/user.component';
import { TableComponent }           from './pages/table/table.component';
import { TypographyComponent }      from './pages/typography/typography.component';
import { IconsComponent }           from './pages/icons/icons.component';
import { MapsComponent }            from './pages/maps/maps.component';
import { NotificationsComponent }   from './pages/notifications/notifications.component';
import { UpgradeComponent }         from './pages/upgrade/upgrade.component';
//Index Components
import { RegistrationComponent }    from './pages/registration/registration.component';
import { LoginComponent }           from './pages/login/login.component';
import { UsersComponent }           from './pages/users/users.component';

export const AppRoutes: Routes = [
  //Login & Register
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: UsersComponent,
    pathMatch: 'full',
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    pathMatch: 'full',
  },
  //Home
  {
    path: 'main',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard',     component: DashboardComponent },
      { path: 'user',          component: UserComponent },
      { path: 'report',        component: TypographyComponent },
      { path: 'history',       component: TableComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'logout',        component: UpgradeComponent },
      { path: 'chat',          component: MapsComponent },
      { path: '**',            component: DashboardComponent},
    ]
  },

  //Redirect
  {
    path: '**',
    redirectTo: 'login'
  }
]