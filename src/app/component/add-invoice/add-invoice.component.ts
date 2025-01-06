import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../service/invoice.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-invoice',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule
    , CommonModule, MatIconModule
  ],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.css',
})
export class AddInvoiceComponent {
  invoiceForm = new FormGroup({
    invoiceDate: new FormControl('', Validators.required),
    fromName: new FormControl('', Validators.required),
    fromAddress: new FormControl('', Validators.required),
    toName: new FormControl('', Validators.required),
    toAddress: new FormControl('', Validators.required),
    items: new FormArray([
      this.createItem(),
    ]),
  });

  createItem(): FormGroup {
    return new FormGroup({
      itemName: new FormControl('', Validators.required),
      quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      rate: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  constructor(
    private ref: MatDialogRef<AddInvoiceComponent>,
    private service: InvoiceService
  ) { }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  closepopup() {
    this.ref.close();
  }

  saveInvoce() : void {
    console.log('Hello');
    if (this.invoiceForm.valid) {
      console.log('Form Data:', this.invoiceForm.value);
      this.service.createInvoice(this.invoiceForm.value).subscribe(res => {
        this.closepopup();
      });
    } else {
      console.log('Form is invalid');

    }
  }

  testClick() {
    console.log('Save button clicked');
  }
  
}
