import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const categories = [
  { name: "Electronics", icon: "📱", link: "/category/electronics" },
  { name: "Fashion", icon: "👗", link: "/category/fashion" },
  { name: "Home & Garden", icon: "🏡", link: "/category/home-garden" },
  { name: "Motors", icon: "🚗", link: "/category/motors" },
  { name: "Collectibles", icon: "🎨", link: "/category/collectibles" },
  { name: "Sports", icon: "⚽", link: "/category/sports" },
  { name: "Health & Beauty", icon: "💄", link: "/category/health-beauty" },
  { name: "Industrial", icon: "🏭", link: "/category/industrial" }
];

const GbayCategories = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Explore popular categories</h2>
        <Link to="/categories" className="text-primary hover:underline text-sm">
          See all categories
        </Link>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {categories.map((category) => (
          <Link key={category.name} to={category.link} className="group">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors mb-2">
                <span className="text-2xl">{category.icon}</span>
              </div>
              <p className="text-xs font-medium text-gray-700 group-hover:text-primary">
                {category.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GbayCategories;