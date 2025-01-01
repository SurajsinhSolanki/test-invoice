import { Controller, Post, Get, Body, Query, Param, Delete, Put } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('sortField') sortField: string = 'invoiceDate',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
    @Query('search') search: string = '',
    @Query() filters: Record<string, any>,
  ) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    delete filters.page;
    delete filters.pageSize;
    delete filters.sortField;
    delete filters.sortOrder;
    delete filters.search;

    return this.invoiceService.findAll(skip, take, sortField, sortOrder, filters, search);
  }

  @Get(':id')
  getInvoiceDetail(@Param('id') id: string) {
    return this.invoiceService.getInvoiceDetail(id);
  }

  @Delete(':id')
  deleteInvoice(@Param('id') id: number) {
    return this.invoiceService.deleteInvoice(id);
  }

  @Put(':id')
  updateInvoice(@Param('id') id: number, @Body() updateInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.updateInvoice(id, updateInvoiceDto);
  }
}