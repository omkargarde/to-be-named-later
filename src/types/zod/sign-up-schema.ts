import z from "zod";

export const ZSignUpSchema = z
  .object({
    firstName: z.string().min(1, "first name is required"),
    lastName: z.string().min(1, "last name is required"),
    email: z.email("valid email is required"),
    password: z.string().min(6, "password should be at-least 6 characters long"),
    confirmPassword: z.string().min(6, "confirm password should be at-least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "passwords do not match",
  });
