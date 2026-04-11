const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function reset() {
  const email = process.argv[2];
  const newPassword = process.argv[3];

  if (!email || !newPassword) {
    console.error('Usage: node reset-password.js <email> <newPassword>');
    process.exit(1);
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
    console.log(`Successfully reset password for: ${user.email}`);
  } catch (err) {
    console.error('Error resetting password:', err);
  } finally {
    await prisma.$disconnect();
  }
}

reset();
