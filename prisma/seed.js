import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: {
      email: "felipe.lima@alpar.com.br",
    },
    create: {
      name: "Felipe Lima",
      email: "felipe.lima@alpar.com.br",
      password: "141441",
      admin: true,
    },
    update: {},
  });

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit();
  });


