// src/types/index.ts

// User (sudah ada)
export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

// Product (sudah ada)
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

// Cart Item (sudah ada)
export interface CartItem {
  product: Product;
  quantity: number;
}

// Create Product DTO (baru)
export interface CreateProductDTO {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

// Update Product DTO (baru)
export interface UpdateProductDTO {
  title?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  images?: string[];
}