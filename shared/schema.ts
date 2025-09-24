import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Contact information schema
const contactSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  linkedin: z.string().url().optional(),
  location: z.string().optional(),
});

// Experience item schema
const experienceSchema = z.object({
  company: z.string(),
  position: z.string(),
  from: z.string(),
  to: z.string(),
  description: z.string(),
});

// Education item schema
const educationSchema = z.object({
  institute: z.string(),
  degree: z.string(),
  from: z.string(),
  to: z.string(),
  description: z.string().optional(),
});

// Style settings schema
const styleSchema = z.object({
  headerFontSize: z.number().min(16).max(24).default(18),
  bodyFontSize: z.number().min(10).max(16).default(12),
  sectionSpacing: z.number().min(8).max(32).default(16),
  lineHeight: z.number().min(1.2).max(2.0).default(1.5),
  marginTop: z.number().min(10).max(40).default(20),
  marginBottom: z.number().min(10).max(40).default(20),
  marginLeft: z.number().min(10).max(40).default(20),
  marginRight: z.number().min(10).max(40).default(20),
  sidebarWidth: z.number().min(30).max(45).default(40),
});

// Resume data schema
const resumeDataSchema = z.object({
  name: z.string(),
  title: z.string(),
  summary: z.string(),
  contact: contactSchema,
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(z.string()),
});

export const resumes = pgTable("resumes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().default("anonymous"),
  name: text("name").notNull().default("Untitled Resume"),
  templateId: text("template_id").notNull().default("1"),
  data: jsonb("data").$type<z.infer<typeof resumeDataSchema>>().notNull(),
  style: jsonb("style").$type<z.infer<typeof styleSchema>>().notNull().default({
    headerFontSize: 18,
    bodyFontSize: 12,
    sectionSpacing: 16,
    lineHeight: 1.5,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    sidebarWidth: 40,
  }),
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
});

export const updateResumeSchema = insertResumeSchema.partial();

export type InsertResume = z.infer<typeof insertResumeSchema>;
export type Resume = typeof resumes.$inferSelect;
export type ResumeData = z.infer<typeof resumeDataSchema>;
export type StyleSettings = z.infer<typeof styleSchema>;
export type ContactInfo = z.infer<typeof contactSchema>;
export type ExperienceItem = z.infer<typeof experienceSchema>;
export type EducationItem = z.infer<typeof educationSchema>;

// Export schemas for validation
export { resumeDataSchema, styleSchema, contactSchema, experienceSchema, educationSchema };
