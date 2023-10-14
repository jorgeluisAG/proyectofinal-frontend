import {HomeComponent} from './home/home.component';

import { RouterModule, Routes, CanActivate } from '@angular/router';

import { ProductListComponent } from './administrator/product-list/product-list.component';
import { ProfileComponent } from './administrator/profile/profile.component';
import { HomeAdmComponent } from './administrator/home-adm/home-adm.component';
import { CustomerComponent } from './administrator/customer/customer.component';
import { NgModule } from '@angular/core';
import { LocationsModule } from './administrator/locations/locations.module';
import { LayoutModule } from '../layout/layout.module';
import { LocationsComponent } from './administrator/locations/locations.component';
import { PersonalComponent } from './administrator/personal/personal.component';
import { StoreProductComponent } from './client-pages/store-product/store-product.component';

const pagesRoutes: Routes = [


    {
        path: 'perfil',
        component: ProfileComponent,
        data: { title: 'Panel de Usuario'},
        // canActivate: [AuthGuard],
        // canActivate: [UserGuard]
    },
    {
      path: 'inventario',
      component: ProductListComponent,
      data: { title: 'Panel de los Productos'},
      // canActivate: [AuthGuard],
      // canActivate: [UserGuard]

    },
    {
      path: 'tienda',
      component: StoreProductComponent,
      data: { title: 'Panel de los productos'},
      // canActivate: [AuthGuard],
      // canActivate: [UserGuard]

    },
    {
      path: 'clientes',
      component: CustomerComponent,
      data: { title: 'Panel de los Clientes'},
      // canActivate: [AuthGuard],
      // canActivate: [UserGuard]

    },
    {
      path: 'personales',
      component: PersonalComponent,
      data: { title: 'Panel del Personal de la empresa'},
      // canActivate: [AuthGuard],
      // canActivate: [UserGuard]

    },
    {
      path: 'ubicacion',
      component:  LocationsComponent,
      loadChildren: () => import('../pages/administrator/locations/locations.module').then(m => m.LocationsModule)
    },




    { path: '', redirectTo: '/perfil', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutung { }
// export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
