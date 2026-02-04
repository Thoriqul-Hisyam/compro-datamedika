"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  return prisma.articleCategory.findMany({
    orderBy: { name: "asc" },
  });
}

export async function createCategory(formData: FormData) {
  await prisma.articleCategory.create({
    data: {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
    },
  });

  revalidatePath("/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  await prisma.articleCategory.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
    },
  });

  revalidatePath("/categories");
}

export async function deleteCategory(id: string) {
  await prisma.articleCategory.delete({
    where: { id },
  });

  revalidatePath("/categories");
}
