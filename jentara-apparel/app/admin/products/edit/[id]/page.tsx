// app/admin/products/edit/[id]/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCategories } from "@/lib/supabase/categories";
import { getProductById, updateProduct } from "@/lib/supabase/admin-products";
import { uploadGalleryImage } from "@/lib/supabase/product-images";
import { uploadProductImage } from "@/lib/supabase/storage";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<any>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [featured, setFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [inventory, setInventory] = useState<Record<string, number>>(
    Object.fromEntries(sizes.map((size) => [size, 0])),
  );

  useEffect(() => {
    Promise.all([getProductById(params.id), getCategories()])
      .then(([data, categoryData]) => {
        setProduct(data);
        setCategories(categoryData);
        setName(data.name ?? "");
        setSlug(data.slug ?? "");
        setDescription(data.description ?? "");
        setPrice(String(data.price ?? ""));
        setOriginalPrice(String(data.original_price ?? ""));
        setCategoryId(data.category_id ?? "");
        setFeatured(Boolean(data.featured));
        setImageUrl(data.image_url ?? "");
        setInventory(
          Object.fromEntries(
            sizes.map((size) => [size, Number(data.size_inventory?.[size] ?? 0)]),
          ),
        );
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [params.id]);

  const stock = useMemo(
    () => Object.values(inventory).reduce((sum, value) => sum + Number(value || 0), 0),
    [inventory],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    try {
      let nextImageUrl = imageUrl;

      if (imageFile) {
        nextImageUrl = await uploadProductImage(imageFile);
      }

      await updateProduct(params.id, {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
        price: Number(price),
        original_price: Number(originalPrice || price),
        category_id: categoryId || null,
        featured,
        image_url: nextImageUrl,
        sizes: sizes.filter((size) => inventory[size] > 0).join(","),
        size_inventory: inventory,
        stock,
      });

      for (const file of galleryFiles) {
        await uploadGalleryImage(params.id, file);
      }

      setImageUrl(nextImageUrl);
      setProduct((current: any) => ({
        ...current,
        name,
        slug,
        description,
        price: Number(price),
        original_price: Number(originalPrice || price),
        category_id: categoryId,
        featured,
        image_url: nextImageUrl,
        size_inventory: inventory,
        stock,
      }));

      window.alert("Product updated.");
    } catch (error) {
      console.error(error);
      window.alert(error instanceof Error ? error.message : "Product could not be updated.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="mx-auto max-w-[1200px] px-5 py-20 text-[9px] uppercase tracking-[0.2em]">Loading product</div>;
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-[1200px] px-5 py-20 text-center">
        <p className="font-serif text-3xl">Product not found.</p>
        <button type="button" onClick={() => router.push("/admin/products")} className="mt-5 text-[9px] font-semibold uppercase tracking-[0.18em] underline">
          Back to products →
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <button
        type="button"
        onClick={() => router.push("/admin/products")}
        className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#451713]/45 underline underline-offset-4"
      >
        ← Products
      </button>

      <header className="mt-7 border-b border-[#451713]/15 pb-10">
        <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
          JENTARA / COMMERCE / EDIT
        </p>
        <h1 className="mt-6 font-serif text-[50px] leading-[0.9] tracking-[-0.06em] sm:text-[70px]">
          Edit Product
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="grid gap-10 py-10 lg:grid-cols-[1fr_0.65fr]">
        <div className="space-y-10">
          <section className="border border-[#451713]/12 p-6 sm:p-8">
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">Product identity</p>

            <label className="mt-7 block text-[8px] font-semibold uppercase tracking-[0.18em]">
              Name
              <input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full border-b border-[#451713]/25 bg-transparent py-3 text-[13px] outline-none focus:border-[#451713]" />
            </label>

            <label className="mt-7 block text-[8px] font-semibold uppercase tracking-[0.18em]">
              Slug
              <input value={slug} onChange={(event) => setSlug(event.target.value)} className="mt-2 w-full border-b border-[#451713]/25 bg-transparent py-3 text-[13px] outline-none focus:border-[#451713]" />
            </label>

            <label className="mt-7 block text-[8px] font-semibold uppercase tracking-[0.18em]">
              Description
              <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={6} className="mt-2 w-full resize-none border border-[#451713]/15 bg-transparent p-4 text-[12px] leading-6 outline-none focus:border-[#451713]" />
            </label>

            <label className="mt-7 block text-[8px] font-semibold uppercase tracking-[0.18em]">
              Category
              <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)} className="mt-2 min-h-11 w-full border border-[#451713]/15 bg-transparent px-3 text-[11px] outline-none">
                <option value="">Uncategorised</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </label>
          </section>

          <section className="border border-[#451713]/12 p-6 sm:p-8">
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">Pricing</p>
            <div className="mt-7 grid gap-7 sm:grid-cols-2">
              <label className="text-[8px] font-semibold uppercase tracking-[0.18em]">
                Selling price
                <input type="number" min="0" value={price} onChange={(event) => setPrice(event.target.value)} className="mt-2 w-full border-b border-[#451713]/25 bg-transparent py-3 font-serif text-2xl outline-none focus:border-[#451713]" />
              </label>
              <label className="text-[8px] font-semibold uppercase tracking-[0.18em]">
                Original price
                <input type="number" min="0" value={originalPrice} onChange={(event) => setOriginalPrice(event.target.value)} className="mt-2 w-full border-b border-[#451713]/25 bg-transparent py-3 font-serif text-2xl outline-none focus:border-[#451713]" />
              </label>
            </div>
          </section>

          <section className="border border-[#451713]/12 p-6 sm:p-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">Inventory</p>
                <h2 className="mt-2 font-serif text-3xl">{stock} units</h2>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-px border border-[#451713]/10 bg-[#451713]/10 sm:grid-cols-3">
              {sizes.map((size) => (
                <label key={size} className="bg-[#f5ede4] p-4">
                  <span className="text-[8px] font-semibold uppercase tracking-[0.15em]">{size}</span>
                  <input type="number" min="0" value={inventory[size]} onChange={(event) => setInventory((current) => ({ ...current, [size]: Math.max(0, Number(event.target.value) || 0) }))} className="mt-3 w-full border-b border-[#451713]/20 bg-transparent py-2 font-serif text-2xl outline-none focus:border-[#451713]" />
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-10 lg:self-start">
          <section className="border border-[#451713]/12 p-6 sm:p-8">
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">Primary image</p>
            <div className="relative mt-6 aspect-[4/5] overflow-hidden bg-[#e8ded4]">
              {previewUrl || imageUrl ? (
                <Image src={previewUrl || imageUrl} alt={name} fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-[8px] uppercase tracking-[0.15em] text-[#451713]/35">No image</div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                setImageFile(file);
                setPreviewUrl(URL.createObjectURL(file));
              }}
              className="mt-5 w-full text-[10px]"
            />
          </section>

          <section className="border border-[#451713]/12 p-6 sm:p-8">
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">Gallery</p>
            <p className="mt-2 text-[10px] leading-5 text-[#451713]/45">Upload additional product imagery.</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(event) => setGalleryFiles(Array.from(event.target.files ?? []))}
              className="mt-5 w-full text-[10px]"
            />
            {galleryFiles.length > 0 && (
              <p className="mt-3 text-[9px] uppercase tracking-[0.12em] text-[#451713]/45">
                {galleryFiles.length} image{galleryFiles.length === 1 ? "" : "s"} selected
              </p>
            )}
          </section>

          <label className="flex items-start gap-3 border border-[#451713]/12 p-6 sm:p-8">
            <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} className="mt-0.5" />
            <span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.16em]">Featured piece</span>
              <span className="mt-2 block text-[10px] leading-5 text-[#451713]/45">Show this product in featured storefront sections.</span>
            </span>
          </label>

          <button type="submit" disabled={saving} className="flex min-h-13 w-full items-center justify-between bg-[#451713] px-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#f5ede4] disabled:opacity-50">
            <span>{saving ? "Saving..." : "Save changes"}</span>
            <span>→</span>
          </button>
        </aside>
      </form>
    </div>
  );
}
