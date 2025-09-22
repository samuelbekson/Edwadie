
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "@/components/products/ProductGrid";
import { products } from "@/data/mockData";
import { Product } from "@/types";

const SearchResults = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Get query parameters from URL
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearchQuery(query);

    // Filter products based on search query
    if (query) {
      const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  }, [location.search]);

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-2">Search Results</h1>
      {searchQuery ? (
        <p className="text-muted-foreground mb-8">
          {searchResults.length} results found for "{searchQuery}"
        </p>
      ) : (
        <p className="text-muted-foreground mb-8">
          Please enter a search term
        </p>
      )}
      
      {searchResults.length > 0 ? (
        <ProductGrid products={searchResults} />
      ) : searchQuery ? (
        <div className="py-12 text-center">
          <p className="text-lg">No products found matching your search.</p>
        </div>
      ) : null}
    </div>
  );
};

export default SearchResults;
