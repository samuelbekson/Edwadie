import React from "react";

interface ProductJsonLdProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  inStock: boolean;
}

export const ProductJsonLd: React.FC<ProductJsonLdProps> = ({
  id,
  name,
  description,
  image,
  price,
  currency = "GHS",
  inStock,
}) => {
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "@id": id,
    name,
    description,
    image,
    offers: {
      "@type": "Offer",
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: typeof window !== "undefined" ? window.location.href : undefined,
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
};
