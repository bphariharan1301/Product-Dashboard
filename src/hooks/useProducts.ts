// Custom hooks for product API calls
"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, createProduct, updateProduct, deleteProduct, fetchCategories } from '@/lib/api';

export const useProducts = (limit = 10, skip = 0, search?: string, delay = 0, category?: string) => {
  return useQuery({
    queryKey: ['products', { limit, skip, search, delay, category }],
    queryFn: () => fetchProducts(limit, skip, search, delay, category),
  });
};

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => createProduct(payload),
    onSuccess: () => {
      setTimeout(() => qc.invalidateQueries({ queryKey: ['products'] }), 1000);
    },
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: any) => updateProduct(id, payload),
    onSuccess: () => {
      setTimeout(() => qc.invalidateQueries({ queryKey: ['products'] }), 1000);
    },
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      setTimeout(() => qc.invalidateQueries({ queryKey: ['products'] }), 1000);
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};
