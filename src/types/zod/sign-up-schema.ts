import z from "zod";

export const ZSignUpSchema = z
  .object({
    firstName: z.string({ error: "first name is required" }),
    lastName: z.string({ error: "last name is required" }),
    email: z.email({ error: "valid email is required" }),
    password: z
      .string({ error: "password is required" })
      .min(6, { error: "password should be at-least 6 characters long" }),
    confirmPassword: z
      .string({ error: "confirm password is required" })
      .min(6, { error: "confirm password should be at-least 6 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "passwords do not match",
  });
