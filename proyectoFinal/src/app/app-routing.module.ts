import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminPartidosComponent } from './pages/admin-partidos/admin-partidos.component';
import { AdminTeamsComponent } from './pages/admin-teams/admin-teams.component';
import { AdminTorneosComponent } from './pages/admin-torneos/admin-torneos.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { DetallePartidoComponent } from './pages/detalle-partido/detalle-partido.component';
import { DetalleTorneoComponent } from './pages/detalle-torneo/detalle-torneo.component';
import { EquiposComponent } from './pages/equipos/equipos.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PerfilTeamsComponent } from './pages/perfil-teams/perfil-teams.component';
import { PerfilUserComponent } from './pages/perfil-user/perfil-user.component';
import { TorneosComponent } from './pages/torneos/torneos.component';

const routes: Routes = [
  {path: '', component:LandingComponent},
  {path: 'main', component:AppComponent},
  {path: 'detalle-torneo', component:DetalleTorneoComponent},
  {path: 'torneos', component:TorneosComponent},
  {path: 'header', component:HeaderComponent},
  {path: 'footer', component:FooterComponent},
  {path: 'admin-users', component:AdminUsersComponent},
  {path: 'admin-teams', component:AdminTeamsComponent},
  {path: 'equipos', component:EquiposComponent},
  {path: 'admin-torneos', component: AdminTorneosComponent},
  {path: 'detalle-partido', component:DetallePartidoComponent},
  {path: 'admin-partidos', component:AdminPartidosComponent},
  {path: 'perfil-user', component:PerfilUserComponent},
  {path: 'perfil-equipo', component:PerfilTeamsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
