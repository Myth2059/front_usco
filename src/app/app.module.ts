import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
/**NG MODULES */
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IndexComponent } from './index/index.component';
import { MenuNavComponent } from './Components/menu-nav/menu-nav.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { AdministracionComponent } from './administracion/administracion.component';
import { AccordionModule } from 'primeng/accordion';
import { PasswordModule } from 'primeng/password';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CardModule } from 'primeng/card';
import { InformesComponent } from './informes/informes.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PreviewModalComponent } from './Components/preview-modal/preview-modal.component';
import { DialogModule } from 'primeng/dialog';
import { EditableFieldComponent } from './Components/editable-field/editable-field.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    MenuNavComponent,
    AdministracionComponent,
    InformesComponent,
    PreviewModalComponent,
    EditableFieldComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TabMenuModule,
    AccordionModule,
    PasswordModule,
    InputNumberModule,
    DropdownModule,
    ReactiveFormsModule,
    CascadeSelectModule,
    CardModule,
    ProgressSpinnerModule,
    ToastModule,
    InputTextareaModule,
    DialogModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

