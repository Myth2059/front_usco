import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { DataService } from 'src/app/services/data.servicese';
import { MessageService } from 'primeng/api';
import { UserServices } from 'src/app/services/user.services';

@Component({
  selector: 'app-editable-field',
  templateUrl: './editable-field.component.html',
  styleUrls: ['./editable-field.component.css'],
  providers: [MessageService]
})
export class EditableFieldComponent implements OnInit{
  constructor(private dataService:DataService,private messageService:MessageService){}
  @Input() id:number | undefined;
  @Input() data:string | number="";
  @Output() dataChange: EventEmitter<string | number> = new EventEmitter<string | number>();
  @Input() title:string ="";
  @Input() labelStyle:string ="";
  @Input() idNameTable:string="";
  @Input() customStyle:string="";
  @Input() user_id:number | undefined;
  @Input() editable:boolean = false;
  @Output() editableChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() type:"text"|"number"|"textArea"|"rol"|"categoria"|"estado" = "text" ;
  @Input() onlyAdmin:boolean = true;

buttonDisabled = false;

userServices = inject(UserServices);
keys:IKeys =  {
  "name": table.users,
  "lastname": table.users,
  "phone": table.users,
  "rol": table.users,
  "nombre": table.locales,
  "ubicacion":table.locales ,
  "estado": table.locales,
  "categoria": table.locales,
  "subcategoria": table.locales,
  "imgurl": table.locales,
  "detalles":table.locales,
  "user_id": table.locales
}
newValue:any;
ngOnInit(){
this.newValue = this.data;

}

Editar(){
  console.log(this.type);
  
  this.editableChange.emit(true);
}

closeEdit(){
  this.editableChange.emit(false);
}


groupName="";
finalSelection="";


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

estados:IEstado[] = [
  { estado: 'Activo' },
  { estado: "Inactivo" },
  {estado:"Deuda"},
  {estado:"Desalojo"}
];

categorias:any = [
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
roles = [
  { rol: 'Guardia' },
  { rol: 'Propietario' },
  { rol: 'Administrador' },
];
async Actualizar(){
console.log(this.idNameTable);

  if (this.newValue != "" && this.idNameTable != "" && this.id && this.newValue != undefined) {
    var table = this.keys[this.idNameTable];
   var columna:string = this.idNameTable;
   var body:{[key: string]: any} = {};
    body[columna] = this.newValue;
    this.data=this.newValue;
    if (this.idNameTable=="estado") {
      body[columna] = this.newValue.estado;
      this.data=this.newValue.estado
    }
    if (this.idNameTable=="categoria") {
      body['categoria']=this.groupName;
      body['subcategoria']=this.finalSelection;      
      this.data=this.groupName + " > " +this.finalSelection;
    }
    

      if (table == 0) {
        body['id']=this.user_id;
        this.buttonDisabled = true;
        this.dataService.updateUser(body).then((value)=>{
          if (value.code==1) {
          this.dataChange.emit();
          this.messageService.clear();
          this.messageService.add({ key: 'modalToast', severity: 'success', summary: 'Exito', detail: value.msg });
          this.buttonDisabled = false;
          }else{
            this.messageService.clear();
            this.messageService.add({ key: 'modalToast', severity: 'error', summary: 'Error', detail: value.msg });
            this.buttonDisabled = false;
            console.log(value.msg);
          }
        })
        console.log("Users",body);
        
      }else if(table == 1){
        body['id']=this.id;
        this.buttonDisabled = true;
        this.dataService.updateLocal(body).then((value)=>{
          if (value.code==1) {
            this.dataChange.emit()
            this.messageService.clear();
            this.messageService.add({ key: 'modalToast', severity: 'success', summary: 'Exito', detail: value.msg });
            this.buttonDisabled = false;
          }else{
            this.messageService.clear();
            this.messageService.add({ key: 'modalToast', severity: 'error', summary: 'Error', detail: value.msg });
            this.buttonDisabled = false;
            console.log(value.msg);
            
          }
        })
        console.log("Locales",body);
      }

  }else{
    if (this.newValue == "") {
      this.messageService.clear();
      this.messageService.add({ key: 'modalToast', severity: 'error', summary: 'Error', detail: "Por favor rellena el campo" });
    }else{
      console.log("Value=",this.newValue,"TableName=",this.idNameTable ,"ID=",this.id);
      
    }
  }



}



}

interface IKeys{
  "name": number,
  "lastname": number,
  "phone": number,
  "rol": number,
  "nombre": number,
  "ubicacion": number,
  "estado": number,
  "categoria": number,
  "subcategoria": number,
  "imgurl": number,
  "user_id": number,
  "detalles":number,
  [key:string]:number
}
enum table{
  users = 0,
  locales = 1
}
interface IEstado {
  estado: string;
}
