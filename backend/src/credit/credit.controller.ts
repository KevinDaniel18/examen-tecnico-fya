import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreateCreditDto, QueryCreditDto } from './dto/credit.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('credits')
export class CreditController {
  constructor(private readonly creditService: CreditService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: any, @Body() dto: CreateCreditDto) {
    console.log('User from JWT:', req.user);
    return this.creditService.create(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any, @Query() query: QueryCreditDto) {
    return this.creditService.findAll(req.user.id, query);
  }
}
