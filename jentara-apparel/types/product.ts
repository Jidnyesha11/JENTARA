export interface Product {
  id: string;
  category_id: string;

  name: string;
  slug: string;
  description: string;

  price: number;
  compare_price?: number;

  stock: number;

  image_url: string;

  featured: boolean;

  created_at: string;
}