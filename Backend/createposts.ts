const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const faker = require('faker');

async function createRandomPosts() {
  const userId = 1;
  const numberOfPosts = 10; // Change this to the number of posts you want to create

  for (let i = 0; i < numberOfPosts; i++) {
    const title = faker.lorem.sentence();
    const content = faker.lorem.paragraph().slice(0, 100);
    const defects = faker.datatype.boolean();
    const price = parseFloat(faker.commerce.price());

    const post = await prisma.post.create({
      data: {
        title: title,
        has_defects: defects,
        description: content,
        user_id: userId,
        price: price,
        defects: content,
      },
    });

    console.log(`Created post with ID ${post.id}`);
  }
}

createRandomPosts()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })