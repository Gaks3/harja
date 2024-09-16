"use server";

import { writeFile, unlink } from "fs/promises";
import { join } from "path";

export const upload = async (
  data: FormData,
): Promise<{ url?: string; error?: string }> => {
  const sizeLimit = 10_000_000;

  const file: File | null = data.get("file") as unknown as File;

  if (!file.type.includes("image")) return { error: "Please upload an image" };
  if (file.size > sizeLimit) return { error: "Max size 10MB" };
  if (!file) return { error: "Something field are missing" };

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const randomString = crypto.randomUUID();

  const fileName = `${randomString.slice(0, 10)}.${file.name.split(".")[1]}`;

  const folderPathName = process.cwd() + "/public";

  const path = join(folderPathName, fileName);
  console.log(path);
  await writeFile(path, buffer);

  return { url: fileName };
};

export const deleteImage = async (
  path: string,
): Promise<void | { error?: string }> => {
  const folderPathName = process.env.PATHNAME_UPLOAD;

  try {
    await unlink(folderPathName + "/" + path.slice(1));
  } catch (e) {
    console.error(e);
    return { error: "Error to delete file" };
  }
};
