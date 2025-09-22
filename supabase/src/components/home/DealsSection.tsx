import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const deals = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    originalPrice: 1199,
    salePrice: 999,
    discount: 17,
    timeLeft: "2d 14h",
    image: "/placeholder.svg",
    shipping: "Free shipping"
  },
  {
    id: 2,
    title: "Samsung 65\" Smart TV",
    originalPrice: 899,
    salePrice: 649,
    discount: 28,
    timeLeft: "1d 8h",
    image: "/placeholder.svg",
    shipping: "Free shipping"
  },
  {
    id: 3,
    title: "MacBook Air M2",
    originalPrice: 1299,
    salePrice: 1099,
    discount: 15,
    timeLeft: "3d 2h",
    image: "/placeholder.svg",
    shipping: "Free shipping"
  },
  {
    id: 4,
    title: "Nike Air Jordan 1",
    originalPrice: 170,
    salePrice: 129,
    discount: 24,
    timeLeft: "4h 32m",
    image: "/placeholder.svg",
    shipping: "Free shipping"
  }
];

const DealsSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Daily Deals</h2>
        <Link to="/deals">
          <Button variant="outline">See all deals</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {deals.map((deal) => (
          <Card key={deal.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="p-4">
              <div className="aspect-square relative overflow-hidden rounded-md">
                <img 
                  src={deal.image} 
                  alt={deal.title}
                  className="object-cover w-full h-full"
                />
                <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                  -{deal.discount}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <h3 className="font-semibold text-sm mb-2 line-clamp-2">{deal.title}</h3>
              <div className="space-y-1">
                 <div className="flex items-center gap-2">
                   <span className="font-bold text-lg">₵{deal.salePrice}</span>
                   <span className="text-sm text-muted-foreground line-through">
                     ₵{deal.originalPrice}
                   </span>
                 </div>
                <p className="text-xs text-green-600">{deal.shipping}</p>
                <p className="text-xs text-red-600 font-medium">
                  Time left: {deal.timeLeft}
                </p>
              </div>
              <Button className="w-full mt-3" size="sm">
                Buy It Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DealsSection;