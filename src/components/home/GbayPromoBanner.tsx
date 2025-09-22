import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const GbayPromoBanner = () => {
  return (
    <div className="bg-muted border rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-2xl mb-2">🚚</div>
          <h3 className="font-semibold text-lg mb-1">Free shipping</h3>
          <p className="text-sm text-muted-foreground">On millions of items worldwide</p>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-2">🛡️</div>
          <h3 className="font-semibold text-lg mb-1">Money Back Guarantee</h3>
          <p className="text-sm text-muted-foreground">Shop with confidence</p>
        </div>
        <div className="text-center md:col-span-2 lg:col-span-1">
          <div className="text-2xl mb-2">⚡</div>
          <h3 className="font-semibold text-lg mb-1">GBay Plus</h3>
          <p className="text-sm text-muted-foreground">Fast, free delivery & more</p>
        </div>
      </div>
    </div>
  );
};

export default GbayPromoBanner;