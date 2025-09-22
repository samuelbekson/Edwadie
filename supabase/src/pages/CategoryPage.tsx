
import React from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "@/components/products/ProductGrid";
import { products, categories } from "@/data/mockData";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the category by ID
  const category = categories.find(cat => cat.id === id);
  
  // Get products in this category
  const categoryProducts = products.filter(product => product.category === id);

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-2">
        {category ? category.name : "Category"}
      </h1>
      <p className="text-muted-foreground mb-8">
        {categoryProducts.length} products found
      </p>
      
      {categoryProducts.length > 0 ? (
        <ProductGrid products={categoryProducts} />
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
