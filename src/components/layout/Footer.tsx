
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/40" role="contentinfo" aria-label="Site footer">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Buy Section */}
          <div>
            <h3 className="font-semibold mb-4">Buy</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/signup" className="text-muted-foreground hover:text-foreground" aria-label="Registration link">
                  Registration
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-foreground" aria-label="All categories link">
                  All Categories
                </Link>
              </li>
              <li>
                <Link to="/category/featured" className="text-muted-foreground hover:text-foreground" aria-label="Featured products link">
                  Featured Products
                </Link>
              </li>
              <li>
                <Link to="/category/ladies-bags" className="text-muted-foreground hover:text-foreground" aria-label="Ladies bags link">
                  Ladies Bags
                </Link>
              </li>
              <li>
                <Link to="/category/dresses" className="text-muted-foreground hover:text-foreground" aria-label="Dresses link">
                  Dresses
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-muted-foreground hover:text-foreground" aria-label="Order history link">
                  Order History
                </Link>
              </li>
            </ul>
          </div>

          {/* Sell Section */}
          <div>
            <h3 className="font-semibold mb-4">Sell</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/sell" className="text-muted-foreground hover:text-foreground" aria-label="Start selling link">
                  Start Selling
                </Link>
              </li>
              <li>
                <Link to="/seller-dashboard" className="text-muted-foreground hover:text-foreground" aria-label="Seller dashboard link">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link to="/sell-product" className="text-muted-foreground hover:text-foreground" aria-label="List a product link">
                  List a Product
                </Link>
              </li>
              <li>
                <Link to="/seller-guide" className="text-muted-foreground hover:text-foreground" aria-label="How to sell link">
                  How to Sell
                </Link>
              </li>
              <li>
                <Link to="/business-sellers" className="text-muted-foreground hover:text-foreground" aria-label="Business sellers link">
                  Business Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* About AB Collections */}
          <div>
            <h3 className="font-semibold mb-4">About AB Collections</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground" aria-label="Company info link">
                  Company Info
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-foreground" aria-label="Careers link">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/investors" className="text-muted-foreground hover:text-foreground" aria-label="Investors link">
                  Investors
                </Link>
              </li>
              <li>
                <Link to="/diversity" className="text-muted-foreground hover:text-foreground" aria-label="Diversity and inclusion link">
                  Diversity & Inclusion
                </Link>
              </li>
              <li>
                <Link to="/policies" className="text-muted-foreground hover:text-foreground" aria-label="Policies link">
                  Policies
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="text-muted-foreground hover:text-foreground" aria-label="Advertise with us link">
                  Advertise with Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Contact */}
          <div>
            <h3 className="font-semibold mb-4">Help & Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground" aria-label="Contact us link">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground" aria-label="Help center link">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-foreground" aria-label="Shipping and returns link">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/money-back" className="text-muted-foreground hover:text-foreground" aria-label="Money back guarantee link">
                  Money Back Guarantee
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground" aria-label="Privacy policy link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-muted-foreground hover:text-foreground" aria-label="Return policy link">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground" aria-label="Terms and conditions link">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/announcements" className="text-muted-foreground hover:text-foreground" aria-label="Announcements link">
                  Announcements
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-foreground" aria-label="AB Collections community link">
                  AB Collections Community
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground" aria-label="Business blog link">
                  Business Blog
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-muted-foreground hover:text-foreground" aria-label="Security center link">
                  Security Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Connected & Contact */}
          <div>
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Stay Connected</h3>
              <div className="flex space-x-3 mb-4">
                <a href="#" className="text-muted-foreground hover:text-foreground" aria-label="Facebook link">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground" aria-label="Twitter link">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground" aria-label="Instagram link">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>123 Shopping Avenue, Accra, Ghana</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>+233 20 123 4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>info@abcollections.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} AB Collections. All rights reserved.</p>
            <div className="mt-2 md:mt-0">
              <span className="mr-4">🇬🇭 Ghana</span>
              <Link to="/accessibility" className="hover:text-foreground mr-4" aria-label="Accessibility link">Accessibility</Link>
              <Link to="/user-agreement" className="hover:text-foreground mr-4" aria-label="User agreement link">User Agreement</Link>
              <Link to="/cookies" className="hover:text-foreground" aria-label="Cookies link">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
