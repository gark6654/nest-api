import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from '../src/config';

const prisma = new PrismaClient();

const main = async () => {
  const passwordHash = await hash('Password1*', BCRYPT_SALT_ROUNDS);

  await prisma.user.createMany({
    data: [
      {
        email: 'test@test.com',
        username: 'test-user',
        password: passwordHash,
      },
    ],
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
