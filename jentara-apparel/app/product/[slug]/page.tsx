import { getProductBySlug } from "@/lib/supabase/products";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import AddToWishlistButton from "@/components/products/AddToWishlistButton";
import ProductGallery
from "@/components/products/ProductGallery";

import {
  getProductImages,
} from "@/lib/supabase/product-images";

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

const galleryImages =
  await getProductImages(
    product.id
  );

  if (!product) {
    notFound();
  }

  return (
  <div className="min-h-screen bg-[#f8f5f2] py-16">

    <div className="max-w-7xl mx-auto px-6">

      <div className="grid lg:grid-cols-2 gap-16">

        {/* Product Image */}
        <div>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

            <div className="aspect-square relative">

              <ProductGallery
  mainImage={
    product.image_url
  }
  galleryImages={
    galleryImages ?? []
  }
  productName={
    product.name
  }
/>

            </div>

          </div>

        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">

          {/* Category Badge */}
          <span className="w-fit px-4 py-2 bg-[#4a0f0f] text-white rounded-full text-sm mb-4">
            JENTARA COLLECTION
          </span>

          {/* Product Name */}
          <h1 className="text-6xl font-bold text-[#4a0f0f] leading-tight">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mt-8 flex items-center gap-4">

            <span className="text-4xl font-bold">
              ₹{product.price}
            </span>

            <span className="text-green-600 font-medium">
              In Stock
            </span>

          </div>

          {/* Description */}
          <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm">

            <h3 className="text-xl font-semibold mb-3">
              Product Description
            </h3>

            <p className="text-gray-600 leading-8">
              {product.description}
            </p>

          </div>

          {/* Features */}
          <div className="mt-8">

            <h3 className="font-semibold text-xl mb-4">
              Highlights
            </h3>

            <ul className="space-y-2 text-gray-600">
              <li>✓ Premium Quality Fabric</li>
              <li>✓ Comfortable Fit</li>
              <li>✓ Fashion Forward Design</li>
              <li>✓ Easy Returns</li>
            </ul>

          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-10">

            <div className="flex-1">
              <AddToCartButton
                id={product.id}
                name={product.name}
                price={product.price}
                image_url={product.image_url}
              />
            </div>

            <div>
              <AddToWishlistButton
                product={product}
              />
            </div>

          </div>

          {/* Extra Info */}
          <div className="mt-10 border-t pt-6 text-sm text-gray-500 space-y-2">

            <p>🚚 Free Shipping on Orders Above ₹999</p>
            <p>🔄 7 Days Easy Return Policy</p>
            <p>🔒 Secure Checkout</p>

          </div>

        </div>

      </div>

    </div>

  </div>
);

}