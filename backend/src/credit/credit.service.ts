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
      to: 'fyasocialcapital@gmail.com',
      subject: 'Nuevo crédito registrado',
      text: `
        Nombre del cliente: ${credit.clientName}
        Valor del crédito: $${credit.creditValue}
        Comercial: ${credit.salesRep.name}
        Fecha de registro: ${formattedDate}
      `,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nuevo Crédito Registrado</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              line-height: 1.6;
              color: #333333;
              background-color: #f8fafc;
            }
            
            .container {
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 12px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
              overflow: hidden;
            }
            
            .header {
              background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
              color: #ffffff;
              padding: 32px 24px;
              text-align: center;
            }
            
            .header h1 {
              font-size: 28px;
              font-weight: 700;
              margin-bottom: 8px;
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            }
            
            .header p {
              font-size: 16px;
              opacity: 0.9;
            }
            
            .content {
              padding: 32px 24px;
            }
            
            .alert {
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              color: #ffffff;
              padding: 16px 20px;
              border-radius: 8px;
              margin-bottom: 32px;
              text-align: center;
              font-weight: 600;
              font-size: 18px;
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            }
            
            .details {
              background: #f8fafc;
              border-radius: 8px;
              padding: 24px;
              border-left: 4px solid #3b82f6;
            }
            
            .detail-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 0;
              border-bottom: 1px solid #e2e8f0;
            }
            
            .detail-item:last-child {
              border-bottom: none;
            }
            
            .detail-label {
              font-weight: 600;
              color: #475569;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            
            .detail-value {
              font-weight: 700;
              color: #1e293b;
              font-size: 16px;
            }
            
            .credit-value {
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              color: #ffffff;
              padding: 8px 16px;
              border-radius: 6px;
              font-size: 18px;
              font-weight: 700;
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            }
            
            .footer {
              background: #f1f5f9;
              padding: 24px;
              text-align: center;
              border-top: 1px solid #e2e8f0;
            }
            
            .footer p {
              color: #64748b;
              font-size: 14px;
              margin-bottom: 8px;
            }
            
            .footer .company {
              color: #3b82f6;
              font-weight: 600;
              font-size: 16px;
            }
            
            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              background-size: contain;
              background-repeat: no-repeat;
            }
            
            @media (max-width: 600px) {
              .container {
                margin: 20px;
                border-radius: 8px;
              }
              
              .header {
                padding: 24px 16px;
              }
              
              .content {
                padding: 24px 16px;
              }
              
              .detail-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 4px;
              }
              
              .detail-value {
                font-size: 15px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💳 Fya Social Capital</h1>
              <p>Sistema de Gestión de Créditos</p>
            </div>
            
            <div class="content">
              <div class="alert">
                🎉 ¡Nuevo crédito registrado exitosamente!
              </div>
              
              <div class="details">
                <div class="detail-item">
                  <span class="detail-label">
                    👤 Nombre del cliente
                  </span>
                  <span class="detail-value">${credit.clientName}</span>
                </div>
                
                <div class="detail-item">
                  <span class="detail-label">
                    💰 Valor del crédito
                  </span>
                  <span class="detail-value credit-value">$${credit.creditValue.toLocaleString('es-CO')}</span>
                </div>
                
                <div class="detail-item">
                  <span class="detail-label">
                    👨‍💼 Comercial
                  </span>
                  <span class="detail-value">${credit.salesRep.name}</span>
                </div>
                
                <div class="detail-item">
                  <span class="detail-label">
                    📅 Fecha de registro
                  </span>
                  <span class="detail-value">${formattedDate}</span>
                </div>
              </div>
            </div>
            
            <div class="footer">
              <p>Este correo fue generado automáticamente por el sistema</p>
              <p class="company">Fya Social Capital © ${new Date().getFullYear()}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
  }
}
