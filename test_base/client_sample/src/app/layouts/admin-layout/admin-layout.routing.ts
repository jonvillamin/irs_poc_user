import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',     component: DashboardComponent },
    { path: 'user',          component: UserComponent },
    { path: 'report',        component: TypographyComponent },
    { path: 'history',       component: TableComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'logout',        component: UpgradeComponent },
    { path: 'chat',          component: MapsComponent },
    // { path: 'icons',         component: IconsComponent },
];
