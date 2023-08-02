import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

const prisma: PrismaClient = globalThis.prisma || new PrismaClient();
globalThis.prisma = prisma;

export default prisma;
