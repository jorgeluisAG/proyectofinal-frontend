import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarService } from 'src/app/services/calendar.service';
import { Person } from 'src/app/model/Person';
import { Authority } from 'src/app/model/Authority';
import { AddressDTO } from 'src/app/model/DTO/AddressDTO';
import { UserCreateNewDTO } from 'src/app/model/DTO/UserCreateNewDTO';
import { PersonalService } from 'src/app/services/personal.service';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


let eventGuid = 0;

@Component({
  selector: 'app-calendar-personal',
  templateUrl: './calendar-personal.component.html',
  styleUrls: ['./calendar-personal.component.css']
})
export class CalendarPersonalComponent implements OnInit {

  personalDataUser: any;

  cars = [
    { id: 1, name: 'TIENE DATO 1' },
    { id: 2, name: 'TIENE DATOS 2' },
    { id: 3, name: 'TIENE DATO 3' },
    { id: 4, name: 'NOSE SI TIENE DATOS' },
  ];
  person: Person = new Person(0,'','','','','','',true)
  authority: Authority = new Authority('')
  addressrequests: Array<AddressDTO> = [];

  employeesAll1: UserCreateNewDTO = new UserCreateNewDTO(0,'','','',false,this.authority,false,'','',this.person,'',this.addressrequests);

  employeesAll: UserCreateNewDTO[] = [];
  employeesAlt: any[];

  nombreUsuario = "";
  selectedEmployeId = "0";

  fechaInicio = "";
  horaInicio = "";

  fechaFinal = "";
  horaFinal = "";

  descripcion= "";

  //calendaar
  calendarVisible = true;
  calendarVisible1 = false;
  calendarOptions?: CalendarOptions;
  datosEventoUsuario: any[];

  currentEvents: EventApi[] = [];

  constructor(
    private calendarService: CalendarService,
    private changeDetector: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private personalService: PersonalService
  ){
    // activatedRoute.params.subscribe( params => {
    //   this.id = params.id;
    // });
  }

  ngOnInit(): void {
    this.getEmployeesListAll();
    this.personalDataUser = JSON.parse(localStorage.getItem('dataUser')+'');
    this.getCalendarUser();
  }

  getEmployeesListAll(){
    // console.log(("Cliente 2"))
    this.personalService.getUserEmployeesAll()
    .subscribe((resp: HttpResponse<any>) => {
      // console.log(resp.body)
      this.employeesAll = resp.body;
      // this.employeesAlt = resp.body;
      // console.log(this.employeesAll)
      // console.log(this.employeesAlt)
    });
  }

  getCalendarUser(){

    // for(let i in this.employeesAll){
    //   if(this.employeesAll[i].id===parseInt(this.selectedEmployeId)){
    //     this.nombreUsuario = this.employeesAll[i].userName;
    //   }
    // }
    //this.prueba = this.employeesAlt.filter(y=> y.id === parseInt(this.selectedEmployeId))[0].userName;
    // console.log("daleee " + this.selectedEmployeId)
    // console.log("Aber  "+ this.prueba)
    //this.nombreUsuario= this.cars.filter(x=> x.id=== parseInt(this.selectedPersonId))[0].name;
    // console.log("XD  "+ this.nombreUsuario)
    // if(this.selectedEmployeId==="0"){
    //   this.nombreUsuario = "Seleccione un Empleado";
    // }
    // console.log()
    this.calendarService.getListCalendarUser(parseInt(this.personalDataUser.id))
      .subscribe(resp =>{
        this.datosEventoUsuario=resp.body;
        this.datosEventoUsuario.find(x=> {
          let valor = String(x.start).split("T");
          if(valor[1]==="00:00:00.000+00:00"){
            x.start=valor[0];
          }
          let valor1 = String(x.end).split("T");
          if(valor1[1]==="00:00:00.000+00:00"){
            x.end=valor1[0];
          }
        })
        this.cargarCalendario()

        // console.log(this.datosEventoUsuario)
      })
  }


  cargarCalendario(){
    this.calendarVisible=!this.calendarVisible;
    this.calendarVisible1=!this.calendarVisible1;
    this.calendarOptions = {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
      ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      locales: [esLocale],
      initialView: 'dayGridMonth',
      initialEvents: this.datosEventoUsuario, // alternatively, use the `events` setting to fetch from a feed
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      //select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      //eventsSet: this.handleEvents.bind(this)
    };

  }

  async handleDateSelect(selectInfo: DateSelectArg) {

    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Agregar Tarea",
      inputPlaceholder: "Escribe tu mensaje aquí...",
      inputAttributes: {
        "aria-label": "Escribe tu mensaje aquí"
      },
      showCancelButton: true
    });
    if (text) {

      var title=text;
    }

    // const title = prompt('Ingrese el Mensaje o Tarea del Empleado');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
      // console.log(selectInfo.startStr)
      // console.log(selectInfo.endStr)
      // console.log(selectInfo.allDay)
      let addDato = {
        id: this.selectedEmployeId,
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr
      }
      this.guardarDatosPost(addDato)

    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    Swal.fire({
      title: "Tarea del Dia",
      text: `'${clickInfo.event.title}'`,
      icon: "info"
    });
    // if (confirm(`Are you sure you want to delete the event 11'${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  createEventId() {
    return String(eventGuid++);
  }

  agregarDatos(){
    this.updateEvents();
    this.calendarVisible=!this.calendarVisible;
    this.calendarVisible1=!this.calendarVisible1;
  }

  updateEvents() {
    let fechaStartOf = this.fechaInicio+"T"+this.horaInicio
    if(this.horaInicio===""){
      fechaStartOf=this.fechaInicio
    }
    let fechaEndOf = this.fechaFinal+"T"+this.horaFinal
    if(this.horaFinal===""){
      fechaEndOf=this.fechaFinal
    }
    if(this.fechaFinal===""){
      fechaEndOf=this.fechaInicio;
      if(this.horaFinal!==""){
        fechaEndOf=this.fechaInicio+"T"+this.horaFinal;
      }
    }
    // console.log(this.fechaInicio)
    // console.log(this.fechaFinal)
    let addDato = {
      id: this.createEventId(),
      title: this.descripcion,
      start: fechaStartOf,
      end: fechaEndOf
    }
    this.guardarDatosPost(addDato)
    this.datosEventoUsuario.push(addDato)
    // console.log(this.datosEventoUsuario)
    this.calendarOptions!.initialEvents = this.datosEventoUsuario;

  }

  guardarDatosPost(addDato: any){
    addDato.id = this.selectedEmployeId;
    this.calendarService.postCalendarUser(addDato)
      .subscribe(resp =>{
        // console.log(resp.body);
        if(this.selectedEmployeId==="0"){
          this.nombreUsuario = "";
        }
        this.fechaInicio = "";
        this.horaInicio = "";
        this.fechaFinal = "";
        this.horaFinal = "";
        this.descripcion= "";
      })
  }

  votonPrueba(){
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro/a de eliminar a este/a usuario/a?',
      showConfirmButton: true,
      confirmButtonText: 'ELIMINAR',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonText: 'CANCELAR',
      cancelButtonColor: '#d33',
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log("SE ELIMINO LA TAREA");
          // $.ajax({
          //     //url: 'usuario/eliminar/' + 1,
          //     method: 'DELETE',
          //     success: function( data ) {
          //         Swal.fire({
          //             icon: 'success',
          //             title: 'Usuario eliminado correctamente',
          //             showConfirmButton: false,
          //             timer: 1500,
          //         })
          //     }
          // });
      }
    })
  }




}
