export async function fetchProducts(query?: string) {
  const res = await fetch(
    `http://localhost:5000/api/v1/products${query ? `?q=${query}` : ''}`
  );
  if (!res.ok) throw new Error('Failed to fetch products');
  const json = await res.json();
  return json.data.products;
}

export async function fetchProductById(productId: string) {
  const res = await fetch(
    `http://localhost:5000/api/v1/products/id/${productId}`,
    {
      credentials: 'include',
    }
  );
  if (!res.ok) throw new Error('Failed to fetch product from client');
  const data = await res.json();
  return data?.data?.product;
}

export async function fetchProductBySlug(slug: string) {
  const res = await fetch(`http://localhost:5000/api/v1/products/slug/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  const json = await res.json();
  return json.data.product;
}

export async function createProduct(formData: FormData) {
  const res = await fetch('http://localhost:5000/api/v1/products', {
    method: 'POST',
    body: formData,
    credentials: 'include', // Ensure cookies (auth) are sent
  });
  if (!res.ok) throw new Error('Failed to create product');
  const json = await res.json();
  return json.data.product;
}
