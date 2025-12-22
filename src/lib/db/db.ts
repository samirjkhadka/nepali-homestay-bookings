// src/lib/db/db.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Use environment variable for Neon connection string
const sql = neon(process.env.DATABASE_URL!);

// Export the Drizzle instance with our schema
export const db = drizzle(sql, { schema });