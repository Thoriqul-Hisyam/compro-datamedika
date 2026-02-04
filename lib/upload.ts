import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import fs from "fs";

export async function uploadFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const name = `${timestamp}-${file.name.replace(/\s+/g, "-")}`;
    const relativePath = `/uploads/${name}`;
    const absolutePath = join(process.cwd(), "public", "uploads", name);

    // Ensure directory exists
    const uploadDir = join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    await writeFile(absolutePath, buffer);
    return relativePath;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}

export async function deleteFile(path: string | null) {
  if (!path) return;

  try {
    // Relative path is like /uploads/filename
    const absolutePath = join(process.cwd(), "public", path);
    if (fs.existsSync(absolutePath)) {
      await unlink(absolutePath);
    }
  } catch (error) {
    console.error("Delete file error:", error);
  }
}
