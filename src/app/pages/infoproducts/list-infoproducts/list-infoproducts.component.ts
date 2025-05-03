import { Component, OnInit } from '@angular/core';
import { InfoProductoComponent } from "../../../component/info-producto/info-producto.component";
import { Infoproducto } from '../../../interfaces/Infoproduct';
import { Router } from '@angular/router';
import { InfoproductService } from '../../../services/infoproduct.service';

@Component({
  selector: 'app-list-infoproducts',
  standalone: true,
  imports: [InfoProductoComponent],
  templateUrl: './list-infoproducts.component.html',
  styleUrl: './list-infoproducts.component.css'
})
export class ListInfoproductsComponent implements OnInit{
  videoBlobUrl: string | null = null;


  
  infoproductos: any[] = [];

  constructor(private router: Router, private infoproductService: InfoproductService){}

  ngOnInit(): void {
    this.loadInfoproducts();
  }

  loadInfoproducts(): void {
    this.infoproductService.getMyInfoproducts().subscribe(response => {
      this.infoproductos = response.data.map((info: any) => ({
        ...info,
        showVideo: false
      }));
    });
    
  }
  





  addInfoProduct(){
    this.router.navigate(['/infoproducts/add']);
  }

}
