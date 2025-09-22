
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Heart, HeartOff } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/data/mockData";
import LazyImage from "@/components/LazyImage";
import { useWishlist } from "@/hooks/useWishlist";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-md">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square relative overflow-hidden">
          <LazyImage
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {wishlisted ? (
              <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            ) : (
              <Heart className="h-5 w-5 text-gray-400" />
            )}
          </button>
          {product.featured && (
            <div className="absolute top-2 left-2 bg-accent text-black px-2 py-1 rounded text-xs font-bold">
              FEATURED
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium truncate">{product.name}</h3>
          <p className="text-lg font-semibold mt-1">{formatCurrency(product.price)}</p>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 space-y-2">
          <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
            <span>Free shipping</span>
            <span>⭐ 4.5 (234)</span>
          </div>
          <div className="flex gap-2 w-full">
            <Button 
              onClick={handleAddToCart} 
              variant="outline"
              size="sm"
              className="flex-1"
              aria-label={`Add ${product.name} to cart`}
            >
              Add to cart
            </Button>
            <Button 
              onClick={handleAddToCart} 
              size="sm"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              aria-label={`Buy ${product.name} now`}
            >
              Buy It Now
            </Button>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
