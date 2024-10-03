import z from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const SignupSchema = z.object({
  email: requiredString.email("Invalid email address"),
  username: requiredString.regex(
    /^[a-zA-Z0-9]+$/,
    "Only letters and numbers, -, and _ are allowed",
  ),
  password: requiredString.min(
    8,
    "Password must be at least 8 characters long",
  ),
});

export type SignupData = z.infer<typeof SignupSchema>;

export const SigninSchema = z.object({
  email: requiredString.email("Invalid email address"),
  password: requiredString.min(
    8,
    "Password must be at least 8 characters long",
  ),
});

export type SigninData = z.infer<typeof SigninSchema>;
