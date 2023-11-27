import { Component, Input, OnInit, inject } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { DataService, ILocal } from '../services/data.servicese';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-pdfMaker',
  templateUrl: './pdfMaker.component.html',
  styleUrls: ['./pdfMaker.component.css']
})
export class PdfMakerComponent implements OnInit {

  constructor() { }
  dataServices = inject(DataService);
  ngOnInit() {
  }
 async createPdf(){
   this.dataServices.getLocales().then((data:ILocal)=>{
    const jsonString = JSON.stringify(data);
    const datasco:IRows[] = JSON.parse(jsonString).data;
   var toTable:IRows[]= datasco.map((val)=>({
    id:val.id,
    nombre:val.nombre,
    ubicacion:val.ubicacion,
    estado:val.estado,
    categoria:val.categoria,
    user_id:val.user_id
    }));
    

  
    
    
    const pdfDefinition:any = {
      content: [
        { text: 'Tabla de Datos', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'], // Ajusta las anchuras según tus necesidades
            body: [
             ['ID','NOMBRE','LOCAL','ESTADO','CATEGORIA','ID_PROPIETARIO'],
             ...toTable.map((row) => Object.values(row)),
            ],
          },
        },
      ]
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  });
  


  
  }



}
interface IRows{
  id:number,
  nombre:string,
  ubicacion:string,
  estado:string,
  categoria:string,
  user_id:number;
}
// id:val.id,
// nombre:val.nombre,
// ubicacion:val.ubicacion,
// estado:val.estado,
// categoria:val.categoria,
// user_id:val.user_id