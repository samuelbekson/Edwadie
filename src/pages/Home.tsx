import React from "react";
import GbayHeroBanner from "@/components/home/GbayHeroBanner";
import GbayPromoBanner from "@/components/home/GbayPromoBanner";
import GbayCategories from "@/components/home/GbayCategories";
import DealsSection from "@/components/home/DealsSection";
import TrendingSection from "@/components/home/TrendingSection";
import ProductGrid from "@/components/products/ProductGrid";
import { products } from "@/data/mockData";

const Home = () => {
  const featuredProducts = products.filter(product => product.featured);

  // Add error boundary for this component
  try {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <GbayHeroBanner />

      {/* Main Content */}
      <div className="container space-y-12 py-8">
        {/* Promo Banner */}
        <GbayPromoBanner />

        {/* Categories */}
        <GbayCategories />

        {/* Daily Deals */}
        <DealsSection />

        {/* Trending Section */}
        <TrendingSection />

        {/* Featured Products */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Recently viewed & more like this</h2>
          <ProductGrid products={featuredProducts.slice(0, 8)} />
        </div>

        {/* Additional Products */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">You might also like</h2>
          <ProductGrid products={products.slice(0, 12)} />
        </div>
      </div>
    </div>
  );
  } catch (error) {
    console.error('Error rendering Home component:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to Edwadie</h1>
          <p className="text-gray-600">Your premium marketplace is loading...</p>
        </div>
      </div>
    );
  }
};

export default Home;