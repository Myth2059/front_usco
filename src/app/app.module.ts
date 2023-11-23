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
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { TabMenuModule } from 'primeng/tabmenu';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    MenuNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TabMenuModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

