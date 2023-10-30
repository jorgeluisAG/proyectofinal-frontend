import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagesComponent} from './pages/pages.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { RegistrationComponent } from './auth/registration/registration.component';

const routes: Routes = [

    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
      path: 'registration',
      component: RegistrationComponent,
      // canActivate: [LoginGuard],
      // loadChildren: './pages/pages.module#PagesModule'
    },
    {
      path: 'register',
      component: RegisterComponent,
      // canActivate: [LoginGuard],
      // loadChildren: './pages/pages.module#PagesModule'
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: false})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
