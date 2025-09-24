export async function fetchProducts(query?: string) {
  const res = await fetch(
    `http://localhost:5000/api/v1/products${query ? `?q=${query}` : ''}`
  );
  if (!res.ok) throw new Error('Failed to fetch products');
  const json = await res.json();
  return json.data.products;
}

export async function fetchProductById(id: string) {
  const res = await fetch(`http://localhost:5000/api/v1/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  const json = await res.json();
  return json.data.product;
}
export async function fetchProductBySlug(slug: string) {
  const res = await fetch(`http://localhost:5000/api/v1/products/slug/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  const json = await res.json();
  return json.data.product;
}

