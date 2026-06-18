import { supabase } from "./client";
import { uploadProductImage } from "./storage";

export async function getProductImages(
  productId: string
) {
  const { data, error } =
    await supabase
      .from("product_images")
      .select("*")
      .eq(
        "product_id",
        productId
      );

  if (error) {
    throw error;
  }

  return data;
}
export async function addProductImage(
  productId: string,
  imageUrl: string
) {
  const { error } =
    await supabase
      .from("product_images")
      .insert({
        product_id:
          productId,
        image_url:
          imageUrl,
      });

  if (error) {
    throw error;
  }
}

export async function uploadGalleryImage(
  productId: string,
  file: File
) {
  const imageUrl =
    await uploadProductImage(
      file
    );

  await addProductImage(
    productId,
    imageUrl
  );
}

export async function deleteGalleryImage(
  id: string
) {
  const { error } =
    await supabase
      .from("product_images")
      .delete()
      .eq("id", id);

  if (error) {
    throw error;
  }
}