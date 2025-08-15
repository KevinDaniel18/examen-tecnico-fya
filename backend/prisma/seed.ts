import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'Juan López',
      email: 'juan@example.com',
      password: process.env.SEED_USER_PASSWORD as string,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'María Pérez',
      email: 'maria@example.com',
      password: process.env.SEED_USER_PASSWORD as string,
    },
  });

  await prisma.credit.createMany({
    data: [
      {
        clientName: 'Pepito Perez',
        clientId: '123456789',
        creditValue: 7800000,
        interestRate: 2,
        termMonths: 10,
        salesRepId: user1.id,
      },
      {
        clientName: 'Maria Perez',
        clientId: '987654321',
        creditValue: 12500000,
        interestRate: 2,
        termMonths: 5,
        salesRepId: user1.id,
      },
      {
        clientName: 'Antonio Rodriguez',
        clientId: '456789123',
        creditValue: 10312673,
        interestRate: 2,
        termMonths: 5,
        salesRepId: user2.id,
      },
    ],
  });

  console.log('Usuarios y créditos insertados correctamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
