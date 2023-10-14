import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  tipoFacturas: any;
  isRegisteredSiat = false;
  role: any;
  constructor(
      public authService: AuthService,
  ) {
  }

  ngOnInit(): void {
           this.getSiatByBusiness();
    this.role = localStorage.getItem('role')
    console.log(this.role);
  }

  getSiatByBusiness() {

  }

  titleCase(title: String) {
    title = title.toLowerCase();
    const titleArray = title.split(' ');
    for (var i = 0; i < titleArray.length; i++) {
      if ( titleArray[i] !== "de"  && titleArray[i] !== "en" && titleArray[i] !== "y"  && titleArray[i] !== "el"){
          titleArray[i] = titleArray[i].charAt(0).toUpperCase() + titleArray[i].slice(1);
      } if ( titleArray[i] === "Zf" || titleArray[i] === "Gn" || titleArray[i] === "Glp" || titleArray[i] === "Gnv" || titleArray[i] === "Iehd" ||
    titleArray[i] === "Sdcf" || titleArray[i] === "Ice" || titleArray[i] === "Zf" ){
        titleArray[i] = titleArray[i].toUpperCase();

      }


    }
    return titleArray.join(' ');
  }


  paymentRouth(){
    location.href="/home";
  }

  configRouth(id: String){
    location.href="/business-config/"+id;
  }

  logout() {
      this.authService.logout();
  }

}
