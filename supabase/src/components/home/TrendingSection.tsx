import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const trendingItems = [
  { 
    name: "iPhone 15 Pro", 
    price: "₵999", 
    image: "/placeholder.svg",
    trending: "🔥 Hot",
    category: "Electronics"
  },
  { 
    name: "Nike Air Jordans", 
    price: "₵129", 
    image: "/placeholder.svg",
    trending: "📈 Rising",
    category: "Sneakers"
  },
  { 
    name: "MacBook Air M2", 
    price: "₵1,099", 
    image: "/placeholder.svg",
    trending: "⭐ Popular",
    category: "Computers"
  },
  { 
    name: "Samsung Galaxy S24", 
    price: "₵799", 
    image: "/placeholder.svg",
    trending: "🆕 New",
    category: "Electronics"
  },
  { 
    name: "PlayStation 5", 
    price: "₵499", 
    image: "/placeholder.svg",
    trending: "🎮 Gaming",
    category: "Gaming"
  },
  { 
    name: "AirPods Pro", 
    price: "₵249", 
    image: "/placeholder.svg",
    trending: "🎵 Music",
    category: "Audio"
  }
];

const TrendingSection = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Trending on GBay</h2>
        <Link to="/trending" className="text-primary hover:underline text-sm">
          See all trending
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {trendingItems.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-3">
              <div className="aspect-square relative mb-2">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover rounded-md"
                />
                <Badge className="absolute top-1 left-1 text-xs bg-white text-black border">
                  {item.trending}
                </Badge>
              </div>
              <p className="font-medium text-sm truncate">{item.name}</p>
              <p className="text-lg font-bold text-primary">{item.price}</p>
              <p className="text-xs text-muted-foreground">{item.category}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;