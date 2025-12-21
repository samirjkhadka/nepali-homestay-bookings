// src/lib/db/schema.ts
import { pgTable, serial, text, integer, timestamp, boolean, decimal, jsonb, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table (synced with Clerk)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  avatarUrl: text("avatar_url"),
  role: varchar("role", { length: 20 }).default("guest"), // 'guest', 'host', 'admin'
  phone: varchar("phone", { length: 20 }),
  preferredCurrency: varchar("preferred_currency", { length: 10 }).default("NPR"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Listings table
export const listings = pgTable("listings", {
  id: serial("id").primaryKey(),
  hostId: integer("host_id").references(() => users.id), // foreign key to users
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  location: varchar("location", { length: 100 }).notNull(), // e.g., Bhaktapur, Pokhara
  province: varchar("province", { length: 100 }).notNull(), // e.g., Bagmati, Gandaki
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  priceNPR: integer("price_npr").notNull(), // base price in NPR
  maxGuests: integer("max_guests").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  amenities: jsonb("amenities").$type<string[]>(), // array of strings
  images: jsonb("images").$type<string[]>(), // Cloudinary URLs
  isVerified: boolean("is_verified").default(false),
  instantBook: boolean("instant_book").default(false),
  status: varchar("status", { length: 20 }).default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Hosts table (multiple hosts per listing)
export const hosts = pgTable("hosts", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => listings.id).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  avatar: text("avatar"),
  role: varchar("role", { length: 50 }), // Owner, Co-Host, Chef, etc.
  bio: text("bio"),
  languages: jsonb("languages").$type<string[]>(),
  badges: jsonb("badges").$type<string[]>(),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").references(() => listings.id).notNull(),
  guestId: integer("guest_id").references(() => users.id).notNull(),
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
    fields: [listings.hostId],
    references: [users.id],
  }),
  bookings: many(bookings),
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