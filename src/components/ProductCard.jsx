import React from "react";

function ProductCard({ product }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-52 items-center justify-center bg-gray-50 p-5">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition duration-200 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            {product.category}
          </span>
          <span className="text-sm font-semibold text-amber-500">
            {product.rating?.rate ?? 0} / 5
          </span>
        </div>

        <h2 className="line-clamp-2 min-h-14 text-base font-semibold leading-7 text-gray-900">
          {product.title}
        </h2>

        <p className="line-clamp-3 flex-1 text-sm leading-6 text-gray-500">
          {product.description}
        </p>

        <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-4">
          <p className="text-lg font-bold text-gray-950">${product.price}</p>
          <button className="rounded-md bg-gray-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
