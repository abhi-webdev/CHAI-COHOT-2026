import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

function createPrismaClient () {
    const url = process.env.DATABASE_URL;
    if (!url) {
        throw new Error("DATABASE_URL does not exist")
    }

    const adapter = new PrismaNeon({connectionString: url})
    return new PrismaClient({adapter})
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "development") {
    globalForPrisma.prisma = prisma
}