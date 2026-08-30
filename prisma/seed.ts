import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { seedDemoData } from "../src/lib/seed-data";

const prisma = new PrismaClient();

seedDemoData(prisma)
  .then(() => console.log("Seed terminé."))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
