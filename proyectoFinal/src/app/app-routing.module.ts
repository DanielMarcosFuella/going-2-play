import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';

const routes: Routes = [
  {path: 'header', component:HeaderComponent},
  {path: 'footer', component:FooterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
