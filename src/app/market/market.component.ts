import { Component, OnInit } from '@angular/core';
import { ServiciohttpService } from '../serviciohttp.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerTiendas();
  }

  constructor(private httpservicio: ServiciohttpService) {

  }


  nuevoProducto: string = '';
  nuevaTienda: string = '';
  nuevoPrecio: number = 0;

  editarControl: boolean = false;
  productosControl: boolean = false;
  tiendasControl: boolean = false;
  nombreProducto: string = '';
  nuevoValor: number = 0;
  mensaje: string = '';
  registros: { id: number, producto: string, tienda: string, precio: number }[] | [] = [];
  editValue: { id?: number, producto?: string, tienda?: string, precio?: number } = {};
  tiendas: string[] = [];
  productos: string[] = [];

  buscarProducto() {

    this.mensaje = 'Buscando ...';

    this.httpservicio.Get('api/market/obtener/' + this.nombreProducto)
      .subscribe(
        {
          next: (resultado) => {
            this.registros = resultado;
            this.mensaje = '';

          },
          error: (err) => {
            alert('Se ha presentado un error');
            console.log(err);
            this.mensaje = '';

          }
        }
      );
  }

  editarProducto(value: object) {
    this.editValue = value;

    this.editarControl = true;

  }

  editarProductoApi() {
    this.editValue.precio = this.nuevoValor;

    this.httpservicio.Post('api/market/actualizar', this.editValue)
      .subscribe(
        {
          next: (resultado) => {
            alert(resultado);

            setTimeout(() => {
              this.buscarProducto();
            }, 3000);

            this.editarControl = false;

          },
          error: (err) => {
            alert('Se ha presentado un error');
            console.log(err);
            this.editarControl = false;


          }
        }
      );
  }

  borrarProductoApi(value: object) {

    this.httpservicio.Post('api/market/borrar', value)
      .subscribe(
        {
          next: (resultado) => {
            alert(resultado);

            setTimeout(() => {
              this.buscarProducto();
            }, 3000);

          },
          error: (err) => {
            alert('Se ha presentado un error');
            console.log(err);


          }
        }
      );
  }

  obtenerProductos() {

    this.httpservicio.Get('api/market/productos')
      .subscribe(
        {
          next: (resultado) => {
            this.productos = resultado;
            this.productosControl = true;

          },
          error: (err) => {
            alert('Se ha presentado un error');
            console.log(err);

          }
        }
      );

  }

  obtenerTiendas() {

    this.httpservicio.Get('api/market/tiendas')
      .subscribe(
        {
          next: (resultado) => {
            this.tiendas = resultado;
            this.tiendasControl = true;

          },
          error: (err) => {
            alert('Se ha presentado un error');
            console.log(err);

          }
        }
      );

  }

  crearRegistro() {

    let nuevoRegistro = {
      id: 0,
      producto: this.nuevoProducto,
      tienda: this.nuevaTienda,
      precio: this.nuevoPrecio
    };

    this.httpservicio.Post('api/market/crear', nuevoRegistro)
      .subscribe(
        {
          next: (resultado) => {
            alert(resultado);

            this.nombreProducto = this.nuevoProducto;
            setTimeout(() => {
              this.buscarProducto();
            }, 3000);

          },
          error: (err) => {
            alert('Se ha presentado un error');
            console.log(err);


          }
        }
      );



  }



}
