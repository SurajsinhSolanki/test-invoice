import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { InvoiceService } from '../../service/invoice.service';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class InvoiceDetailComponent implements OnInit {
  invoice: any = {};
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['itemName', 'quantity', 'rate', 'total'];

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const invoiceNumber = this.route.snapshot.paramMap.get('id');
    if (invoiceNumber) {
      this.invoiceService.getInvoiceDetail(invoiceNumber).subscribe((data:any) => {
        this.invoice = data;
        this.dataSource.data = data.items; // Set data for mat-table
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}