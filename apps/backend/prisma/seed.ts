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
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        active: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "Jane Smith",
        email: "jane@example.com",
        role: "editor",
        active: false,
      },
    }),
    prisma.user.create({
      data: {
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "viewer",
        active: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "Alice Williams",
        email: "alice@example.com",
        role: "admin",
        active: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "Charlie Brown",
        email: "charlie@example.com",
        role: "editor",
        active: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "Diana Prince",
        email: "diana@example.com",
        role: "viewer",
        active: false,
      },
    }),
    prisma.user.create({
      data: {
        name: "Edward Norton",
        email: "edward@example.com",
        role: "viewer",
        active: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "Fiona Green",
        email: "fiona@example.com",
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
