import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function showPosts() {
  try {
    const posts = await prisma.post.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    });
    console.log("Posts:", JSON.stringify(posts, null, 2));
  } catch (e) {
    console.error("Error:", e);
  }
}

showPosts().finally(() => prisma.$disconnect());
