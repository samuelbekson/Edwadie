import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, ShoppingCart, User, Menu, Heart } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { categories } from "@/data/mockData";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
const Navbar = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    user,
    logout
  } = useAuth();
  const {
    totalItems
  } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { suggestions, loading } = useDebouncedSearch(searchQuery);
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  return <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="md:hidden mr-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0" aria-label="Mobile menu">
              <MobileMenu />
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2" aria-label="Go to homepage">
            <span className="text-2xl font-bold text-primary">
              GBay
            </span>
          </Link>
        </div>
        
        {/* Categories Navigation - Desktop */}
        <nav className="hidden lg:flex ml-8" role="navigation" aria-label="Main navigation">
          <div className="flex items-center space-x-6">
            <Link to="/categories" className="text-sm hover:text-primary transition-colors" aria-label="Categories">
              Categories
            </Link>
            <Link to="/deals" className="text-sm hover:text-primary transition-colors" aria-label="Daily Deals">
              Daily Deals
            </Link>
            <Link to="/brand-outlet" className="text-sm hover:text-primary transition-colors" aria-label="Brand Outlet">
              Brand Outlet
            </Link>
            <Link to="/help" className="text-sm hover:text-primary transition-colors" aria-label="Help & Contact">
              Help & Contact
            </Link>
          </div>
        </nav>
        
        <div className="flex items-center ml-auto gap-4">
          {/* Main Search Bar - GBay Style */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xl relative" role="search" aria-label="Site search">
            <div className="flex w-full">
              <Input 
                type="search" 
                placeholder="Search for anything" 
                className="flex-1 rounded-l-md rounded-r-none border-r-0 focus:ring-2 focus:ring-primary" 
                value={searchQuery} 
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }} 
                aria-label="Search for anything"
                autoComplete="off"
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              />
              <Button type="submit" className="rounded-l-none px-6 bg-primary hover:bg-primary/90" aria-label="Submit search">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 top-full z-50 bg-white border border-gray-200 rounded-b-md shadow-lg max-h-60 overflow-auto" role="listbox">
                {suggestions.map((s, i) => (
                  <li
                    key={s}
                    className="px-4 py-2 cursor-pointer hover:bg-accent focus:bg-accent text-sm text-foreground"
                    tabIndex={0}
                    role="option"
                    aria-selected={searchQuery === s}
                    onMouseDown={() => handleSuggestionClick(s)}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
            {showSuggestions && !loading && suggestions.length === 0 && searchQuery && (
              <div className="absolute left-0 right-0 top-full z-50 bg-white border border-gray-200 rounded-b-md shadow-lg px-4 py-2 text-sm text-muted-foreground">
                No suggestions found
              </div>
            )}
          </form>
          
          <Link to="/wishlist">
            <Button variant="ghost" size="icon" className="relative" aria-label="View wishlist">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="sr-only">Wishlist</span>
            </Button>
          </Link>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative" aria-label="View cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-primary rounded-full h-5 w-5 flex items-center justify-center text-xs font-semibold">
                  {totalItems}
                </span>}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="relative group" tabIndex={0} aria-haspopup="true" aria-expanded="false">
                <Button variant="ghost" size="sm" className="text-sm" aria-label="User menu">
                  Hi {user?.email?.split('@')[0]}!
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block border" role="menu" aria-label="User menu">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    My GBay
                  </Link>
                  <Link to="/seller-dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Seller Dashboard
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Purchase history
                  </Link>
                  <Link to="/sell" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Sell an item
                  </Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/sell">
                <Button variant="outline" size="sm" aria-label="Sell">Sell</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="sm" aria-label="Register">Register</Button>
              </Link>
              <Link to="/login">
                <Button variant="default" size="sm" aria-label="Sign in">Sign in</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Mobile search bar */}
      <div className="container md:hidden py-2">
        <form onSubmit={handleSearch} className="flex items-center" role="search" aria-label="Mobile site search">
          <Input type="search" placeholder="Search products..." className="rounded-full bg-muted" value={searchQuery} onChange={e => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }} aria-label="Search products" autoComplete="off" onFocus={() => setShowSuggestions(true)} onBlur={() => setTimeout(() => setShowSuggestions(false), 150)} />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-full z-50 bg-white border border-gray-200 rounded-b-md shadow-lg max-h-60 overflow-auto" role="listbox">
              {suggestions.map((s, i) => (
                <li
                  key={s}
                  className="px-4 py-2 cursor-pointer hover:bg-accent focus:bg-accent text-sm text-foreground"
                  tabIndex={0}
                  role="option"
                  aria-selected={searchQuery === s}
                  onMouseDown={() => handleSuggestionClick(s)}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
          {showSuggestions && !loading && suggestions.length === 0 && searchQuery && (
            <div className="absolute left-0 right-0 top-full z-50 bg-white border border-gray-200 rounded-b-md shadow-lg px-4 py-2 text-sm text-muted-foreground">
              No suggestions found
            </div>
          )}
        </form>
      </div>
    </header>;
};
export default Navbar;