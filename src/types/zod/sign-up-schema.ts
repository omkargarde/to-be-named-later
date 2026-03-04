import { formOptions } from "@tanstack/react-form";
import z from "zod";

/**
 * Zod schema for user sign-up validation.
 *
 * Validates the following fields:
 * - firstName: required string
 * - lastName: required string
 * - email: valid email format
 * - password: minimum 6 characters
 * - confirmPassword: must match password
 */
export const ZSignUpSchema = z
  .object({
    firstName: z.string({ message: "first name is required" }),
    lastName: z.string({ message: "last name is required" }),
    email: z.email("please enter a valid email"),
    password: z
      .string({ message: "password is required" })
      .min(6, "password must be at least 6 characters"),
    confirmPassword: z
      .string({ message: "confirm password is required" })
      .min(6, "confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
  });

/**
 * TypeScript type inferred from the ZSignUpSchema.
 * Use this type for form state and data transfer objects.
 */
export type ISignUpSchemaInterface = z.infer<typeof ZSignUpSchema>;

/**
 * Default form values for the sign-up form.
 * All fields initialized as empty strings.
 */
const defaultFormValues: ISignUpSchemaInterface = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

/**
 * TanStack React Form configuration options for the sign-up form.
 * Provides default values and validation rules for both blur and submit events.
 */
export const signUpFromOpts = formOptions({
  defaultValues: defaultFormValues,
  validators: {
    onBlur: ZSignUpSchema,
    onSubmit: ZSignUpSchema,
  },
});
