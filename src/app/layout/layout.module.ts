import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
    declarations: [
        SidebarComponent,
        HeaderComponent,
        SubHeaderComponent
    ],
    exports: [
        SidebarComponent,
        HeaderComponent,
        SubHeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class LayoutModule {
}
