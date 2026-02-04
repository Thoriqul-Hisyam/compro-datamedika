"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { uploadFile, deleteFile } from "@/lib/upload";

export async function getArticles() {
  return prisma.article.findMany({
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      author: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPublicArticles(categoryId?: string, search?: string) {
  return prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      ...(categoryId ? {
        categories: {
          some: {
            categoryId
          }
        }
      } : {}),
      ...(search ? {
        OR: [
          { title: { contains: search } },
          { content: { contains: search } },
        ]
      } : {})
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      author: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPublicArticleBySlug(slug: string) {
  return prisma.article.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      author: true,
    },
  });
}

export async function createArticle(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const categoryIds = formData.getAll("categoryIds") as string[];
  const imageFile = formData.get("image") as File;
  const imageUrl = await uploadFile(imageFile);

  const article = await prisma.article.create({
    data: {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      content: formData.get("content") as string,
      status: (formData.get("status") as any) || "PUBLISHED",
      image: imageUrl,
      metaTitle: formData.get("metaTitle") as string,
      metaDescription: formData.get("metaDescription") as string,
      authorId: session.id,
      categories: {
        create: categoryIds.map((categoryId) => ({
          category: {
            connect: { id: categoryId },
          },
        })),
      },
    },
  });

  revalidatePath("/artikel");
  return { success: true, article };
}

export async function updateArticle(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  // Get current article to check for old image
  const current = await prisma.article.findUnique({
    where: { id },
    select: { image: true }
  });

  const categoryIds = formData.getAll("categoryIds") as string[];
  const imageFile = formData.get("image") as File;
  const imageUrl = await uploadFile(imageFile);

  const data: any = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    content: formData.get("content") as string,
    status: (formData.get("status") as any) || "PUBLISHED",
    metaTitle: formData.get("metaTitle") as string,
    metaDescription: formData.get("metaDescription") as string,
    categories: {
      deleteMany: {},
      create: categoryIds.map((categoryId) => ({
        category: {
          connect: { id: categoryId },
        },
      })),
    },
  };

  if (imageUrl) {
    data.image = imageUrl;
    // Delete old image if it exists
    if (current?.image) {
      await deleteFile(current.image);
    }
  }

  const article = await prisma.article.update({
    where: { id },
    data,
  });

  revalidatePath("/artikel");
  return { success: true, article };
}

export async function deleteArticle(id: string) {
  const current = await prisma.article.findUnique({
    where: { id },
    select: { image: true }
  });

  if (current?.image) {
    await deleteFile(current.image);
  }

  await prisma.article.delete({
    where: { id },
  });

  revalidatePath("/artikel");
}
