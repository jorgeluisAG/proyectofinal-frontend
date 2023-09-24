import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { SubHeaderComponent } from './layout/sub-header/sub-header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { PagesComponent } from './pages/pages.component';

import { InlineSVGModule } from 'ng-inline-svg';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    SubHeaderComponent,
    PagesComponent,

  ],
  imports: [
    RouterModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    InlineSVGModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
