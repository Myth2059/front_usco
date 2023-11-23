import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.servicese';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private dataService: DataService,private cookieService: CookieService) {}
  
  cedula!: number;
  password!: string;
  isLoading: boolean = false;
  error:string = "";

  async Login() {
    this.isLoading = true;
    const response = await this.dataService.login(this.cedula, this.password);

    const fakeLoading = (msg: string) => {
      setTimeout(() => {
        this.isLoading = false;
        console.log(msg);
      }, 2000);
    };

    if (response.code == 1) {
      this.cookieService.set("cedula",""+response.id);
      this.cookieService.set("token",""+response.msg);
      this.cookieService.set("name",""+response.user);
      this.cookieService.set("rol",""+response.rol);
      fakeLoading('Excelent');
    } else {
      this.error=response.msg;     
      fakeLoading('Error');
    }
  }
}
