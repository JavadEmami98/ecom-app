import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../store/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load product");
        }

        return response.json();
      })
      .then((data) => setProduct(data))
      .catch(() => setError("محصول بارگذاری نشد."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("محصول به سبد خرید اضافه شد.");
  };

  if (loading) {
    return (
      <main className="px-4 py-10">
        <div className="grid animate-pulse gap-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <div className="h-96 rounded-lg bg-gray-100" />
          <div className="space-y-5">
            <div className="h-8 rounded bg-gray-100" />
            <div className="h-5 w-32 rounded bg-gray-100" />
            <div className="h-28 rounded bg-gray-100" />
            <div className="h-12 w-40 rounded bg-gray-100" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="px-4 py-10">
        <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-700">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 py-10">
      <div className="mb-6 flex justify-start">
        <Link
          to="/"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-emerald-500 hover:text-emerald-600"
        >
          Back to products
        </Link>
      </div>

      <section className="grid gap-8 rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm md:grid-cols-2">
        <div className="flex min-h-96 items-center justify-center rounded-lg bg-gray-50 p-8">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 w-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              {product.category}
            </span>
            <h1 className="mt-4 text-2xl font-bold leading-9 text-gray-950">
              {product.title}
            </h1>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="font-semibold text-amber-500">
              {product.rating?.rate ?? 0} / 5
            </span>
            <span className="text-gray-400">
              {product.rating?.count ?? 0} reviews
            </span>
          </div>

          <p className="text-base leading-8 text-gray-600">
            {product.description}
          </p>

          <div className="mt-auto border-t border-gray-100 pt-5">
            <p className="text-3xl font-bold text-gray-950">
              ${product.price}
            </p>
            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-5 w-full rounded-md bg-gray-950 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600 sm:w-auto"
            >
              Add to cart
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
