import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ItemDto {
  @IsString()
  itemName: string;

  @IsString()
  quantity: number;

  @IsString()
  rate: number;
}

export class CreateInvoiceDto {
    @IsString()
    invoiceNumber: string;
  
    @IsString()
    invoiceDate: Date;
  
    @IsString()
    fromName: string;
  
    @IsString()
    fromAddress: string;
  
    @IsString()
    toName: string;
  
    @IsString()
    toAddress: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    items: ItemDto[];
  }