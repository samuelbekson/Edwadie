
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  featured?: boolean;
  inStock: boolean;
}

export interface User {
  id: string;
  phoneNumber: string;
  name?: string;
  email: string; // Added email property
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}
