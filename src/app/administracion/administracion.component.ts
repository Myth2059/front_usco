// Importación de módulos y servicios necesarios desde Angular y otras librerías.
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService, ILocal, IUser } from '../services/data.servicese';

// Decorador para el componente Angular.
@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css'],
  providers: [MessageService]
})
export class AdministracionComponent implements OnInit {

  // Constructor para inyectar dependencias.
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private messageService: MessageService,
  ) { }

  // Definición de formularios y sus controles.
  newUserForm = new FormGroup({
    id: new FormControl(null, Validators.required),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    tel: new FormControl(null, Validators.required),
    password: new FormControl('', Validators.required),
    rol: new FormControl('', Validators.required),
  });

  newLocalForm = this.formBuilder.group({
    nombre: new FormControl("", Validators.required),
    ubicacion: new FormControl(null, Validators.required),
    estado: new FormControl("", Validators.required),
    imgurl: new FormControl("", Validators.required),
    user_id: new FormControl(null, Validators.required),
    selectedCat: new FormControl("", Validators.required),
    detalles:new FormControl("", Validators.required),
  });

  // Definición de objetos para manejar errores en los formularios.
  errorsUserForm: IErrorUserForm = {
    id: '',
    name: '',
    lastname: '',
    tel: '',
    password: '',
    rol: ''
  };

  errorLocalForm: IErrorLocalForm = {
    nombre: "",
    ubicacion: "",
    estado: "",
    imgurl: "",
    user_id: "",
    selectedCat: "",
    detalles:""
  };

  // Arreglos para opciones de roles, estados y categorías.
  categorias: any[] | undefined;
  roles: IRoles[] | undefined;
  estados: IEstado[] | undefined;

  // Variables para manejar selecciones en cascada.
  isAdmin = '';
  groupName = '';
  finalSelection = '';

  // Método para crear un nuevo usuario.
  async createUser() {
    if (this.validateFormUser()) {
      this.messageService.add({ severity: "error", summary: "Campos Requeridos", detail: "Por favor diligenciar todos los campos" });
      return;
    }

    // Obtener valores del formulario.
    var id: any = this.newUserForm.get('id')?.value;
    var name: any = this.newUserForm.get('name')?.value;
    var lastname: any = this.newUserForm.get('lastname')?.value;
    var phone: any = this.newUserForm.get('tel')?.value;
    var password: any = this.newUserForm.get('password')?.value;
    var rol: any = this.newUserForm.get('rol')?.value;

    // Crear objeto de usuario.
    const user: IUser = {
      id: id,
      name: name,
      lastname: lastname,
      password: password,
      phone: phone,
      rol: rol.rol,
    };

    // Llamar al servicio para crear el usuario.
    const response = await this.dataService.createUser(user);

    // Manejar la respuesta del servicio.
    if (response.code == 1) {
      this.messageService.add({ severity: "success", summary: "Éxito", detail: "Se agregó el usuario correctamente" });
      this.newUserForm.reset();
    } else {
      this.messageService.add({ severity: "error", summary: "Error", detail: response.msg });
    }
  }

  // Método para crear un nuevo local.
  async createLocal() {
    if (this.validateFormLocal()) {
      this.messageService.add({ severity: "error", summary: "Campos Requeridos", detail: "Por favor diligenciar todos los campos" });
      return;
    }

    // Obtener valores del formulario.
    var nombre: any = this.newLocalForm.get('nombre')?.value;
    var ubicacion: any = this.newLocalForm.get('ubicacion')?.value;
    var estado: any = this.newLocalForm.get('estado')?.value;
    var imgurl: any = this.newLocalForm.get('imgurl')?.value;
    var user_id: any = this.newLocalForm.get('user_id')?.value;
    var selectedCat: any = this.newLocalForm.get('selectedCat')?.value;
    var detalles:any = this.newLocalForm.get('detalles')?.value;


    // Crear objeto de local.
    const Local: ILocal = {
      nombre: nombre,
      categoria: this.groupName,
      estado: estado.estado,
      imgurl: imgurl,
      subcategoria: this.finalSelection,
      ubicacion: ubicacion,
      user_id: user_id,
      detalles:detalles
    };

    // Llamar al servicio para crear el local.
    const response = await this.dataService.createLocal(Local);

    // Manejar la respuesta del servicio.
    if (response.code == 1) {
      this.messageService.add({ severity: "success", summary: "Éxito", detail: "Se agregó el local correctamente" });
      this.newLocalForm.reset();
      var element = document.getElementsByClassName('p-cascadeselect-label');
      element[0].innerHTML = "Selecciona una categoría";
    } else {
      this.messageService.add({ severity: "error", summary: "Error", detail: response.msg });
    }
  }

  // Método que se ejecuta al inicializar el componente.
  ngOnInit() {
    // Inicializar opciones de roles, estados y categorías.
    this.roles = [
      { rol: 'Guardia' },
      { rol: 'Propietario' },
      { rol: 'Administrador' },
    ];

    this.estados = [
      { estado: 'Activo' },
      { estado: "Inactivo" }
    ];

    this.categorias = [
      {
        name: 'Alimentos',
        subCategoria: [
          { name: 'Frutas' },
          { name: 'Verduras' },
          { name: 'Granos' },
        ],
      },
      {
        name: 'Ropa y Textiles  ',
        subCategoria: [
          { name: 'Hombre' },
          { name: 'Mujer' },
          { name: 'Niños' },
          { name: 'Mixto' },
        ],
      },
      {
        name: 'Deportes',
        subCategoria: [
          { name: 'Fútbol' },
          { name: 'Baloncesto' },
          { name: 'Voleibol' },
        ],
      },
    ];
  }

  // Método que se ejecuta al cambiar la selección en cascada.
  onCascadeSelectChange(event: any) {
    if (event.value != '' && event.value != null) {
      if (event.value.hasOwnProperty('option')) {
        this.groupName = event.value.option.name;
      } else {
        this.finalSelection = event.value.name;
        var element = document.getElementsByClassName('p-cascadeselect-label');
        element[0].innerHTML = this.groupName + '>' + this.finalSelection;
        const cascade = document.getElementsByClassName("p-cascadeselect")[0] as HTMLElement;
        cascade.style.borderColor = "#ced4da"
      }
    }
  }

  // Método que se ejecuta al cambiar la selección del rol.
  onChangeRol(event: any) {
    const dropdown = document.getElementsByClassName("p-dropdown")[0] as HTMLElement;
    dropdown.style.borderColor = "#ced4da";
  }

  // Método que se ejecuta al cambiar la selección del estado.
  onChangeEstado(event: any) {
    const dropdown = document.getElementsByClassName("p-dropdown")[1] as HTMLElement;
    dropdown.style.borderColor = "#ced4da";
  }

  onChangeTextarea(event:any){
    const textarea = document.getElementsByClassName("p-inputtextarea")[0] as HTMLElement;
          textarea.style.borderColor = "#ced4da";
  }

  // Método para validar el formulario de usuario.
  validateFormUser(): boolean {
    var isSomeOneInvalid = false;
    for (let key in this.errorsUserForm) {
      if (this.newUserForm.get(key)?.errors) {
        this.errorsUserForm[key] = "ng-invalid ng-dirty";
        if (key == "rol") {
          const dropdown = document.getElementsByClassName("p-dropdown")[0] as HTMLElement;
          dropdown.style.borderColor = "#e24c4c";
        }
        isSomeOneInvalid = true;
      } else {
        this.errorsUserForm[key] = "";
      }
    }
    return isSomeOneInvalid;
  }

  // Método para validar el formulario de local.
  validateFormLocal(): boolean {
    var isSomeOneInvalid = false;
    for (let key in this.errorLocalForm) {
      if (this.newLocalForm.get(key)?.errors) {
        this.errorLocalForm[key] = "ng-invalid ng-dirty";
        if (key == "selectedCat") {
          const cascade = document.getElementsByClassName("p-cascadeselect")[0] as HTMLElement;
          cascade.style.borderColor = "#e24c4c";
        }
        if (key == "estado") {
          const dropdown = document.getElementsByClassName("p-dropdown")[1] as HTMLElement;
          dropdown.style.borderColor = "#e24c4c";
        }
        if (key == "detalles") {
          const textarea = document.getElementsByClassName("p-inputtextarea")[0] as HTMLElement;
          textarea.style.borderColor = "#e24c4c";
        }
        isSomeOneInvalid = true;
      } else {
        this.errorLocalForm[key] = "";
      }
    }
    return isSomeOneInvalid;
  }
}

// Interfaces para definir tipos de datos.
interface IRoles {
  rol: string;
}

interface IEstado {
  estado: string;
}

interface IErrorUserForm {
  id: string;
  name: string;
  lastname: string;
  tel: string;
  password: string;
  rol: string;
  [key: string]: string;
}

interface IErrorLocalForm {
  nombre: string,
  ubicacion: string,
  estado: string,
  imgurl: string,
  user_id: string,
  selectedCat: string,
  [key: string]: string;
}
