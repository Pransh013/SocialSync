import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "name must be at least 2 characters long" }),
  username: z
    .string()
    .min(2, { message: "username must be at least 2 characters long" }),
  email: z.string().email({ message: "must be an email" }),
  password: z
    .string()
    .min(6, { message: "password must be at least 8 characters long" }),
});

export const signinSchema = z.object({
  email: z.string().email({ message: "must be an email" }),
  password: z
    .string()
    .min(6, { message: "password must be at least 8 characters long" }),
});

export const postSchema = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});
