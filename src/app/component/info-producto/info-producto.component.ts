import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-info-producto',
  standalone: true,
  imports: [],
  templateUrl: './info-producto.component.html',
  styleUrl: './info-producto.component.css'
})
export class InfoProductoComponent {

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('downloadLink') downloadLink!: ElementRef<HTMLAnchorElement>;

  mediaRecorder!: MediaRecorder;
  recordedChunks: Blob[] = [];
  stream!: MediaStream;

  async startRecording() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.videoElement.nativeElement.srcObject = this.stream;
      this.videoElement.nativeElement.play(); // Inicia la vista previa

      this.mediaRecorder = new MediaRecorder(this.stream);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.mediaRecorder.onstop = () => {
      const videoBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
      const videoURL = URL.createObjectURL(videoBlob);

      // Cargar el video grabado en el mismo <video>
      this.videoElement.nativeElement.srcObject = null; // Detener la transmisión en vivo
      this.videoElement.nativeElement.src = videoURL;
      this.videoElement.nativeElement.controls = true; // Activar controles de reproducción

      // Preparar el enlace de descarga
      this.downloadLink.nativeElement.href = videoURL;
      this.downloadLink.nativeElement.download = 'video.webm';

      // Limpiar la grabación anterior
      this.recordedChunks = [];

      // Detener la cámara
      this.stream.getTracks().forEach(track => track.stop());
    };
  }

}
