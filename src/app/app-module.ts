import { LOCALE_ID, NgModule, APP_INITIALIZER, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export function initConfig(config: ConfigServices) {
  return () => config.loadURL();  // Angular aspetta la Promise
}
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
import { MatBadgeModule } from '@angular/material/badge';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';



import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
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
import { LoginDialog } from './dialogs/login-dialog/login-dialog';
import { RegistrazioneDialog } from './dialogs/registrazione-dialog/registrazione-dialog';
import { Notfound } from './notfound/notfound';
import { ProdottoDetaglio } from './dialogs/prodotto-detaglio/prodotto-detaglio';

import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { AddRowConfirm } from './dialogs/add-row-confirm/add-row-confirm';
import { Ordine } from './componenti/ordine/ordine';
import { OderAnteprima } from './dialogs/oder-anteprima/oder-anteprima';

registerLocaleData(localeIt);


@NgModule({
  declarations: [
    App,
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
    LoginDialog,
    RegistrazioneDialog,
    Notfound,
    ProdottoDetaglio,
    AddRowConfirm,
    Ordine,
    OderAnteprima,

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
    MatExpansionModule,
    MatBadgeModule,
    MatStepperModule,
    MatCheckboxModule


  ],
  providers: [
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    { provide: LOCALE_ID, useValue: 'it-IT' },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigServices],
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule {
}

