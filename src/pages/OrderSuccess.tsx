
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
  return (
    <div className="container py-16">
      <div className="max-w-lg mx-auto text-center">
        <CheckCircle className="h-16 w-16 mx-auto mb-6 text-green-500" />
        <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your order has been placed successfully. You will receive a confirmation shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/orders">View Your Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
