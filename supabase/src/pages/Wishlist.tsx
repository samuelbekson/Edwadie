import React from "react";
import { useWishlist } from "@/hooks/useWishlist";
import { products } from "@/data/mockData";
import ProductGrid from "@/components/products/ProductGrid";
import { Heart } from "lucide-react";

const Wishlist: React.FC = () => {
  const { wishlist } = useWishlist();
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Heart className="h-7 w-7 text-red-500" /> Wishlist
      </h1>
      {wishlistedProducts.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground text-lg">
          Your wishlist is empty.
        </div>
      ) : (
        <ProductGrid products={wishlistedProducts} />
      )}
    </div>
  );
};

export default Wishlist;
