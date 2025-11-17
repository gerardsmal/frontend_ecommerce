import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './componenti/login/login';
import { Register } from './componenti/register/register';
import { Dashboard } from './componenti/dashboard/dashboard';
import { ConfigServices } from './services/config-services';
import { Famiglia } from './componenti/famiglia/famiglia';
import { Artisti } from './componenti/artisti/artisti';
import { Home } from './componenti/home/home';
import { Carello } from './componenti/carello/carello';
import { GestioneAccount } from './componenti/gestione-account/gestione-account';
import { Account } from './dialogs/account/account';
import { ConfirmDialog } from './dialogs/confirm-dialog/confirm-dialog';
import { Prodotti } from './componenti/prodotti/prodotti';
import { FamigliaUpdate } from './dialogs/famiglia-update/famiglia-update';
import { ArtistUpdate } from './dialogs/artist-update/artist-update';
import { ProdottiUpdate } from './dialogs/prodotti-update/prodotti-update';
import { AddSupporto } from './dialogs/add-supporto/add-supporto';



@NgModule({
  declarations: [
    App,
    Login,
    Register,
    Dashboard,
    Famiglia,
    Artisti,
    Home,
    Carello,
    GestioneAccount,
    Account,
    ConfirmDialog,
    Prodotti,
    FamigliaUpdate,
    ArtistUpdate,
    ProdottiUpdate,
    AddSupporto,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatRadioModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatExpansionModule


  ],
  providers: [
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule {
  constructor(private configService: ConfigServices) {
    this.configService.loadURL();
  }
}
