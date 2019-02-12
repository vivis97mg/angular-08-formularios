import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(.form) {
      border: 1px solid #ff0000;
    }
  `]
})
export class TemplateComponent {

  usuario:Object = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: '',
    sexo: null,
    acepta: false
  }

  paises = [
    {
      codigo: 'CRI',
      nombre: 'Costa Rica'
    },
    {
      codigo: 'ESP',
      nombre: 'España'
    },
    {
      codigo: 'COL',
      nombre: 'Colombia'
    },
    {
      codigo: 'EE.UU',
      nombre: 'Estados Unidos'
    }
  ]

  sexos:string[] = ['Masculino', 'Femenino', 'Sin definir']

  constructor() { }

  guardar( forma:NgForm ) {
    // console.log('Formulario posteado');
    // console.log("NgForm", forma);
    // console.log("valor forma", forma.value);
    // console.log("usuario", this.usuario);
  }

}
