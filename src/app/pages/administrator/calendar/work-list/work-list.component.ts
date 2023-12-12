import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Address } from 'src/app/model/Address';
import { Authority } from 'src/app/model/Authority';
import { AddressDTO } from 'src/app/model/DTO/AddressDTO';
import { Person } from 'src/app/model/Person';
import { User } from 'src/app/model/User';
import { WorkCalendar } from 'src/app/model/WorkCalendar';
import { CalendarService } from 'src/app/services/calendar.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

declare var $: any;
@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})
export class WorkListComponent implements OnInit {


  table: any;
  projectUrl = `${environment.projectEndpoint}`;

  person: Person = new Person(0,'','','','','','',true);
  authority: Authority = new Authority('');
  user: User = new User(0,'','','',false,'','','',this.person,'');
  address: Address = new Address(0,'',this.user,false);

  workCalendar: WorkCalendar = new WorkCalendar(0,'','','',0,this.user);

  //personalOne: UserCreateNewDTO = new UserCreateNewDTO(0,'','','',false,this.authority,false,'','',this.person,'',this.addressrequests);

  constructor(
    private calendarService: CalendarService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getWorkCalendarListAll();
    this.changeWorkCalendar();
  }
  changeWorkCalendar(){
    delay(500);
    this.getDatatablesWorkCalendar()

  }

  getWorkCalendarListAll(){
    this.calendarService.getEmployeesWorkCalendarAll()
          .subscribe((resp: HttpResponse<any>) =>{
            this.workCalendar = resp.body;
            console.log(this.workCalendar);
          })
  }

  getDatatablesWorkCalendar(){
    delay(500);
    console.log("Cliente 3")
    let cont =1;
    let url=`${this.projectUrl}/calendar/list/all`;
    console.log(url)
    this.table = $("#work_calendar_list").DataTable({
      //scrollY: "480px",
      searchDelay: 500,
      processing: true,
      serverPaging: true,
      pageLength: 5,
      destroy: true,
      serverFiltering: false,
      serverSorting: false,
      order: [],
      language: {
          url: '//cdn.datatables.net/plug-ins/1.11.4/i18n/es_es.json'
      },
      ajax: {
          url: `${url}`,
          contentType: 'application/json',
          headers: {
              'Authorization':`Bearer ${localStorage.getItem('token')}`,
              'Content-Type':'application/json',
          },
          dataSrc: '',
      },
      columns: [
        {
          className: 'text-center',
          data: 'createdAt',
          //visible: this.fechaStatus
        },
        {
          className: 'text-center',
          data: 'descriptionWork',
          //visible: this.nombreUsuarioStatus
        },
        {
          className: 'text-center',
          data: 'startDate',
          //visible: this.emailStatus
        },
        {
          className: 'text-center',
          data: 'endDate',
          //visible: this.docIdentidadStatus
        },
        // {
        //   className: 'text-center',
        //   data: null
        // }
      ],
      columnDefs: [
        {
          targets: 0,
          render: function (data: any) {

            let pipe = new DatePipe('en-US');
            let date = pipe.transform(new Date(data), 'yyyy-MM-dd')
            return date;
        }
        },
        // {
        //   targets: 3,
        //   render: function (data: any) {
        //     let pipe = new DatePipe('en-US');
        //     let date = pipe.transform(new Date(data), 'yyyy-MM-dd')
        //     return date;
        //   }
        // },
        // {
        //   targets: 4,
        //   render: function (data: any) {
        //     let pipe = new DatePipe('en-US');
        //     let date = pipe.transform(new Date(data), 'yyyy-MM-dd')
        //     return date;
        //   }
        // },
        // {
        //   targets: 5,
        //   render: function (data: any, type: any, row: any) {
        //       // return '<a href="javascript:void(0);" class="btn btn-sm btn-light btn-active-light-primary" data-watch-id="' + row.id + '" data-bs-toggle="modal" data-bs-target="#kt_modal_stacked_1">Ver' +
        //       //     '</a>';
        //       return '<a href="javascript:void(0);" class="mt-1 ms-3 me-3 mb-1" data-watch-id="' + row.id + '"  >    <svg data-bs-toggle="modal" data-bs-target="#kt_modal_see_personal_1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2677c5" class="bi bi-eye-fill" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg></a>'+
        //           '<a  href="javascript:void(0);" class="mt-1 ms-3 me-3 mb-1" data-work-id="' + row.id + '">    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#1a422c" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg></a>'+
        //           '<a  href="javascript:void(0);" class="mt-1 ms-3 me-3 mb-1" data-deleted-id="' + row.id + '">    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dd404f" class="bi bi-trash-fill" viewBox="0 0 16 16">' +
        //           '<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg></a>';
        //   }
        // }
      ]
    });

    this.table.on('draw', function () {
    });

  const that = this;
  let handleSearchDatatable = () => {
      const filterSearch = document.querySelector('[data-kt-customer-table-filter="search"]');
      // @ts-ignore
      filterSearch.addEventListener('keyup', function (e) {
          // @ts-ignore
          that.table.search(e.target.value).draw();
      });
  }
  handleSearchDatatable();
  this.table.on('click', '[data-watch-id]', function () {
      // @ts-ignore
      that.watchPersonal($(this).data('watch-id'));
  });
  this.table.on('click', '[dat_work-id]', function () {
    // @ts-ignore
    that.dataUpdatePersonal($(this).data('work-id'));
  });
  this.table.on('click', '[data-deleted-id]', function () {
    // @ts-ignore
    that.dataDeletedPersonal($(this).data('deleted-id'));
  });

  }

}
