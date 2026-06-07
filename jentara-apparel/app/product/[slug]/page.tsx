import { getProductBySlug } from "@/lib/supabase/products";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import AddToWishlistButton from "@/components/products/AddToWishlistButton";
import Image from "next/image";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container-custom py-20">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="aspect-square rounded-xl overflow-hidden relative">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-neutral-200" />
          )}
        </div>

        <div>
          <h1 className="text-5xl font-bold">
            {product.name}
          </h1>

          <p className="text-2xl mt-6">
            ₹{product.price}
          </p>

          <p className="mt-8 text-neutral-600">
            {product.description}
          </p>

          <AddToCartButton
            id={product.id}
            name={product.name}
            price={product.price}
            image_url={product.image_url}
          />
          <AddToWishlistButton product={product} />
        </div>
      </div>
    </div>
  );
}