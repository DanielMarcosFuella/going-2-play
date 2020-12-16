import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TorneosComponent } from './pages/torneos/torneos.component';
import { DetalleTorneoComponent } from './pages/detalle-torneo/detalle-torneo.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AdminTeamsComponent } from './pages/admin-teams/admin-teams.component';
import { DetallePartidoComponent } from './pages/detalle-partido/detalle-partido.component';
import { AdminPartidosComponent } from './pages/admin-partidos/admin-partidos.component';
import { TeamComponent } from './pages/team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    TorneosComponent,
    DetalleTorneoComponent,    
    FooterComponent,
    HeaderComponent,
    AdminUsersComponent,
    LandingComponent,
    AdminTeamsComponent,
    DetallePartidoComponent,
    AdminPartidosComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
