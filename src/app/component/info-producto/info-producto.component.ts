import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-info-producto',
  standalone: true,
  imports: [],
  templateUrl: './info-producto.component.html',
  styleUrl: './info-producto.component.css'
})
export class InfoProductoComponent {



  @Output() videoGrabado = new EventEmitter<File>();
  
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('downloadLink') downloadLink!: ElementRef<HTMLAnchorElement>;

  videoFile!: File;

  mediaRecorder: any;
  recordedChunks: any[] = [];
  videoBlobUrl: string | null = null;

 
  startRecording() {
    this.videoElement.nativeElement.style.opacity = "0"; // Ocultar temporalmente el video

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      this.videoElement.nativeElement.srcObject = stream;
      this.videoElement.nativeElement.muted = true;

      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (event: { data: any; }) => this.recordedChunks.push(event.data);
      this.mediaRecorder.onstop = () => this.saveRecording();
      this.mediaRecorder.start();

      setTimeout(() => {
        this.videoElement.nativeElement.style.opacity = "1"; // Mostrar el video después de un pequeño delay
      }, 500);
    })
    .catch(err => {
      alert(err);
    });
  }
  
  
  stopRecording() {
    if (this.mediaRecorder) {
      let recordedChunks: Blob[] = [];

      // Guardar los datos de video cuando estén disponibles
      this.mediaRecorder.ondataavailable = (event: any) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      // Cuando la grabación se detiene
      this.mediaRecorder.onstop = () => {
        if (recordedChunks.length > 0) {
          // Crear un blob con los fragmentos grabados
          const recordedBlob = new Blob(recordedChunks, { type: "video/mp4" });

          // Crear una URL del video grabado
          const videoBlobUrl = URL.createObjectURL(recordedBlob);

          // Crear un archivo a partir del Blob
          this.videoFile = new File([recordedBlob], "video_grabado.mp4", { type: "video/mp4" });

          // Mostrar el video en el videoElement
          this.videoElement.nativeElement.muted = false;
          this.videoElement.nativeElement.src = videoBlobUrl;
          this.videoElement.nativeElement.controls = true;

          // Emitir al componente padre
          this.videoGrabado.emit(this.videoFile);

          // Activar el enlace de descarga
          this.enableDownloadLink(videoBlobUrl);
        }
      };

      // Detener la grabación
      this.mediaRecorder.stop();

      // Detener todos los tracks del stream
      const stream = this.videoElement.nativeElement.srcObject as MediaStream;
      if (stream && stream.getTracks) {
        stream.getTracks().forEach(track => track.stop());
      }

      this.videoElement.nativeElement.srcObject = null;
    }
  }

  // Activar el enlace de descarga
  enableDownloadLink(videoBlobUrl: string) {
    const downloadElement = this.downloadLink.nativeElement;
    downloadElement.href = videoBlobUrl;
    downloadElement.download = "video_grabado.mp4"; // Nombre del archivo para la descarga
    downloadElement.style.display = "inline-block"; // Asegurarse de que el enlace esté visible
  }


  
  
  onDragStart(event: DragEvent) {
    if (this.videoFile) {
      const videoFile = new File([this.videoFile], "video-grabado.mp4", { type: "video/mp4" });
      const videoData = JSON.stringify({
        file: videoFile,
        name: "video-grabado.mp4",
        type: "video/mp4",
        url: URL.createObjectURL(videoFile) // URL generada desde el Blob
      });
      event.dataTransfer?.setData("video/mp4", videoData);
    }
  }
  
  
 

  saveRecording() {
    const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
    this.videoBlobUrl = URL.createObjectURL(blob);
  
    // Asignar el video grabado al elemento de video
    this.videoElement.nativeElement.src = this.videoBlobUrl;
    this.videoElement.nativeElement.controls = true;
    this.videoElement.nativeElement.play();
  
    // Configurar el botón de descarga
    this.downloadLink.nativeElement.href = this.videoBlobUrl;
    this.downloadLink.nativeElement.download = 'video.webm';
  
    // Limpiar chunks grabados para futuras grabaciones
    this.recordedChunks = [];
  }
  

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.videoBlobUrl = URL.createObjectURL(file);
    }
  }

}
