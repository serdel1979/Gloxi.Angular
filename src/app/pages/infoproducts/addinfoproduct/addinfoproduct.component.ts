import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { InfoProductoComponent } from "../../../component/info-producto/info-producto.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addinfoproduct',
  standalone: true,
  imports: [InfoProductoComponent, CommonModule],
  templateUrl: './addinfoproduct.component.html',
  styleUrl: './addinfoproduct.component.css'
})
export class AddinfoproductComponent {


  @ViewChild('tab1') tab1!: ElementRef;
  @ViewChild('tab2') tab2!: ElementRef;
  @ViewChild('tab3') tab3!: ElementRef;
 
  tapActive = 1;
  mostrarFormulario = false;

  constructor(private renderer: Renderer2) {}



  toNext() {
    if(this.tapActive < 3){
      this.tapActive = this.tapActive + 1;
      this.selectTap(this.tapActive);
    }else{
      this.tapActive = 1;
      this.selectTap(this.tapActive);
    }
  }


  selectTap(tabIndex: number) {
    if (tabIndex === 1) {
      this.renderer.addClass(this.tab1.nativeElement, 'active');
      this.renderer.removeClass(this.tab2.nativeElement, 'active');
      this.renderer.removeClass(this.tab3.nativeElement, 'active');
      this.tapActive = 1;
    } else if (tabIndex === 2) {
      this.renderer.addClass(this.tab2.nativeElement, 'active');
      this.renderer.removeClass(this.tab1.nativeElement, 'active');
      this.renderer.removeClass(this.tab3.nativeElement, 'active');
      this.tapActive = 2;
    }else if(tabIndex === 3){
      this.renderer.addClass(this.tab3.nativeElement, 'active');
      this.renderer.removeClass(this.tab2.nativeElement, 'active');
      this.renderer.removeClass(this.tab1.nativeElement, 'active');
      this.tapActive = 3;
    }
  }
  
  

}
