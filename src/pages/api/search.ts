import type { Request, Response } from "express";
import { products } from "@/data/mockData";

// This file is for local development only. In production, replace with a real API.

export default function handler(req: Request, res: Response) {
  const { q } = req.query;
  if (!q || typeof q !== "string") {
    return res.status(200).json({ suggestions: [] });
  }
  const suggestions = products
    .filter((product) =>
      product.name.toLowerCase().includes(q.toLowerCase())
    )
    .slice(0, 5)
    .map((product) => product.name);
  res.status(200).json({ suggestions });
}
