import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
      public authService: AuthService,
      public router: Router
  ) {
  }

  canActivate() {
      if (this.authService.isLogged()) {
          return true;
      } else {
          this.router.navigate(['/login']).then( r => {
              // console.log('NO AUTORIZADO');
          });
          return false;
      }
  }

}

