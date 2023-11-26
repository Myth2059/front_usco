import { Component } from '@angular/core';
import { PdfGeneratorService } from '../services/pdf.creator';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent {
  constructor(private pdf: PdfGeneratorService ){}

  

  downloadPdf(){
    this.pdf.generatePdf();
  }
}
