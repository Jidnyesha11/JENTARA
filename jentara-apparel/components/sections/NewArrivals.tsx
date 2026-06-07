import ProductCard from "@/components/products/ProductCard";

const products = [
  {
    id: "1",
    name: "Championship Oversized Tee",
    slug: "championship",
    description: "",
    price: 999,
    compare_price: 1299,
    image_url: "",
    featured: true,
    category_id: "1",
    stock: 10,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Sakura Oversized Tee",
    slug: "sakura",
    description: "",
    price: 999,
    compare_price: 1299,
    image_url: "",
    featured: true,
    category_id: "1",
    stock: 8,
    created_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "Street Culture Tee",
    slug: "street-culture",
    description: "",
    price: 999,
    compare_price: 1299,
    image_url: "",
    featured: true,
    category_id: "2",
    stock: 5,
    created_at: "2026-01-03T00:00:00Z",
  },
];

export default function NewArrivals() {
  return (
    <section className="py-24">

      <div className="container-custom">

        <h2 className="text-5xl font-bold text-center">
          New Arrivals
        </h2>

        <p className="text-center mt-4 text-gray-500">
          Stay ahead of the curve with our newest arrivals.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>
    </section>
  );
}