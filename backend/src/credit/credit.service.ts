import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCreditDto, QueryCreditDto } from './dto/credit.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class CreditService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: CreateCreditDto) {
    const credit = await this.prisma.credit.create({
      data: {
        ...data,
        salesRepId: userId,
      },
      include: {
        salesRep: true,
      },
    });

    setImmediate(() => this.sendEmail(credit));

    return credit;
  }

  async findAll(userId: number, query: QueryCreditDto) {
    const {
      clientName,
      clientId,
      sortBy = 'createdAt',
      order = 'desc',
    } = query;

    return this.prisma.credit.findMany({
      where: {
        salesRepId: userId,
        clientName: clientName
          ? { contains: clientName, mode: 'insensitive' }
          : undefined,
        clientId: clientId
          ? { contains: clientId, mode: 'insensitive' }
          : undefined,
      },
      orderBy: {
        [sortBy]: order,
      },
    });
  }

  private async sendEmail(credit: any) {
    const formattedDate = new Intl.DateTimeFormat('es-CO', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(credit.createdAt));

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Fya Social Capital" <${process.env.SMTP_USER}>`,
      to: 'kevnsc18@gmail.com',
      subject: 'Nuevo crédito registrado',
      text: `
        Nombre del cliente: ${credit.clientName}
        Valor del crédito: $${credit.creditValue}
        Comercial: ${credit.salesRep.name}
        Fecha de registro: ${formattedDate}
      `,
    });
  }
}
