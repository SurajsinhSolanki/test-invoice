import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddInvoiceComponent } from '../../component/add-invoice/add-invoice.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { InvoiceService } from '../../service/invoice.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  imports: [MatDividerModule, MatButtonModule, MatTableModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {
  displayedColumns: string[] = ['invoiceNumber', 'invoiceDate', 'fromName', 'toName', 'totalAmount', 'actions'];
  dataSource : any = [];
  searchQuery: string = '';
  constructor(private router: Router, private dialog: MatDialog,private invoiceService: InvoiceService) { }


  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.invoiceService.getInvoices(this.searchQuery).subscribe((invoices:any) => {
      this.dataSource = invoices.data;
    });
  };

  Openpopup() {
    let _popUp = this.dialog.open(AddInvoiceComponent, { width: '90%' })
    _popUp.afterClosed().subscribe(item => {
      this.loadData();
    })
  }

  viewInvoice(invoice: any): void {
    this.router.navigate(['/invoice', invoice]);
  }

  deleteInvoice(invoice:any){
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.deleteInvoice(invoice).subscribe(() => {
        this.loadData();
      });
    }
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement; // Cast to HTMLInputElement
    this.searchQuery = input.value; // Access the value of the input
    this.loadData();
  }  
}
