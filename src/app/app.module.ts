import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routes';

import { AppComponent} from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppLoginComponent } from './pages/app.login.component';
import { AppMenuComponent, AppSubMenuComponent} from './app.menu.component';
import { AppTopbarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AppInlineProfileComponent } from './app.profile.component';
import { DashboardDemoComponent } from './pages/dashboarddemo.component';
import { EmptyDemoComponent } from './pages/emptydemo.component';
import { UtilsDemoComponent } from './pages/utilsdemo.component';

import { BreadcrumbService } from './breadcrumb.service';

import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { AppSharedModule } from './shared/app-shared.module';
import { UtilService } from './shared/util.service';
import { XkeyService } from './shared/xkey.service';
import { NotificationService } from './shared/notification.service';
import { AuthService } from './auth/auth.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,
        WjInputModule,
        AppSharedModule
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppTopbarComponent,
        AppFooterComponent,
        AppBreadcrumbComponent,
        AppInlineProfileComponent,
        DashboardDemoComponent,
        EmptyDemoComponent,
        UtilsDemoComponent,
        AppNotfoundComponent,
        AppLoginComponent,
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        BreadcrumbService, AuthService, UtilService, XkeyService, NotificationService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
