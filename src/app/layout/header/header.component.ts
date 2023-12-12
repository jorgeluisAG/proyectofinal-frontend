import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  personalDataUser: any;
  imageNewUser: any;
  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.imageNewUser= (localStorage.getItem('imagUser')+'');
    this.personalDataUser = JSON.parse(localStorage.getItem('dataUser')+'');
    console.log(this.personalDataUser)
  }

  phofile(){
    // @ts-ignore
    let idUserAuthorized = JSON.parse(localStorage?.getItem('dataUser')).id;
    console.log(idUserAuthorized)
    this.router.navigate(['/perfil'])
    //this.router.navigate(['/perfil',this.authService.getUser().id]).then();
}

  logout() {
    this.authService.logout();
  }

}
