import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TorneosComponent } from './pages/torneos/torneos.component';
import { DetalleTorneoComponent } from './pages/detalle-torneo/detalle-torneo.component';

@NgModule({
  declarations: [
    AppComponent,
    TorneosComponent,
    DetalleTorneoComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
