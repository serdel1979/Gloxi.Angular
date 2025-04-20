import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { InfoProductoComponent } from '../../../component/info-producto/info-producto.component';
import { CommonModule } from '@angular/common';
import { VideoItem } from '../../../interfaces/videItem';
import { FormsModule } from '@angular/forms';
import { InfoproductService } from '../../../services/infoproduct.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-addinfoproduct',
  standalone: true,
  imports: [InfoProductoComponent, CommonModule, FormsModule],
  templateUrl: './addinfoproduct.component.html',
  styleUrl: './addinfoproduct.component.css',
})
export class AddinfoproductComponent {
  @ViewChild('tab1') tab1!: ElementRef;
  @ViewChild('tab2') tab2!: ElementRef;
  @ViewChild('tab3') tab3!: ElementRef;

  tapActive = 1;
  mostrarFormulario = false;

  formDataModel = {
    titulo: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    grupoId: '',
    archivo: null as File | null,
    videos: [] as VideoItem[]
  };
  

  constructor(private renderer: Renderer2, private infoproductService: InfoproductService) {}

 // videoList: any[] = [];
  videoList: VideoItem[] = [];

  videos: { name: string; type: string; url: string }[] = [];

  selectedVideo: any = null;
  selectedVideoUrl: string = '';

  uploadProgress: number = 0;
  subiendo: boolean = false;


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

  /*
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
    */

  removeVideo(video: VideoItem) {
    if (video.url) {
      URL.revokeObjectURL(video.url);
    }
  
    this.videoList = this.videoList.filter((v) => v !== video);
  }
  




  onArchivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.formDataModel.archivo = input.files[0];
    }
  }
  


  onVideoGrabado(video: File) {
    const videoUrl = URL.createObjectURL(video);
  
    const videoItem: VideoItem = {
      file: video,
      name: video.name,
      type: video.type,
      url: videoUrl,
    };
  
    this.videoList.push(videoItem);
  }
  

  // Drag & Drop
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  /*
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
  */

  onDrop(event: DragEvent) {
    event.preventDefault();
  
    // Si se arrastra un archivo desde la PC
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      const url = URL.createObjectURL(file);
  
      const videoItem: VideoItem = {
        file,
        name: file.name,
        type: file.type,
        url
      };
  
      this.videoList.push(videoItem);
      console.log("Archivo agregado desde la PC:", file);
    }
  
    // Si se arrastra un video desde otro componente
    const videoData = event.dataTransfer?.getData("video/mp4");
    const videoInfo = event.dataTransfer?.getData("video/info");
  
    if (videoData) {
      const video = JSON.parse(videoData);
  
      const videoItem: VideoItem = {
        file: video.file ?? null, // Aseguramos compatibilidad
        name: video.name,
        type: video.type,
        url: video.url
      };
  
      this.videoList.push(videoItem);
      console.log("Archivo agregado desde video-grabado.mp4:", video);
    } else if (videoInfo) {
      const video = JSON.parse(videoInfo);
  
      const videoItem: VideoItem = {
        file: null,  // No tenemos acceso al archivo real
        name: video.name,
        type: video.type,
        url: video.url
      };
  
      this.videoList.push(videoItem);
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
  

  prepararFormularioParaEnvio(model: typeof this.formDataModel): FormData {
    const formData = new FormData();
  
    formData.append('titulo', model.titulo);
    formData.append('descripcion', model.descripcion);
    formData.append('precio', model.precio.toString());
    formData.append('categoria', model.categoria);
    formData.append('grupoId', model.grupoId);
  
    if (model.archivo) {
      formData.append('archivo', model.archivo, model.archivo.name);
    }

  
    model.videos.forEach((video, index) => {
      if (video.file instanceof File) {
        formData.append(`videos[${index}]`, video.file, video.name);
  
        if (video.titulo) {
          formData.append(`titulos[${index}]`, video.titulo);
        }
        if (video.descripcion) {
          formData.append(`descripciones[${index}]`, video.descripcion);
        }
      }
    });
  
    return formData;
  }
  

  prepararVideosParaEnvio(videoList: VideoItem[]): FormData {
    const formData = new FormData();
  
    videoList.forEach((video, index) => {
      if (video.file instanceof File) {
        // Agrega el archivo
        formData.append(`videos[${index}]`, video.file, video.name);
  
        // Agrega los campos extra como título y descripción (opcional)
        if (video.titulo) {
          formData.append(`titulos[${index}]`, video.titulo);
        }
        if (video.descripcion) {
          formData.append(`descripciones[${index}]`, video.descripcion);
        }
      } else {
        console.warn(`El video "${video.name}" no tiene un archivo válido y no será enviado.`);
      }
    });

  
    return formData;
  }


  async convertirBlobsEnFiles(videoList: VideoItem[]): Promise<VideoItem[]> {
    const resultados: VideoItem[] = [];
  
    for (const video of videoList) {
      if (!(video.file instanceof File) && video.url.startsWith("blob:")) {
        try {
          const response = await fetch(video.url);
          const blob = await response.blob();
          const file = new File([blob], video.name, { type: video.type });
  
          resultados.push({
            ...video,
            file: file // Aquí se guarda el File generado correctamente
          });
        } catch (error) {
          console.error("Error al convertir blob en file:", error);
          resultados.push(video); // En caso de error, se conserva el original
        }
      } else {
        resultados.push(video); // Ya es válido
      }
    }
  
    return resultados;
  }
  
  
  async enviarInfoproducto() {
    this.uploadProgress = 0;
    this.subiendo = true;

    this.formDataModel.videos = await this.convertirBlobsEnFiles(this.videoList);
    const formData = this.prepararFormularioParaEnvio(this.formDataModel);
  
    this.infoproductService.uploadInfoproduct(formData).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((100 * event.loaded) / (event.total ?? 1));
          this.uploadProgress = percentDone;
        } else if (event.type === HttpEventType.Response) {
          alert("Infoproducto subido!!!");
          this.subiendo = false;
          this.uploadProgress = 100;
          
        }
      },
      error: (error) => {
        this.subiendo = false;
        this.uploadProgress = 100;
        console.log(error);
      }
    });
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
