import { notFound } from "next/navigation";

import { getProductBySlug } from "@/lib/supabase/products";
import { getProductImages } from "@/lib/supabase/product-images";

import ProductGallery from "@/components/products/ProductGallery";
import ProductActions from "@/components/products/ProductActions";
import Link from "next/link";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: Props) {
  const { slug } = await params;

  const product =
    await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const sizeInventory = (
  product.size_inventory ?? {}
) as Record<
  string,
  number
>;

  const totalStock =
  Object.values(
    sizeInventory
  ).reduce<number>(
    (
      total,
      qty
    ) =>
      total +
      Number(qty),
    0
  );

  const galleryImages =
    await getProductImages(
      product.id
    );

  return (
    <div className="min-h-screen bg-[#f8f5f2] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Product Images */}
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

            <span
              className="
                w-fit
                px-4
                py-2
                bg-[#4a0f0f]
                text-white
                rounded-full
                text-sm
                mb-4
              "
            >
              JENTARA COLLECTION
            </span>

            <h1
              className="
                text-6xl
                font-bold
                text-[#4a0f0f]
                leading-tight
              "
            >
              {product.name}
            </h1>

            <div
              className="
                mt-8
                flex
                items-center
                gap-4
              "
            >
              <span
                className="
                  text-4xl
                  font-bold
                "
              >
                ₹{product.price}
              </span>

              <span
                className={`font-medium ${
                  totalStock > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {totalStock > 0
                  ? "In Stock"
                  : "Out Of Stock"}
              </span>
            </div>

            <div
              className="
                mt-8
                bg-white
                p-6
                rounded-2xl
                shadow-sm
              "
            >
              <h3
                className="
                  text-xl
                  font-semibold
                  mb-3
                "
              >
                Product Description
              </h3>

              <p
                className="
                  text-gray-600
                  leading-8
                "
              >
                {product.description}
              </p>
            </div>

            <div className="mt-8">
              <h3
                className="
                  font-semibold
                  text-xl
                  mb-4
                "
              >
                Highlights
              </h3>

              <ul
                className="
                  space-y-2
                  text-gray-600
                "
              >
                <li>
                  ✓ Premium Quality Fabric
                </li>

                <li>
                  ✓ Comfortable Fit
                </li>

                <li>
                  ✓ Fashion Forward Design
                </li>

                <li>
                  ✓ Easy Returns
                </li>
              </ul>
            </div>

            <div className="mb-4 flex items-center justify-between">
  <h3
    className="
      text-[10px]
      font-semibold
      uppercase
      tracking-[0.18em]
      text-[#451713]
    "
  >
    Select Size
  </h3>

  <Link
    href="/size-guide"
    className="
      text-[9px]
      font-semibold
      uppercase
      tracking-[0.14em]
      text-[#451713]
      underline
      underline-offset-4
      transition-opacity
      hover:opacity-50
    "
  >
    Size Guide →
  </Link>
</div>

            {totalStock > 0 ? (
              <ProductActions
                product={product}
                sizeInventory={
                  sizeInventory
                }
              />
            ) : (
              <button
                disabled
                className="
                  mt-10
                  w-full
                  bg-red-500
                  text-white
                  py-4
                  rounded-xl
                  font-semibold
                  cursor-not-allowed
                "
              >
                Out Of Stock
              </button>
            )}

            <div
              className="
                mt-10
                border-t
                pt-6
                text-sm
                text-gray-500
                space-y-2
              "
            >
              <p>
                🚚 Free Shipping on
                Orders Above ₹999
              </p>

              <p>
                🔄 7 Days Easy Return
                Policy
              </p>

              <p>
                🔒 Secure Checkout
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}