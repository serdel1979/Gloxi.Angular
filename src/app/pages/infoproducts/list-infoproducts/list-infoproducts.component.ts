import { Component } from '@angular/core';
import { InfoProductoComponent } from "../../../component/info-producto/info-producto.component";
import { Infoproducto } from '../../../interfaces/Infoproduct';

@Component({
  selector: 'app-list-infoproducts',
  standalone: true,
  imports: [InfoProductoComponent],
  templateUrl: './list-infoproducts.component.html',
  styleUrl: './list-infoproducts.component.css'
})
export class ListInfoproductsComponent {
  videoBlobUrl: string | null = null;

  infoproductos: Infoproducto[] = [
    {
      videoBlobUrl: 'URL_DEL_VIDEO_1',
      titulo: 'Curso de Angular Avanzado',
      descripcion: 'Aprende a construir aplicaciones Angular de alto rendimiento.',
      precio: 199.99
    },
    {
      videoBlobUrl: 'URL_DEL_VIDEO_2',
      titulo: 'Introducción a React',
      descripcion: 'Descubre los fundamentos de React y crea tu primera aplicación.',
      precio: 149.99
    },
    {
      videoBlobUrl: 'URL_DEL_VIDEO_3',
      titulo: 'Desarrollo de APIs con Node.js',
      descripcion: 'Construye APIs RESTful con Node.js y Express.',
      precio: 249.99
    },
    {
      videoBlobUrl: 'URL_DEL_VIDEO_1',
      titulo: 'Curso de Angular Avanzado',
      descripcion: 'Aprende a construir aplicaciones Angular de alto rendimiento.',
      precio: 199.99
    },
    {
      videoBlobUrl: 'URL_DEL_VIDEO_2',
      titulo: 'Introducción a React',
      descripcion: 'Descubre los fundamentos de React y crea tu primera aplicación.',
      precio: 149.99
    },
    {
      videoBlobUrl: 'URL_DEL_VIDEO_3',
      titulo: 'Desarrollo de APIs con Node.js',
      descripcion: 'Construye APIs RESTful con Node.js y Express.',
      precio: 249.99
    },
    {
      videoBlobUrl: 'URL_DEL_VIDEO_1',
      titulo: 'Curso de Angular Avanzado',
      descripcion: 'Aprende a construir aplicaciones Angular de alto rendimiento.',
      precio: 199.99
    },
    {
      videoBlobUrl: 'URL_DEL_VIDEO_2',
      titulo: 'Introducción a React',
      descripcion: 'Descubre los fundamentos de React y crea tu primera aplicación.',
      precio: 149.99
    },
    {
      videoBlobUrl: 'URL_DEL_VIDEO_3',
      titulo: 'Desarrollo de APIs con Node.js',
      descripcion: 'Construye APIs RESTful con Node.js y Express.',
      precio: 249.99
    },
  ];

}
