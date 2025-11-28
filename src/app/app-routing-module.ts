import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './componenti/dashboard/dashboard';
import { Famiglia } from './componenti/famiglia/famiglia';
import { Artisti } from './componenti/artisti/artisti';
import { Home } from './componenti/home/home';
import { authGuard } from './auth/auth-guard';
import { authAdminGuard } from './auth/auth-admin-guard';
import { Carello } from './componenti/carello/carello';
import { GestioneAccount } from './componenti/gestione-account/gestione-account';
import { Prodotti } from './componenti/prodotti/prodotti';
import { Notfound } from './notfound/notfound';
import { Ordine } from './componenti/ordine/ordine';

const routes: Routes = [
  {path:'', redirectTo:'dash', pathMatch:'full'},
  {path:'dash', component:Dashboard , children: [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home' , component:Home},
    {path:'carello' , component:Carello , canActivate:[authGuard]},
    {path:'ordine' , component:Ordine , canActivate:[authGuard]},
    {path:'account' , component:GestioneAccount, canActivate: [ authGuard , authAdminGuard]},
    {path:'famiglia' , component:Famiglia, canActivate: [ authGuard , authAdminGuard]},
    {path:'artisti', component:Artisti, canActivate:[ authGuard, authAdminGuard]},
    {path:'prodotti', component:Prodotti, canActivate:[ authGuard, authAdminGuard]}
  ]},
  { path: '404', component: Notfound},
  { path: '**', redirectTo:'404'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
