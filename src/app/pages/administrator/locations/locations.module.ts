import { NgModule } from "@angular/core";
import { LocationsRoutung } from "./locations.routing";
import { CommonModule } from "@angular/common";
import { MonitoringComponent } from './monitoring/monitoring.component';
import { LocationsComponent } from './locations.component';
import { CirculationAreaComponent } from './circulation-area/circulation-area.component';
import { SimulationComponent } from './simulation/simulation.component';
import { RecordsComponent } from './records/records.component';

@NgModule({
  declarations: [

    MonitoringComponent,
     LocationsComponent,
     CirculationAreaComponent,
     SimulationComponent,
     RecordsComponent
  ],
  imports: [
    LocationsRoutung,
    CommonModule
  ],
  exports: [
  ]
})
export class LocationsModule {
}
