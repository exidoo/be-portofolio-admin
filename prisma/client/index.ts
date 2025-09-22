// prisma/client.ts
import { PrismaClient } from "@prisma/client";

// Always create a new instance to avoid prepared statement issues
export const prisma = new PrismaClient({
  log: ["query", "error", "warn"],
});
