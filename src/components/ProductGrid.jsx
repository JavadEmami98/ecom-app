import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        return response.json();
      })
      .then((data) => setProducts(data))
      .catch(() => setError("محصولات بارگذاری نشدند."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-96 animate-pulse rounded-lg border border-gray-200 bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-5 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 px-2 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
