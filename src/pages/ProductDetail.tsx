
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import { products, formatCurrency } from "@/data/mockData";
import ProductGrid from "@/components/products/ProductGrid";
import { LazyImage } from "@/components/ui/LazyImage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductJsonLd } from "@/components/seo/ProductJsonLd";
import { useWishlist } from "@/hooks/useWishlist";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const handleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  // Find the product by ID
  const product = products.find(p => p.id === id);
  
  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => product && p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="mb-6">Sorry, the product you are looking for does not exist or has been removed.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container py-12">
      <Breadcrumbs />
      <ProductJsonLd
        id={product.id}
        name={product.name}
        description={product.description}
        image={product.image}
        price={product.price}
        inStock={product.inStock}
      />
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-muted rounded-lg overflow-hidden">
          <LazyImage
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover aspect-square"
          />
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            {product.name}
            <button
              onClick={handleWishlist}
              aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
              className="p-2 rounded-full bg-white/80 hover:bg-white shadow focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {wishlisted ? (
                <Heart className="h-6 w-6 text-red-500 fill-red-500" />
              ) : (
                <Heart className="h-6 w-6 text-gray-400" />
              )}
            </button>
          </h1>
          <p className="text-2xl font-semibold mb-4 text-primary">
            {formatCurrency(product.price)}
          </p>
          
          <div className="border-t border-b py-4 my-4">
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          <div className="my-6 flex items-center">
            <div className="flex items-center border rounded-md mr-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-16 text-center border-0"
                aria-label="Product quantity"
              />
              <Button variant="ghost" size="icon" onClick={increaseQuantity} aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              onClick={handleAddToCart} 
              className="flex-1 gap-2 bg-brand-green hover:bg-brand-green/80 text-white"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
          
          <div className="mt-auto">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Category:</span>{" "}
              {product.category}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Availability:</span>{" "}
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <ProductGrid products={relatedProducts} title="You may also like" />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
