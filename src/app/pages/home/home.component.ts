import { Component } from '@angular/core';
import { NavBarComponent } from "../../shared/nav-bar/nav-bar.component";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  menu = [
    { nombre: 'Rango de precios', url: '#' },
    { nombre: 'Idioma', url: '#' },
    { nombre: 'Valoraciones', url: '#' },
    { nombre: 'Verificación de Gloxi', url: '#' },
    { nombre: 'Atención personalizada', url: '#' },
    { nombre: 'Directos', url: '#' },
    { nombre: 'Duración', url: '#' },
    { nombre: 'Infoproductos que más te gusta', url: '#' },
  ];
  infoproductos = [
    { id: 1, titulo: 'Producto 1', descripcion: 'Descripción del Producto 1', imagen: '' },
    { id: 2, titulo: 'Producto 2', descripcion: 'Descripción del Producto 2', imagen: '' },
    { id: 3, titulo: 'Producto 3', descripcion: 'Descripción del Producto 3', imagen: '' },
    { id: 4, titulo: 'Producto 4', descripcion: 'Descripción del Producto 4', imagen: '' },
    { id: 5, titulo: 'Producto 5', descripcion: 'Descripción del Producto 5', imagen: '' },
    { id: 6, titulo: 'Producto 6', descripcion: 'Descripción del Producto 6', imagen: '' },
    { id: 7, titulo: 'Producto 7', descripcion: 'Descripción del Producto 7', imagen: '' },
    { id: 8, titulo: 'Producto 8', descripcion: 'Descripción del Producto 8', imagen: '' },
    { id: 9, titulo: 'Producto 9', descripcion: 'Descripción del Producto 9', imagen: '' },
  ];
}
