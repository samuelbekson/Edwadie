import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const GbayHeroBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="bg-accent text-black mb-4 text-sm font-semibold">
              Welcome to Edwadie
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Your Premium Marketplace for Everything
            </h1>
            <p className="text-lg mb-6 text-white/90">
              Discover amazing deals and unique finds. Shop with confidence on Edwadie's trusted marketplace.
            </p>
            <div className="flex gap-3">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Explore Categories
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative w-full h-64 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white/30 text-lg">Featured Products</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GbayHeroBanner;