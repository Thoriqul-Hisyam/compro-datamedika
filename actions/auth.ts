"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { login_user, logout_user } from "@/lib/session";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username dan password wajib diisi" };
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: "Username atau password salah" };
  }

  await login_user({
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
  });

  redirect("/dashboard");
}

export async function logout() {
  await logout_user();
  redirect("/login");
}
