import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const pagesRoutes: Routes =[
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Panel de Administrador'},
    // canActivate: [AuthGuard],
    // canActivate: [UserGuard]
  },
  { path: '', redirectTo: '/', pathMatch: 'full'}
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
