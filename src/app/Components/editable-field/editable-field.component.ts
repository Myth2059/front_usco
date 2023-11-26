import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-editable-field',
  templateUrl: './editable-field.component.html',
  styleUrls: ['./editable-field.component.css']
})
export class EditableFieldComponent {
  @Input() id:number | undefined;
  @Input() data:any;
  @Input() title:string ="";
  @Input() idNameTable:string="";


keys:IKeys ={
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
  "user_id": table.locales
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
  [key:string]:number
}
enum table{
  users = 0,
  locales = 1
}