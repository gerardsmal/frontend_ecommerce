import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './componenti/dashboard/dashboard';
import { Login } from './componenti/login/login';
import { Register } from './componenti/register/register';
import { Famiglia } from './componenti/famiglia/famiglia';
import { Artisti } from './componenti/artisti/artisti';
import { Home } from './componenti/home/home';
import { authGuard } from './auth/auth-guard';
import { authAdminGuard } from './auth/auth-admin-guard';
import { Carello } from './componenti/carello/carello';
import { GestioneAccount } from './componenti/gestione-account/gestione-account';
import { Prodotti } from './componenti/prodotti/prodotti';

const routes: Routes = [
  {path:'', redirectTo:'dash', pathMatch:'full'},
  {path:'dash', component:Dashboard , children: [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home' , component:Home},
    {path:'carello' , component:Carello , canActivate:[authGuard]},
    {path:'account' , component:GestioneAccount, canActivate: [ authGuard , authAdminGuard]},
    {path:'famiglia' , component:Famiglia, canActivate: [ authGuard , authAdminGuard]},
    {path:'artisti', component:Artisti, canActivate:[ authGuard, authAdminGuard]},
    {path:'prodotti', component:Prodotti, canActivate:[ authGuard, authAdminGuard]}
  ]},
  {path:'login', component:Login},
  {path:'register', component:Register}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
