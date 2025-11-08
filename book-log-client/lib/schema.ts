import { z } from "zod";

export const UserSchema = z.object({
  email: z.string(),
  name: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const BookSchema = z.object({
  id: z.number(),
  title: z.string(),
  notes: z.string(),
  completedDate: z.string(),
});

export type Book = z.infer<typeof BookSchema>;
