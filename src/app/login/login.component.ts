// Importar módulos y servicios necesarios de Angular
import { Component } from '@angular/core';
import { DataService } from '../services/data.servicese';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

// Decorador del componente
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {
  // Constructor del componente, inyecta los servicios necesarios
  constructor(
    private dataService: DataService,
    private router: Router,
    private messageService: MessageService
  ) {}

  // Propiedades del componente
  cedula!: number;
  password!: string;
  isLoading: boolean[] = [false];
  error: string = "";
  errorCedula = "";
  errorPass = "";

  // Función para mostrar mensajes utilizando el servicio MessageService
  message = (severity: 'warn' | 'error', title: string, msg: string) => {
    this.messageService.add({ severity: severity, summary: title, detail: msg });
  };

  // Función asíncrona para manejar el proceso de inicio de sesión
  async Login() {
    // Validar si la cédula está vacía o no definida
    if (this.cedula == null || this.cedula == undefined) {
      this.errorCedula = "Usuario Vacio";
      this.message("error", "Error", this.errorCedula);
      return;
    }

    // Validar si la contraseña está vacía o no definida
    if (this.password == "" || this.password == undefined) {
      this.errorPass = "Contraseña Vacia";
      this.errorCedula = "";
      this.message("error", "Error", this.errorPass);
      return;
    }

    // Limpiar mensajes de error
    this.errorPass = "";
    this.errorCedula = "";

    // Mostrar indicador de carga
    this.isLoading[0] = true;

    // Realizar la llamada de inicio de sesión al servicio
    const response = await this.dataService.login(this.cedula, this.password);

    // Verificar la respuesta del servicio
    if (response.code == 1) {
      // Simular una carga falsa antes de redirigir a la página principal
      fakeLoading(this.isLoading);
      this.router.navigate(['/']);
    } else {
      // En caso de error, mostrar mensaje de advertencia
      this.error = response.msg;
      fakeLoading(this.isLoading).then(() => this.message("warn", "Atención!", this.error));
    }
  }
}

// Función para simular una carga falsa con un tiempo de espera
async function fakeLoading(isLoading: boolean[]) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      isLoading[0] = false;
      resolve();
    }, 2000);
  });
}
