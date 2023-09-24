import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardModule} from 'ngx-card';
import { InlineSVGModule } from 'ng-inline-svg';
import { HomeComponent } from './home/home.component';
import { PAGES_ROUTES } from './pages.routing';

@NgModule({
  declarations: [

    HomeComponent
  ],
  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InlineSVGModule,
    PAGES_ROUTES
  ],

})
export class PagesModule { }
