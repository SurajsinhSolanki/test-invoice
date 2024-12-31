import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddInvoiceComponent } from '../../component/add-invoice/add-invoice.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-invoice',
  imports: [MatDividerModule, MatButtonModule, MatTableModule, MatCardModule, MatIconModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {
  displayedColumns: string[] = ['invoiceNumber', 'invoiceDate', 'fromName', 'toName', 'totalAmount', 'actions'];
  dataSource : any = [];
  constructor(private dialog: MatDialog,private invoiceService: InvoiceService) { }


  ngOnInit(): void {
    console.log('hsdkfkjbd')
    this.loadData();
  }

  loadData() {
    this.invoiceService.getInvoices().subscribe((invoices:any) => {
      console.log('invoice',invoices);
      this.dataSource = invoices.data;
    });
  };

  Openpopup() {
    let _popUp = this.dialog.open(AddInvoiceComponent, { width: '90%' })
    _popUp.afterClosed().subscribe(item => {
      this.loadData();
    })
  }

  editInvoice(invoice:any){}

  deleteInvoice(invoice:any){}
}
