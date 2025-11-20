import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  fileName: string = '';
  selectedFile?: File;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.fileName = '';
      this.selectedFile = undefined;
      return;
    }

    // Prendi il file selezionato
    this.selectedFile = input.files[0];
    this.fileName = this.selectedFile.name;

    console.log('File selezionato:', this.selectedFile);
    // Se vuoi, puoi chiamare subito il servizio:
    // this.upload()
  }

  upload(): void {
    if (!this.selectedFile) {
      console.warn('Nessun file selezionato');
      return;
    }
  }
}
