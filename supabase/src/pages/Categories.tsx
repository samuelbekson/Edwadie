
import React from "react";
import { categories } from "@/data/mockData";
import CategoryCard from "@/components/categories/CategoryCard";

const Categories = () => {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
