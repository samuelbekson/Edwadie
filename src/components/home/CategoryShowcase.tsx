
import React from "react";
import { Link } from "react-router-dom";
import { categories } from "@/data/mockData";

const CategoryShowcase = () => {
  // Show only the first 7 categories
  const showcaseCategories = categories.slice(0, 7);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {showcaseCategories.map((category) => (
        <Link
          key={category.id}
          to={`/category/${category.id}`}
          className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-medium text-center">{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default CategoryShowcase;
