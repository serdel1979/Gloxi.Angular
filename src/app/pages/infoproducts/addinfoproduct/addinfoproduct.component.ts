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
    
    // Si hay archivos seleccionados
    if (files.length > 0) {
      const file = files[0]; // Puedes manejar múltiples archivos si es necesario
  
      // Crear una URL de objeto para el archivo
      const videoUrl = URL.createObjectURL(file);
      
      // Agregar el video a la lista de videos
      this.videoList.push({
        name: file.name,
        url: videoUrl,
        file: file,
        type: file.type
      });
    }
  }
  

  playVideo(video: any) {
    const videoElement = document.createElement('video');
    videoElement.src = video.url;
    videoElement.controls = true;
    document.body.appendChild(videoElement);  // Puedes agregarlo en cualquier lugar del DOM
    videoElement.play();
  }

  removeVideo(video: any) {
    // Revocar la URL antes de eliminar el video
    if (video.url) {
      URL.revokeObjectURL(video.url);
    }

    this.videoList = this.videoList.filter((v) => v !== video);
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
  
    // Si se arrastra un archivo desde la PC
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      const url = URL.createObjectURL(file);
  
      this.videoList.push({
        file,
        name: file.name,
        type: file.type,
        url
      });
      console.log("Archivo agregado desde la PC:", file);
    }
  
    // Si se arrastra un video desde `app-info-producto` o el componente de video
    const videoData = event.dataTransfer?.getData("video/mp4");
    const videoInfo = event.dataTransfer?.getData("video/info");
  
    if (videoData) {
      const video = JSON.parse(videoData);
      this.videoList.push({
        file: video.file,  // Ahora pasamos el 'file' correctamente
        name: video.name,
        type: video.type,
        url: video.url
      });
      console.log("Archivo agregado desde video-grabado.mp4:", video);
    } else if (videoInfo) {
      const video = JSON.parse(videoInfo);
      this.videoList.push({
        file: null,  // No tenemos acceso al archivo real, solo al URL
        name: video.name,
        type: video.type,
        url: video.url
      });
      console.log("Archivo agregado desde video-info:", video);
    }
  }
  
  
  

  onDragStart(event: DragEvent, video?: any) {
    if (video) {
      // Si es un video de la lista
      console.log("Iniciando arrastre de video desde la lista:", video);
  
      if (event.dataTransfer) {
        event.dataTransfer.setData("video/info", JSON.stringify({
          name: video.name,
          type: video.type,
          url: video.url
        }));
      }
    }
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
