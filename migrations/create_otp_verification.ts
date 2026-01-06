// migrations/20260106_create_otp_verifications.ts
import { db } from "@/lib/db/db";
import { sql } from "drizzle-orm";

export async function up() {
  await db.execute(sql`
    CREATE TABLE otp_verifications (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      code VARCHAR(6) NOT NULL,
      attempts INTEGER DEFAULT 0,
      max_attempts INTEGER DEFAULT 3,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
}

export async function down() {
  await db.execute(sql`DROP TABLE IF EXISTS otp_verifications`);
}