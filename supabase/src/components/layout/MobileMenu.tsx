
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { categories } from "@/data/mockData";

const MobileMenu = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <ScrollArea className="h-[calc(100vh-3rem)] pb-10">
      <div className="px-2 py-6 flex flex-col gap-4">
        <Link to="/" className="flex items-center gap-2 px-2">
          <span className="font-bold text-xl bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
            AB Collections
          </span>
        </Link>
      </div>
      <Separator />
      <div className="flex flex-col gap-1 pt-4">
        <Link to="/" className="font-medium px-4 py-2 hover:bg-accent rounded-md">
          Home
        </Link>
        <Link to="/categories" className="font-medium px-4 py-2 hover:bg-accent rounded-md">
          All Categories
        </Link>
        <p className="font-medium text-muted-foreground px-4 py-2">Popular Categories</p>
        {categories.map((category) => (
          <Link 
            key={category.id} 
            to={`/category/${category.id}`}
            className="px-4 py-2 hover:bg-accent rounded-md"
          >
            {category.name}
          </Link>
        ))}
        <Separator className="my-2" />
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="px-4 py-2 hover:bg-accent rounded-md">
              My Account
            </Link>
            <Link to="/orders" className="px-4 py-2 hover:bg-accent rounded-md">
              My Orders
            </Link>
            <button 
              onClick={logout}
              className="text-left px-4 py-2 hover:bg-accent rounded-md text-red-500"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 hover:bg-accent rounded-md">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 hover:bg-accent rounded-md">
              Sign Up
            </Link>
          </>
        )}
        <Link to="/cart" className="px-4 py-2 hover:bg-accent rounded-md">
          Cart
        </Link>
      </div>
    </ScrollArea>
  );
};

export default MobileMenu;
