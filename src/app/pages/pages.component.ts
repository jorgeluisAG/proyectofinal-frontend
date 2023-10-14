import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var KTApp: any;
declare var KTUtil: any;
declare var KTMenu: any;
declare var KTToggle: any;
declare var KTScroll: any;
declare var KTDrawer: any;
declare var KTScrolltop: any;
declare var KTLayoutAside: any;
declare var KTLayoutToolbar: any;
declare var KTSticky: any;
declare var KTSwapper: any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        KTToggle.createInstances();
        KTMenu.createInstances();
        KTDrawer.createInstances();
        KTScroll.createInstances();
        KTScrolltop.createInstances();
        KTSticky.createInstances();
        KTSwapper.createInstances();
        KTApp.init();
        KTLayoutAside.init();
        KTLayoutToolbar.init();
    }
    handleToggle() {
    }

}
