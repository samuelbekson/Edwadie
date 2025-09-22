
import { Product, Category } from "@/types";

export const categories: Category[] = [
  {
    id: "slub-glass",
    name: "Slub Glass",
    image: "/placeholder.svg"
  },
  {
    id: "ladies-bags",
    name: "Ladies Bags",
    image: "/placeholder.svg"
  },
  {
    id: "tote-bags",
    name: "Tote Bags",
    image: "/placeholder.svg"
  },
  {
    id: "dresses",
    name: "Dresses",
    image: "/placeholder.svg"
  },
  {
    id: "shoes",
    name: "Shoes",
    image: "/placeholder.svg"
  },
  {
    id: "heels",
    name: "Heels",
    image: "/placeholder.svg"
  },
  {
    id: "slippers",
    name: "Slippers",
    image: "/placeholder.svg"
  },
  {
    id: "bed-sheets",
    name: "Bed Sheets",
    image: "/placeholder.svg"
  },
  {
    id: "curtains",
    name: "Curtains",
    image: "/placeholder.svg"
  },
  {
    id: "body-splash",
    name: "Body Splash",
    image: "/placeholder.svg"
  },
  {
    id: "nightwear",
    name: "Nightwear",
    image: "/placeholder.svg"
  }
];

export const products: Product[] = [
  {
    id: "1",
    name: "Crystal Clear Slub Glass Set",
    price: 120,
    image: "/placeholder.svg",
    category: "slub-glass",
    description: "A set of 4 premium slub glasses, perfect for serving drinks in style.",
    featured: true,
    inStock: true
  },
  {
    id: "2",
    name: "Designer Tote Bag",
    price: 250,
    image: "/placeholder.svg",
    category: "tote-bags",
    description: "Spacious and stylish tote bag with multiple compartments.",
    featured: true,
    inStock: true
  },
  {
    id: "3",
    name: "Elegant Evening Dress",
    price: 399,
    image: "/placeholder.svg",
    category: "dresses",
    description: "A beautiful evening dress, perfect for special occasions.",
    featured: true,
    inStock: true
  },
  {
    id: "4",
    name: "Stylish Heels",
    price: 180,
    image: "/placeholder.svg",
    category: "heels",
    description: "Comfortable and stylish heels that go with any outfit.",
    featured: false,
    inStock: true
  },
  {
    id: "5",
    name: "Luxury Bed Sheet Set",
    price: 350,
    image: "/placeholder.svg",
    category: "bed-sheets",
    description: "Premium cotton bed sheets with a smooth finish.",
    featured: true,
    inStock: true
  },
  {
    id: "6",
    name: "Elegant Curtain Pair",
    price: 420,
    image: "/placeholder.svg",
    category: "curtains",
    description: "Blackout curtains with elegant design to enhance your home decor.",
    featured: false,
    inStock: true
  },
  {
    id: "7",
    name: "Premium Body Splash",
    price: 85,
    image: "/placeholder.svg",
    category: "body-splash",
    description: "Long-lasting fragrance for a refreshing feel.",
    featured: true,
    inStock: true
  },
  {
    id: "8",
    name: "Comfortable Slippers",
    price: 60,
    image: "/placeholder.svg",
    category: "slippers",
    description: "Soft and comfortable slippers for home use.",
    featured: false,
    inStock: true
  },
  {
    id: "9",
    name: "Elegant Nightwear Set",
    price: 175,
    image: "/placeholder.svg",
    category: "nightwear",
    description: "Comfortable and stylish nightwear set made from premium cotton.",
    featured: true,
    inStock: true
  },
  {
    id: "10",
    name: "Premium Ladies Handbag",
    price: 320,
    image: "/placeholder.svg",
    category: "ladies-bags",
    description: "Elegant handbag with multiple compartments for everyday use.",
    featured: true,
    inStock: true
  },
  {
    id: "11",
    name: "Casual Shoes",
    price: 150,
    image: "/placeholder.svg",
    category: "shoes",
    description: "Comfortable casual shoes for everyday wear.",
    featured: false,
    inStock: true
  },
  {
    id: "12",
    name: "Designer Clutch Bag",
    price: 180,
    image: "/placeholder.svg",
    category: "ladies-bags",
    description: "Stylish clutch bag, perfect for evening events.",
    featured: false,
    inStock: true
  }
];

export const formatCurrency = (amount: number): string => {
  return `₵${amount.toFixed(2)}`;
};
