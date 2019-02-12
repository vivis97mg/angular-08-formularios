import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma:FormGroup;
  forma1:FormGroup;

  usuario:Object = {
    nombrecompleto: {
      nombre: 'vivis',
      apellido: 'more'
    },
    correo1: 'vi@gmail.com',
    // pasatiempos:['correr', 'dormir', 'comer']
  }

  constructor() { 

      this.forma = new FormGroup( {

        // Primer forma objeto pequeño
        'nombre': new FormControl('', [
          Validators.required,
          Validators.minLength(2)
         ]),

        'apellido': new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        
        'correo': new FormControl('', [
          Validators.required, 
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
        ])

      })

      this.forma1 = new FormGroup ({
         // Segundo forma objeto grande
         'nombrecompleto': new FormGroup({
          'nombre': new FormControl('', [
            Validators.required,
            Validators.minLength(2)
          ]),

          'apellido': new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            this.noPalabra
          ])
        }),
  
        'correo1': new FormControl('', [
          Validators.required, 
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
        ]),

        'pasatiempos': new FormArray([ 
          new FormControl('correr', Validators.required)
        ]),

        'username': new FormControl('',
          Validators.required,
          this.existeUsuario
        ),

        'pass1': new FormControl('', [
          Validators.required,
          Validators.minLength(4)
         ]),

        'pass2': new FormControl()

      })

      // objeto grande
      // this.forma1.setValue( this.usuario );

      // Objeto grande
      this.forma1.controls['pass2'].setValidators([
        Validators.required,
        this.noIgual.bind( this.forma1 )
      ]);

      this.forma1.controls['username'].valueChanges.subscribe( data => {
        console.log( data );
      });

      this.forma1.controls['username'].statusChanges.subscribe( data => {
        console.log( data );
      })

      // console.log( this.usuario );

  }

  // Objeto pequeño
  guardarCambios() {
    console.log( this.forma );
    console.log( this.forma.value );
    // this.forma.reset( {
    //   nombrecompleto: {
    //     nombre: '',
    //     apellido: '',
    //   },
    //   correo: ''
    // } );
  }

  // Objeto grande
  agregarPasatiempo() {
     (<FormArray> this.forma1.controls['pasatiempos'] ).push(
      new FormControl('', Validators.required)
     )
  }

  noPalabra( control: FormControl ): { [s:string]:boolean } {
    if ( control.value == "moreno") {
      return {
        noPalabra:true
      }
    }

    return null;
  }

  noIgual( control: FormControl ): { [s:string]:boolean } {

    // console.log(this);

    let forma1:any = this;
    if ( control.value !== forma1.controls['pass1'].value ) {
      return {
        noigual:true
      }
    }

    return null;
  }

  existeUsuario( control: FormControl ): Promise <any> | Observable <any> {
    let promesa = new Promise (
      (resolve, reject) => {
        setTimeout( () => {
          if ( control.value === "strider" ) {
            resolve({
              existe:true
            })
          } else {
            resolve(null)
          }
        }, 3000)
      }
    )

    return promesa; 
  } 

  guardarCambios1() {
    console.log( this.forma1 );
    // console.log( this.forma1.value );
    // this.forma1.reset( {
    //   nombrecompleto: {
    //     nombre: '',
    //     apellido: '',
    //   },
    //   correo1: ''
    // } );


  }

}
