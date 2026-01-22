import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // Clear existing users
  await prisma.user.deleteMany({});
  console.log("Cleared existing users");

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "A User",
        email: "auser@gmail.com",
        role: "admin",
        active: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "B User",
        email: "buser@gmail.com",
        role: "editor",
        active: false,
      },
    }),
    prisma.user.create({
      data: {
        name: "C User",
        email: "cuser@gmail.com",
        role: "viewer",
        active: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "D User",
        email: "duser@gmail.com",
        role: "admin",
        active: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "E User",
        email: "euser@gmail.com",
        role: "editor",
        active: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "F User",
        email: "fuser@gmail.com",
        role: "viewer",
        active: false,
      },
    }),
    prisma.user.create({
      data: {
        name: "G User",
        email: "guser@gmail.com",
        role: "viewer",
        active: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "H User",
        email: "huser@gmail.com",
        role: "admin",
        active: true,
      },
    }),
  ]);

  console.log(`Created ${users.length} users successfully`);
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
