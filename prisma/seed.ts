import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.notification.deleteMany();
  const post = await prisma.notification.create({
    data: {
      title: 'New follower',
      body: '57fd8e08-0666-4809-9bd5-14b8a3d7551e has followed you',
      createdBy: '57fd8e08-0666-4809-9bd5-14b8a3d7551e',
      targetUserId: 'd4fd4ca1-fbe6-4c4b-b8aa-8cd65289c59c',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect;
  });
