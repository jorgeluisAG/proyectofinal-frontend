import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardModule} from 'ngx-card';
import { InlineSVGModule } from 'ng-inline-svg';

import {PipesModule} from '../pipes/pipes.module';
import {PagesRoutung} from './pages.routing';


import { InventoryComponent } from './administrator/inventory/inventory.component';
import { ProductListComponent } from './administrator/product-list/product-list.component';
import { ProfileComponent } from './administrator/profile/profile.component';
import { HomeAdmComponent } from './administrator/home-adm/home-adm.component';
import { CustomerComponent } from './administrator/customer/customer.component';
import { PersonalComponent } from './administrator/personal/personal.component';
import { LocationsModule } from './administrator/locations/locations.module';
import { StoreProductComponent } from './client-pages/store-product/store-product.component';
import { ProductDatesComponent } from './administrator/inventory/product-dates/product-dates.component';
import { CustomerDataComponent } from './administrator/customer/customer-data/customer-data.component';
import { PersonalDataComponent } from './administrator/personal/personal-data/personal-data.component';
import { ProductSaleComponent } from './client-pages/product-sale/product-sale.component';
import { CalendarComponent } from './administrator/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { NewUserComponent } from './administrator/new-user/new-user.component';
import { NewProductComponent } from './administrator/new-product/new-product.component';

@NgModule({
    declarations: [
        ProfileComponent,
        ProductListComponent,
        InventoryComponent,
        ProductListComponent,
        HomeAdmComponent,
        CustomerComponent,
        PersonalComponent,
        StoreProductComponent,
        ProductDatesComponent,
        CustomerDataComponent,
        PersonalDataComponent,
        ProductSaleComponent,
        CalendarComponent,
        NewUserComponent,
        NewProductComponent,
  ],
    imports: [

        NgSelectModule,
        CommonModule,
        PipesModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        InlineSVGModule,
        PagesRoutung,
        LocationsModule,
        FullCalendarModule

      ],
    exports: [
      CommonModule,
      HomeAdmComponent
    ]
})
export class PagesModule {
}
