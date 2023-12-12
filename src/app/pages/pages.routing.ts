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
import { InventoryComponent } from './administrator/inventory/inventory.component';
import { ProductDatesComponent } from './administrator/inventory/product-dates/product-dates.component';
import { CustomerDataComponent } from './administrator/customer/customer-data/customer-data.component';
import { PersonalDataComponent } from './administrator/personal/personal-data/personal-data.component';
import { ProductSaleComponent } from './client-pages/product-sale/product-sale.component';
import { CalendarComponent } from './administrator/calendar/calendar.component';
import { NewUserComponent } from './administrator/new-user/new-user.component';
import { NewProductComponent } from './administrator/new-product/new-product.component';
import { WorkListComponent } from './administrator/calendar/work-list/work-list.component';
import { CalendarPersonalComponent } from './administrator/calendar-personal/calendar-personal.component';

const pagesRoutes: Routes = [

    {
      path: '',
      component: ProfileComponent,
      data: { title: 'Panel de Usuario'},
      // canActivate: [AuthGuard],
      // canActivate: [UserGuard]
    },
    {
        path: 'perfil',
        component: ProfileComponent,
        data: { title: 'Panel de Usuario'},
        // canActivate: [AuthGuard],
        // canActivate: [UserGuard]
    },
    {
      path: 'nuevo-producto',
      component: NewProductComponent,
      data: { title: 'Area del nuevo producto'},
      // canActivate: [AuthGuard],
      // canActivate: [UserGuard]
    },
    {
      path: 'inventario',
      component: InventoryComponent,
      data: { title: 'Panel de los Productos'},
      // canActivate: [AuthGuard],
      // canActivate: [UserGuard]

    },
    {
      path: 'inventario/producto/:id',
      component: ProductDatesComponent,
      data: { title: 'Panel de los inventario'},
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
      path: 'tienda/Product/:id',
      component: ProductSaleComponent,
      data: { title: 'Panel del producto de venta'},
      // canActivate: [AuthGuard],
      // canActivate: [UserGuard]

    },
    {
      path: 'calendario',
      component: CalendarComponent,
      data: { title: 'Area del Historial de Tareas'},
      // canActivate: [AuthGuard],
      // canActivate: [UserGuard]
    },
    {
      path: 'calendario-empleado',
      component: CalendarPersonalComponent,
      data: { title: 'Area del Historial de Tareas del Empleado'},
      // canActivate: [AuthGuard],
      // canActivate: [UserGuard]
    },
    {
      path: 'tareas-asignadas',
      component: WorkListComponent,
      data: { title: 'Area del tareas asignadas'},
      // canActivate: [AuthGuard],
      // canActivate: [UserGuard]
    },
    {
      path: 'nuevo-usuario',
      component: NewUserComponent,
      data: { title: 'Area del nuevo usuario'},
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
      path: 'clientes/informacion/:id',
      component: CustomerDataComponent,
      data: { title: 'Panel del cliente'},
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
      path: 'personales/informacion/:id',
      component: PersonalDataComponent,
      data: { title: 'Panel del empleado'},
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
