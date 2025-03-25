import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { InfoProductoComponent } from '../../../component/info-producto/info-producto.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addinfoproduct',
  standalone: true,
  imports: [InfoProductoComponent, CommonModule],
  templateUrl: './addinfoproduct.component.html',
  styleUrl: './addinfoproduct.component.css',
})
export class AddinfoproductComponent {
  @ViewChild('tab1') tab1!: ElementRef;
  @ViewChild('tab2') tab2!: ElementRef;
  @ViewChild('tab3') tab3!: ElementRef;

  tapActive = 1;
  mostrarFormulario = false;

  constructor(private renderer: Renderer2) {}

  videoList: any[] = [];
  
  videos: { name: string; type: string; url: string }[] = [];


  selectedVideo: any = null;
  selectedVideoUrl: string = '';

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.videoList.push({
        file,
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
      });
    }
  }
  

  playVideo(video: any) {
    this.selectedVideo = video;
    if (video.file) {
      this.selectedVideoUrl = URL.createObjectURL(video.file);  // Usamos el 'file' si está disponible
    } else {
      this.selectedVideoUrl = video.url;  // Si no hay 'file', usamos el 'url' que se pasó
    }
  }
  
  

  removeVideo(video: any) {
    this.videoList = this.videoList.filter((v) => v !== video);
    if (this.selectedVideo === video) {
      this.selectedVideo = null;
      this.selectedVideoUrl = '';
    }
  }

  // Recibe el video grabado desde <app-info-producto>
  onVideoGrabado(video: File) {
    this.videoList.push(video);
  }

  // Drag & Drop
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  
  onDrop(event: DragEvent) {
    event.preventDefault();
  
    // Si se arrastra desde la PC
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      const url = URL.createObjectURL(file);
      console.log(file);
      this.videoList.push({
        file,
        name: file.name,
        type: file.type,
        url: url
      });
    }
  
    // Si se arrastra desde app-info-producto
    const videoData = event.dataTransfer?.getData("video/mp4");
    if (videoData) {
      const video = JSON.parse(videoData);
      console.log(video);
      this.videoList.push({
        file: video.file,       // Ahora pasamos el 'file' correctamente
        name: video.name,
        type: video.type,
        url: video.url
      });
    }
  
   // console.log(this.videoList);  // Verifica que los datos sean correctos
  }
  
  
  


    
  onDragStart(event: DragEvent, video: any) {
    event.dataTransfer?.setData("video/mp4", JSON.stringify({
      file: video.file,    
      name: video.name,
      type: video.type,
      url: video.url
    }));
  }
  



  toNext() {
    if (this.tapActive < 3) {
      this.tapActive = this.tapActive + 1;
      this.selectTap(this.tapActive);
    } else {
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
    } else if (tabIndex === 3) {
      this.renderer.addClass(this.tab3.nativeElement, 'active');
      this.renderer.removeClass(this.tab2.nativeElement, 'active');
      this.renderer.removeClass(this.tab1.nativeElement, 'active');
      this.tapActive = 3;
    }
  }
}
