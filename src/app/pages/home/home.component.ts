import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  datos: any[];

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getList();

  }

  getList(){

    this.usuarioService.getAllUser()
    .subscribe((respuesta: HttpResponse<any>) =>{
      console.log(respuesta.body);
      this.datos=respuesta.body;
    })
    console.log(this.datos);
  }


}
