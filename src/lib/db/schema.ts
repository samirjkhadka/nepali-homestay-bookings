// src/lib/db/schema.ts
import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  decimal,
  jsonb,
  varchar,
  date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table (synced with Clerk)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerk_id: varchar("clerk_id", { length: 255 }).unique(),
  email: varchar("email", { length: 255 }).notNull(),
  first_name: varchar("first_name", { length: 100 }),
  last_name: varchar("last_name", { length: 100 }),
  avatar_url: text("avatar_url"),
  role: varchar("role", { length: 20 }).default("guest"),
  phone: varchar("phone", { length: 20 }),
  preferred_currency: varchar("preferred_currency", { length: 10 }).default(
    "NPR"
  ),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  password: text("password"),
});

// Listings table
// src/lib/db/schema.ts
export const listings = pgTable("listings", {
  id: serial("id").primaryKey(),
  host_id: integer("host_id").references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  province: varchar("province", { length: 100 }).notNull(),
  district: varchar("district", { length: 100 }).notNull(),
  //type: varchar("homestay_type", { length: 100 }).notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  price_npr: integer("price_npr").notNull(),
  max_guests: integer("max_guests").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  amenities: jsonb("amenities").$type<string[]>(),
  images: jsonb("images").$type<string[]>(),

  // NEW FIELDS - SAFE
  homestay_type: varchar("homestay_type", { length: 20 })
    .notNull()
    .default("individual"),
  number_of_houses: integer("number_of_houses"),
  ward_no: varchar("ward_no", { length: 20 }),
  street: varchar("street", { length: 255 }),
  way_to_get_there: jsonb("way_to_get_there").$type<string[]>(),

  is_verified: boolean("is_verified").default(false),
  instant_book: boolean("instant_book").default(false),
  status: varchar("status", { length: 20 }).default("pending"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  primary_host_id: integer("primary_host_id").references(() => users.id),
});

// Hosts table (multiple hosts per listing)
export const hosts = pgTable("hosts", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id")
    .references(() => listings.id)
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  avatar: text("avatar"),
  role: varchar("role", { length: 50 }),
  bio: text("bio"),
  languages: jsonb("languages").$type<string[]>(),
  badges: jsonb("badges").$type<string[]>(),
  password: text("password"),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  password_reset_token: varchar("password_reset_token", { length: 255 }),
  token_expiry: timestamp("token_expiry"),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id")
    .references(() => listings.id)
    .notNull(),
  guestId: integer("guest_id")
    .references(() => users.id)
    .notNull(),
  checkIn: timestamp("check_in").notNull(),
  checkOut: timestamp("check_out").notNull(),
  guests: integer("guests").notNull(),
  totalPriceNPR: integer("total_price_npr").notNull(),
  status: varchar("status", { length: 20 }).default("pending"), // pending, confirmed, cancelled, completed
  paymentStatus: varchar("payment_status", { length: 20 }).default("pending"),
  gatewayRef: varchar("gateway_ref", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const listingsRelations = relations(listings, ({ many, one }) => ({
  hosts: many(hosts),
  host: one(users, {
    fields: [listings.host_id],
    references: [users.id],
  }),
}));

export const hostsRelations = relations(hosts, ({ one }) => ({
  listing: one(listings, {
    fields: [hosts.listingId],
    references: [listings.id],
  }),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  listing: one(listings, {
    fields: [bookings.listingId],
    references: [listings.id],
  }),
  guest: one(users, {
    fields: [bookings.guestId],
    references: [users.id],
  }),
}));

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  featured_image: text("featured_image"),
  author: varchar("author", { length: 100 }).default("Nepali Homestays Team"),
  published: boolean("published").default(true),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  youtube_id: varchar("youtube_id", { length: 50 }).notNull(), // e.g. "dQw4w9WgXcQ"
  description: text("description"),
  featured: boolean("featured").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const otpVerifications = pgTable("otp_verifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id), // pending user
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  code: varchar("code", { length: 6 }).notNull(),
  attempts: integer("attempts").default(0), // resend count
  maxAttempts: integer("max_attempts").default(3),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blockedDates = pgTable("blocked_dates", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id")
    .references(() => listings.id)
    .notNull(),
  date: date("date").notNull(), // YYYY-MM-DD
  createdAt: timestamp("created_at").defaultNow(),
});
