import { supabase } from "./client";

export async function uploadProductImage(
  file: File
) {
  const fileExt =
    file.name.split(".").pop();

  const fileName =
    `${crypto.randomUUID()}.${fileExt}`;

  const { error } =
    await supabase.storage
      .from("products")
      .upload(
        fileName,
        file
      );

  if (error) {
    throw error;
  }

  const { data } =
    supabase.storage
      .from("products")
      .getPublicUrl(
        fileName
      );

  return data.publicUrl;
}

export async function deleteProductImage(
  imageUrl: string
) {
  if (!imageUrl) {
    return;
  }

  const fileName =
    imageUrl
      .split("/products/")[1];

  if (!fileName) {
    return;
  }

  const { error } =
    await supabase.storage
      .from("products")
      .remove([
        fileName,
      ]);

  if (error) {
    throw error;
  }
}