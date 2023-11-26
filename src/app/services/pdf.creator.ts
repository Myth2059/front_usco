import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import axios from 'axios';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
    private apiUrl = environment.apiUrl;
  generatePdf(): void {
    const documentDefinition:any = {
      content: [
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: [
              ['Propietario', 'Telefono', 'Local', 'Ubicacion', 'Categoria'],            
            this.getInf()
            ],
          },
        },
      ],
    };

    pdfMake.createPdf(documentDefinition).download('tabla_pdf');
  }

 async getInf(): Promise<string[]>{
    const response = (await (axios.get(`${this.apiUrl}/informe`))).data;
    return response;
  }
}