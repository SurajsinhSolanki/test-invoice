import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  createInvoice(data: any) {
    return this.http.post('http://localhost:3000/invoices', data);
  }

  getInvoices(searchQuery:string) {
    return this.http.get(`http://localhost:3000/invoices?search=${searchQuery}`);
  }

  getInvoiceDetail(invoiceNumber:string) {
    return this.http.get(`http://localhost:3000/invoices/${invoiceNumber}`);
  }

  deleteInvoice(id:number){
    return this.http.delete(`http://localhost:3000/invoices/${id}`);
  }
}
