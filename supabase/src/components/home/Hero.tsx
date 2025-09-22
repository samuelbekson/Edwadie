
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-brand-blue to-brand-green py-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Welcome to AB Collections
          </h1>
          <p className="text-lg md:text-xl text-slate-700 mb-8">
            Discover our premium selection of fashion, home decor, and accessories at amazing prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/categories">Shop Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/category/featured">Featured Items</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
