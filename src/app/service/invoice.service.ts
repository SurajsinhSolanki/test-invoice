import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  createInvoice(data: any) {
    return this.http.post('https://e533-2402-a00-404-ec92-2cd9-6f3f-77fa-c4b.ngrok-free.app/invoices', data);
  }

  getInvoices() {
    return this.http.get('https://e533-2402-a00-404-ec92-2cd9-6f3f-77fa-c4b.ngrok-free.app/invoices');
  }


  getInvoiceDetail() {
    return this.http.get('');
  }

  updateInvoice(data: any) {
    return this.http.put('', data);
  }
}
