"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import * as z from "zod";
import { RegisterSchema } from "../schemas";
import { getUserByEmail } from "../data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "../src/lib/mail";
import { use } from "react";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name, number, role } = validatedFields.data;

  if (
    role.toLocaleLowerCase() !== "farmer" &&
    role.toLocaleLowerCase() !== "buyer"
  ) {
    return { error: "Role should be entered properly" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already exists" };
  }

  await db.user.create({
    data: { email, password: hashedPassword, name, number, role },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
