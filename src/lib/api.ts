
// Custom file for API functions to import wherever needed in the app

export const API_BASE = 'https://dummyjson.com'; // WIll be put into env var when using in production. For now, I am keeping it harcoded as this is mock-up the states and working of the app with the API connected

export async function fetchProducts(limit = 10, skip = 0, search?: string, delay = 0, category?: string) {
  const params = new URLSearchParams({ limit: String(limit), skip: String(skip) });
  if (delay && delay > 0) params.set('delay', String(delay));

  let url: string;
  if (search) {
    url = `${API_BASE}/products/search?q=${encodeURIComponent(search)}&${params}`;
  } else if (category && category !== "all") {
    url = `${API_BASE}/products/category/${encodeURIComponent(category)}?${params}`;
  } else {
    url = `${API_BASE}/products?${params}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function createProduct(payload: any) {
  const res = await fetch(`${API_BASE}/products/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
}

export async function updateProduct(id: number, payload: any) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

export async function deleteProduct(id: number) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete product');
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/products/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

