
import React from "react";
import { Link } from "react-router-dom";
import { Category } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/category/${category.id}`}>
      <Card className="overflow-hidden group transition-all duration-300 hover:shadow-md">
        <div className="aspect-square relative overflow-hidden bg-muted">
          <img
            src={category.image}
            alt={category.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4 text-center">
          <h3 className="font-medium">{category.name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
