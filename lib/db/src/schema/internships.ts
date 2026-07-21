import { pgTable, text, serial, timestamp, integer, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const internshipsTable = pgTable("internships", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(), // Remote | Hybrid | On-site
  duration: text("duration").notNull(),
  stipend: text("stipend").notNull(),
  deadline: date("deadline", { mode: "string" }).notNull(),
  openings: integer("openings").notNull().default(1),
  description: text("description").notNull(),
  tags: text("tags").array().notNull().default([]),
  status: text("status").notNull().default("open"), // open | closed
  postedById: integer("posted_by_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertInternshipSchema = createInsertSchema(internshipsTable).omit({ id: true, createdAt: true });
export type InsertInternship = z.infer<typeof insertInternshipSchema>;
export type Internship = typeof internshipsTable.$inferSelect;
