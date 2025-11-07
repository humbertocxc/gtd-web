import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const dbUrl = process.env.DATABASE_URL;
if (dbUrl && dbUrl.startsWith("file:")) {
  const dbPath = path.resolve(dbUrl.slice(5));
  if (!fs.existsSync(dbPath)) {
    console.log("Database not found, initializing...");
    try {
      execSync("npx prisma db push", { stdio: "inherit" });
      execSync("npx prisma generate", { stdio: "inherit" });
      execSync("npx prisma migrate deploy", { stdio: "inherit" });
    } catch (error) {
      console.error("Failed to initialize database:", error);
      process.exit(1);
    }
  }
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
