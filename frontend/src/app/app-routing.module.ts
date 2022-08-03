import { UserAuthGuard } from './user-auth.guard';
import { AgentAuthGuard } from './agent-auth.guard';
import { PromenalozinkeComponent } from './promenalozinke/promenalozinke.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { NekretninaComponent } from './nekretnina/nekretnina.component';
import { AdminComponent } from './admin/admin.component';
import { AgentComponent } from './agent/agent.component';
import { AuthAdminGuard } from './auth-admin.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'korisnik',component:KorisnikComponent,canActivate:[UserAuthGuard]},
  {path:'promenalozinke',component:PromenalozinkeComponent},
  {path: 'nekretnina/:id', component: NekretninaComponent,canActivate:[UserAuthGuard]},
  {path:'admin',component:AdminComponent,canActivate:[AuthAdminGuard]},
  {path:'agent',component:AgentComponent,canActivate:[AgentAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
