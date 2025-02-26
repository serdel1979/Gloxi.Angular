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

  mediaRecorder: any;
  recordedChunks: any[] = [];
  videoBlobUrl: string | null = null;

  startRecording() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      this.videoElement.nativeElement.srcObject = stream;
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (event: { data: any; }) => this.recordedChunks.push(event.data);
      this.mediaRecorder.onstop = () => this.saveRecording();
      this.mediaRecorder.start();
    });
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
  
      const stream = this.videoElement.nativeElement.srcObject as MediaStream;
      if (stream && stream.getTracks) {
        stream.getTracks().forEach(track => track.stop());
      }
  
      this.videoElement.nativeElement.srcObject = null;
    }
  }
  

  saveRecording() {
    const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
    this.videoBlobUrl = URL.createObjectURL(blob);
    this.downloadLink.nativeElement.href = this.videoBlobUrl;
    this.downloadLink.nativeElement.download = 'video.webm';
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.videoBlobUrl = URL.createObjectURL(file);
    }
  }

}
