import { NgModule } from "@angular/core";
import { LocationsRoutung } from "./locations.routing";
import { CommonModule } from "@angular/common";
import { MonitoringComponent } from './monitoring/monitoring.component';
import { LocationsComponent } from './locations.component';
import { CirculationAreaComponent } from './circulation-area/circulation-area.component';
import { SimulationComponent } from './simulation/simulation.component';
import { RecordsComponent } from './records/records.component';
import { CalendarComponent } from "./calendar/calendar.component";
import { ScheduleModule, RecurrenceEditorModule,DayService, WeekService, WorkWeekService,MonthService,MonthAgendaService } from '@syncfusion/ej2-angular-schedule';

@NgModule({
  declarations: [

    MonitoringComponent,
     LocationsComponent,
     CirculationAreaComponent,
     SimulationComponent,
     RecordsComponent,
     CalendarComponent,
  ],
  imports: [
    LocationsRoutung,
    CommonModule,
    ScheduleModule, RecurrenceEditorModule,
  ],
  providers: [
    DayService,WeekService,WorkWeekService,MonthService,MonthAgendaService
  ],
  exports: [
  ]
})
export class LocationsModule {
}
