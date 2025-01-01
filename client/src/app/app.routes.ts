import { Routes } from '@angular/router';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';

export const routes: Routes = [
    {
        path: '', component: InvoiceComponent
    },
    { 
        path: 'invoice/:id', component: InvoiceDetailComponent 
    },
];
