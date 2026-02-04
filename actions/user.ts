"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import bcrypt from "bcryptjs";

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
        id: true,
        username: true,
        name: true,
        role: true,
        createdAt: true,
    }
  });
}

export async function createUser(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "SUPERADMIN") throw new Error("Unauthorized");

  const password = formData.get("password") as string;
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username: formData.get("username") as string,
      password: hashedPassword,
      name: formData.get("name") as string,
      role: formData.get("role") as any || "ADMIN",
    },
  });

  revalidatePath("/users");
}

export async function updateUser(id: string, formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "SUPERADMIN") throw new Error("Unauthorized");

  const data: any = {
    username: formData.get("username") as string,
    name: formData.get("name") as string,
    role: formData.get("role") as any,
  };

  const password = formData.get("password") as string;
  if (password && password.trim() !== "") {
    data.password = await bcrypt.hash(password, 10);
  }

  await prisma.user.update({
    where: { id },
    data,
  });

  revalidatePath("/users");
}

export async function deleteUser(id: string) {
    const session = await getSession();
    if (!session || session.role !== "SUPERADMIN") throw new Error("Unauthorized");
    
    // Safety check: Don't delete self
    if (session.id === id) throw new Error("Cannot delete yourself");

    await prisma.user.delete({
        where: { id },
    });

    revalidatePath("/users");
}
