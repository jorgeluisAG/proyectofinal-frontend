import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagesComponent} from './pages/pages.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guard/auth.guard';

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

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: false})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
