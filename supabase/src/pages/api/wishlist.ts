// Mock API for wishlist (for local dev only)
import type { Request, Response } from "express";

let wishlist: string[] = [];

export default function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    return res.status(200).json({ wishlist });
  }
  if (req.method === "POST") {
    const { productId } = req.body;
    if (productId && !wishlist.includes(productId)) {
      wishlist.push(productId);
    }
    return res.status(200).json({ wishlist });
  }
  if (req.method === "DELETE") {
    const { productId } = req.body;
    wishlist = wishlist.filter((id) => id !== productId);
    return res.status(200).json({ wishlist });
  }
  res.status(405).end();
}
