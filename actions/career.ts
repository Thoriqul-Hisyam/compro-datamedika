"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { uploadFile, deleteFile } from "@/lib/upload";

export async function getCareers() {
  return prisma.career.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getPublicCareers() {
  return prisma.career.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPublicCareerBySlug(slug: string) {
  return prisma.career.findUnique({
    where: { slug, status: "PUBLISHED" },
  });
}

export async function createCareer(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const imageFile = formData.get("image") as File;
  const imageUrl = await uploadFile(imageFile);

  try {
    const metaTitle = formData.get("metaTitle") as string;
    const metaDescription = formData.get("metaDescription") as string;

    const career = await prisma.career.create({
      data: {
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        description: formData.get("description") as string,
        location: formData.get("location") as string,
        type: formData.get("type") as string,
        status: (formData.get("status") as any) || "PUBLISHED",
        image: imageUrl,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        createdById: session.id,
      },
    });

    revalidatePath("/karir");
    return { success: true, career };
  } catch (error) {
    throw error;
  }
}

export async function updateCareer(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const current = await prisma.career.findUnique({
    where: { id },
    select: { image: true }
  });

  const metaTitle = formData.get("metaTitle") as string;
  const metaDescription = formData.get("metaDescription") as string;

  const data: any = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    location: formData.get("location") as string,
    type: formData.get("type") as string,
    status: (formData.get("status") as any) || "PUBLISHED",
    metaTitle: metaTitle || null,
    metaDescription: metaDescription || null,
  };

  const imageFile = formData.get("image") as File;
  const imageUrl = await uploadFile(imageFile);
  if (imageUrl) {
    data.image = imageUrl;
    if (current?.image) {
      await deleteFile(current.image);
    }
  }

  try {
    const career = await prisma.career.update({
      where: { id },
      data,
    });

    revalidatePath("/karir");
    return { success: true, career };
  } catch (error) {
    throw error;
  }
}

export async function deleteCareer(id: string) {
  const current = await prisma.career.findUnique({
    where: { id },
    select: { image: true }
  });

  if (current?.image) {
    await deleteFile(current.image);
  }

  await prisma.career.delete({
    where: { id },
  });

  revalidatePath("/karir");
}
