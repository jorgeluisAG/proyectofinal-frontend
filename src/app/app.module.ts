import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { SubHeaderComponent } from './layout/sub-header/sub-header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {PipesModule} from './pipes/pipes.module';
import {LoaderModule} from './shared/loader/loader.module';




import { InlineSVGModule } from 'ng-inline-svg';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { PagesComponent } from './pages/pages.component';
import { LayoutModule } from './layout/layout.module';
import { RegisterComponent } from './auth/register/register.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ScheduleModule, RecurrenceEditorModule,DayService, WeekService, WorkWeekService,MonthService,MonthAgendaService } from '@syncfusion/ej2-angular-schedule';


@NgModule({
    declarations: [

        AppComponent,
        LoginComponent,
        // HeaderComponent,
        // SubHeaderComponent,
        // SidebarComponent,
        PagesComponent,
        RegisterComponent,
        RegistrationComponent,
    ],
    imports: [
        RouterModule,
        AppRoutingModule,
        FormsModule,
        LoaderModule,
        HttpClientModule,
        InlineSVGModule,
        BrowserModule,
        ReactiveFormsModule,
        PipesModule,
        LayoutModule,
        ScheduleModule, RecurrenceEditorModule,
    ],
    providers: [
      DayService,WeekService,WorkWeekService,MonthService,MonthAgendaService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
