import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MonitoringComponent } from './monitoring/monitoring.component';
import { CirculationAreaComponent } from "./circulation-area/circulation-area.component";
import { SimulationComponent } from "./simulation/simulation.component";
import { RecordsComponent } from "./records/records.component";

const pagesRoutes: Routes = [
  {
		path: '',
		redirectTo: 'ubicacion/monitoreo',
		pathMatch: 'full'
	},
    {
      path: 'monitoreo',
      component: MonitoringComponent,
      data: { title: 'Monitoreo de Vehiculo'},
    },
    {
      path: 'circulacion',
      component: CirculationAreaComponent,
      data: { title: 'Area de Circulacion'},
    },
    {
      path: 'simulacion',
      component: SimulationComponent,
      data: { title: 'Area de Simulacion'},
    },
    {
      path: 'historial',
      component: RecordsComponent,
      data: { title: 'Area del Historial de Vehiculos'},
    },


];
@NgModule({
imports: [RouterModule.forChild(pagesRoutes)],
exports: [RouterModule]
})
export class LocationsRoutung { }
