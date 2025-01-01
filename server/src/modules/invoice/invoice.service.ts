import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class InvoiceService {
    constructor(
        @InjectRepository(Invoice)
        private readonly invoiceRepository: Repository<Invoice>,
    ) { }

    async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
        const { items, ...invoiceData } = createInvoiceDto;
        const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
        const updatedItems = items.map(item => ({
            ...item,
            total: item.quantity * item.rate,
        }));
        const invoice = this.invoiceRepository.create({
            ...invoiceData,
            invoiceNumber: this.generateInvoiceNumber(),
            items: updatedItems,
            totalAmount,
        });
        return this.invoiceRepository.save(invoice);
    }

    generateInvoiceNumber(): string {
        const prefix = 'INV';
        const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomPart = Math.floor(1000 + Math.random() * 9000);
        return `${prefix}-${datePart}-${randomPart}`;
    }


    async findAll(
        skip: number,
        take: number,
        sortField: string,
        sortOrder: 'ASC' | 'DESC',
        filters: Record<string, any>,
        search: string
    ): Promise<{ data: Invoice[]; count: number }> {
        const queryBuilder = this.invoiceRepository.createQueryBuilder('invoice');

        // Add search condition
        if (search) {
            queryBuilder.andWhere(
                '(invoice.invoiceNumber LIKE :search OR invoice.fromName LIKE :search OR invoice.toName LIKE :search OR invoice.invoiceDate LIKE :search)',
                { search: `%${search}%` }
            );
        }

        // Add filters dynamically
        Object.entries(filters).forEach(([key, value]) => {
            queryBuilder.andWhere(`invoice.${key} = :${key}`, { [key]: value });
        });

        // Add sorting
        queryBuilder.orderBy(`invoice.${sortField}`, sortOrder);

        // Add pagination
        queryBuilder.skip(skip).take(take);

        // Execute the query and get results
        const [data, count] = await queryBuilder.getManyAndCount();
        return { data, count };
    }

    async getInvoiceDetail(id: string): Promise<Invoice> {
        return this.invoiceRepository.findOne({
            where: { invoiceNumber: id },
            relations: ['items'],
        });
    }

    async deleteInvoice(id: number): Promise<{ message: string }> {
        await this.invoiceRepository.manager.transaction(async (transactionalEntityManager) => {
          await transactionalEntityManager.delete('Item', { invoice: { id } });
          await transactionalEntityManager.delete('Invoice', id);
        });
        return { message: 'Invoice deleted successfully' };
      }


    async updateInvoice(id: number, updateInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
        const invoice = await this.invoiceRepository.findOne({ where: { id }, relations: ['items'] });
        if (!invoice) {
            throw new NotFoundException('Invoice not found');
        }
        const { items, ...invoiceData } = updateInvoiceDto;

        // Update items
        await this.invoiceRepository.manager.transaction(async (manager) => {
            await manager.delete(Item, { invoice: { id } });
            const updatedItems = items.map((item) => manager.create(Item, { ...item, invoice }));
            await manager.save(Item, updatedItems);
        });

        const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);

        Object.assign(invoice, { ...invoiceData, items, totalAmount });
        return this.invoiceRepository.save(invoice);
    }
}