import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface AppConfig {
  urlConfig: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigServices {

  backendURL = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  async loadURL(): Promise<void> {
    // Se già inizializzato, non fare nulla
    if (this.backendURL() != null) return;

    // Carica config.json
    const cfg: AppConfig = await firstValueFrom(
      this.http.get<AppConfig>('config.json')
    );

    this.backendURL.set(cfg.urlConfig);
  }
}
