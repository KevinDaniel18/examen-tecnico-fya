import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateCreditDto {
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsNumber()
  @Min(0)
  creditValue: number;

  @IsNumber()
  interestRate: number;

  @IsNumber()
  termMonths: number;
}

export class QueryCreditDto {
  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsString()
  salesRep?: string;

  @IsOptional()
  @IsIn(['createdAt', 'creditValue'])
  sortBy?: 'createdAt' | 'creditValue';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}
