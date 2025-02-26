import { Component } from '@angular/core';
import { InfoProductoComponent } from "../../component/info-producto/info-producto.component";

@Component({
  selector: 'app-createinfoproduct',
  standalone: true,
  imports: [InfoProductoComponent],
  templateUrl: './createinfoproduct.component.html',
  styleUrl: './createinfoproduct.component.css'
})
export class CreateinfoproductComponent {

}
