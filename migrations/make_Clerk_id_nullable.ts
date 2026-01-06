// migrations/20260106_make_clerk_id_nullable.ts
import { db } from "@/lib/db/db";
import { sql } from "drizzle-orm";

export async function up() {
  await db.execute(sql`
    ALTER TABLE users 
    ALTER COLUMN clerk_id DROP NOT NULL,
    ALTER COLUMN clerk_id DROP DEFAULT;
  `);
}

export async function down() {
  await db.execute(sql`
    ALTER TABLE users 
    ALTER COLUMN clerk_id SET NOT NULL;
  `);
}
