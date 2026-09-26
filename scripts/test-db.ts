import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Read-only smoke test: confirms the connection works, the migrated tables
// exist, and the system item types have been seeded.
async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set — check your .env file");
  }

  const [{ now }] = await prisma.$queryRaw<{ now: Date }[]>`SELECT NOW() AS now`;
  console.log(`✔ Connected to database (server time: ${now.toISOString()})`);

  const counts = {
    users: await prisma.user.count(),
    itemTypes: await prisma.itemType.count(),
    items: await prisma.item.count(),
    collections: await prisma.collection.count(),
    tags: await prisma.tag.count(),
  };
  console.log("✔ Table row counts:");
  console.table(counts);

  const systemTypes = await prisma.itemType.findMany({
    where: { isSystem: true, userId: null },
    select: { name: true, icon: true, color: true },
    orderBy: { name: "asc" },
  });

  if (systemTypes.length === 0) {
    console.warn("⚠ No system item types found — run `npm run db:seed`");
  } else {
    console.log(`✔ Found ${systemTypes.length} system item types:`);
    console.table(systemTypes);
  }
}

main()
  .catch((error) => {
    console.error("✘ Database test failed:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
