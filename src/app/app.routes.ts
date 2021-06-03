import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardDemoComponent } from './pages/dashboarddemo.component';
import { EmptyDemoComponent } from './pages/emptydemo.component';
import { UtilsDemoComponent } from './pages/utilsdemo.component';
import { AppMainComponent } from './app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppLoginComponent } from './pages/app.login.component';
import { LazyLoadingComponent } from './lazy-loading/lazy-loading.component';


export const routes: Routes = [
    { path: '', component: AppMainComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'empty', component: EmptyDemoComponent },
            { path: 'utils', component: UtilsDemoComponent },
            { path: 'dashboard', component: DashboardDemoComponent },
            { path: 'lazy-loading', loadChildren: () => import('./lazy-loading/lazy-loading.module').then(m => m.LazyLoadingModule) },
            { path: 'wijmo-sample', loadChildren: () => import('./wijmo-sample/wijmo-sample.module').then(m => m.WijmoSampleModule) },
            { path: 'real-order', loadChildren: () => import('./pemeliharaan-real-order/pemeliharaan-real-order.module').then(m => m.PemeliharaanRealOrderModule) },
            { path: 'master-employee', loadChildren: () => import('./master-employee/master-employee.module').then(m => m.MasterEmployeeModule) }
        ]
    },
    {path: '404', component: AppNotfoundComponent},
    {path: 'login', component: AppLoginComponent},
    {path: '**', redirectTo: '/404'},

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
