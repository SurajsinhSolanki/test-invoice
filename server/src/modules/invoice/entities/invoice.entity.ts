import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Item } from './item.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  invoiceNumber: string;

  @Column({ type: 'date' })
  invoiceDate: Date;

  @Column()
  fromName: string;

  @Column()
  fromAddress: string;

  @Column()
  toName: string;

  @Column()
  toAddress: string;

  @OneToMany(() => Item, (item) => item.invoice, { cascade: true })
  items: Item[];

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;
}