// lib/prismadb.ts
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

const getClient = () => {
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    return global.prisma;
  }
};

const prisma = getClient();

export default prisma;
