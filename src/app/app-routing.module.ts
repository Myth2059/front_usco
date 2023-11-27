import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { loggedOnlyGuard, loginGuard } from './logged-only.guard';
import { PdfMakerComponent } from './pdfMaker/pdfMaker.component';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'administracion', component:AdministracionComponent,canActivate:[loginGuard]},
  {path:'', component:IndexComponent,canActivate:[loginGuard]},
  {path:'informes',component:PdfMakerComponent,canActivate:[loginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
