import { Component, OnInit } from '@angular/core';
import { InfoproductService } from '../../services/infoproduct.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

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



  
}
