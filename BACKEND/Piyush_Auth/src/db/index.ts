import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

export const db: ReturnType<typeof drizzle> = drizzle(process.env.DATABASE_URL!);