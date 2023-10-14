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
  ],
    imports: [
        CommonModule,
        PipesModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        InlineSVGModule,
        PagesRoutung,

        LocationsModule,
    ],
    exports: [
      CommonModule,
      HomeAdmComponent
    ]
})
export class PagesModule {
}
