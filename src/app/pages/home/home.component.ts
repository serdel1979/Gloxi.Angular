import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../../shared/nav-bar/nav-bar.component";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { NgClass } from '@angular/common';
import { InfoproductService } from '../../services/infoproduct.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  

  infoproductos: any[] = [];
  
  constructor(private infoproductService: InfoproductService) {}

  ngOnInit(): void {
    this.loadInfoproducts();
  }

  loadInfoproducts(): void {
    this.infoproductService.getInfoproducts().subscribe(response => {
      this.infoproductos = response.data.map((info: any) => ({
        ...info,
        showVideo: false
      }));
    });
    
  }
  
  
  menu = [
    { nombre: 'Rango de precios', url: '#', active: true },
    { nombre: 'Idioma', url: '#', active: true },
    { nombre: 'Valoraciones', url: '#' , active: true},
    { nombre: 'Verificación de Gloxi', url: '#', active: true },
    { nombre: 'Atención personalizada', url: '#', active: true },
    { nombre: 'Directos', url: '#', active: true },
    { nombre: 'Duración', url: '#', active: true },
    { nombre: 'Infoproductos que más te gusta', url: '#' , active: true},
  ];
  /*
  infoproductos = [
    { id: 1, titulo: 'Producto 1', descripcion: 'Descripción del Producto 1', imagen: '../images/10677931_aac77.gif' },
    { id: 2, titulo: 'Producto 2', descripcion: 'Descripción del Producto 2', imagen: '../images/giphy-3.gif' },
    { id: 3, titulo: 'Producto 3', descripcion: 'Descripción del Producto 3', imagen: '../images/giphy.gif' },
    { id: 4, titulo: 'Producto 4', descripcion: 'Descripción del Producto 4', imagen: '../images/HIsT.gif' },
    { id: 5, titulo: 'Producto 5', descripcion: 'Descripción del Producto 5', imagen: '../images/insideout-joy.gif' },
    { id: 6, titulo: 'Producto 6', descripcion: 'Descripción del Producto 6', imagen: '../images/Nipq.gif' },
    { id: 7, titulo: 'Producto 7', descripcion: 'Descripción del Producto 7', imagen: '../images/que-es-gifs.gif' },
    { id: 8, titulo: 'Producto 8', descripcion: 'Descripción del Producto 8', imagen: '../images/source.gif' },
    { id: 9, titulo: 'Producto 9', descripcion: 'Descripción del Producto 9', imagen: '../images/wrQ.gif' },
  ];
*/

isCollapsed: any;
}
