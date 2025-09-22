import { useState, useEffect, useCallback } from "react";

const WISHLIST_KEY = "wishlist";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(WISHLIST_KEY);
    if (stored) {
      setWishlist(JSON.parse(stored));
    } else {
      // Optionally fetch from API
      fetch("/api/wishlist")
        .then((res) => res.json())
        .then((data) => {
          setWishlist(data.wishlist || []);
          localStorage.setItem(WISHLIST_KEY, JSON.stringify(data.wishlist || []));
        });
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = useCallback(async (productId: string) => {
    setLoading(true);
    setWishlist((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
    await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    setLoading(false);
  }, []);

  const removeFromWishlist = useCallback(async (productId: string) => {
    setLoading(true);
    setWishlist((prev) => prev.filter((id) => id !== productId));
    await fetch("/api/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    setLoading(false);
  }, []);

  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
    loading,
  };
}
