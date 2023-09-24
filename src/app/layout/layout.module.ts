import { NgModule } from "@angular/core";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { SubHeaderComponent } from "./sub-header/sub-header.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";


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
  ],

})
export class LayoutModule {

}
