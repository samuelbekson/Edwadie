
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/data/mockData";
import { Calendar, Package } from "lucide-react";

// Mock orders for demonstration
const mockOrders = [
  {
    id: "ORD-001",
    date: "2023-04-15",
    status: "Delivered",
    total: 450,
    items: [
      { name: "Premium Ladies Handbag", quantity: 1, price: 320 },
      { name: "Comfortable Slippers", quantity: 1, price: 60 },
      { name: "Premium Body Splash", quantity: 1, price: 70 }
    ]
  },
  {
    id: "ORD-002",
    date: "2023-04-02",
    status: "Processing",
    total: 350,
    items: [
      { name: "Luxury Bed Sheet Set", quantity: 1, price: 350 }
    ]
  }
];

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (mockOrders.length === 0) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        <div className="max-w-md mx-auto py-12">
          <Package className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
          <p className="text-xl mb-6">You haven't placed any orders yet</p>
          <Button asChild size="lg">
            <Link to="/">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      <div className="space-y-6">
        {mockOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="bg-muted/30">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>Placed on {order.date}</span>
                  </div>
                </div>
                <div className="flex flex-col md:items-end">
                  <span className="font-medium">{formatCurrency(order.total)}</span>
                  <span className={`text-sm ${
                    order.status === "Delivered" ? "text-green-600" : "text-blue-600"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p>{formatCurrency(item.price)}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end mt-6">
                <Button variant="outline" asChild>
                  <Link to={`/order/${order.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;
