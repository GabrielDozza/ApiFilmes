import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment.");
}

class PrismaClientSingleton {
  private static instance: PrismaClient | null = null;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaClientSingleton.instance) {
      PrismaClientSingleton.instance = new PrismaClient({
        adapter: new PrismaPg({
          connectionString: process.env.DATABASE_URL,
        }),
      });
    }

    return PrismaClientSingleton.instance;
  }
}

const prisma = PrismaClientSingleton.getInstance();

export default prisma;
