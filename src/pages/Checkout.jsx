import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/cartSlice";

function Checkout() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-950">Your cart is empty</h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            Add some products to your cart, then come back here to checkout.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-md bg-gray-950 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600"
          >
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 py-10">
      <div className="mb-8 flex flex-col gap-3 text-left sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-950">Checkout</h1>
          <p className="mt-2 text-sm text-gray-500">
            {totalItems} item{totalItems > 1 ? "s" : ""} in your cart
          </p>
        </div>

        <button
          type="button"
          onClick={() => dispatch(clearCart())}
          className="rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Clear cart
        </button>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm sm:grid-cols-[120px_1fr]"
            >
              <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50 p-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                  <div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      {item.category}
                    </span>
                    <h2 className="mt-3 text-base font-semibold leading-7 text-gray-950">
                      {item.title}
                    </h2>
                  </div>

                  <p className="text-lg font-bold text-gray-950">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                  <div className="flex items-center overflow-hidden rounded-md border border-gray-300">
                    <button
                      type="button"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="h-10 w-10 text-lg font-semibold text-gray-700 transition hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="flex h-10 min-w-12 items-center justify-center border-x border-gray-300 px-4 font-semibold text-gray-950">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="h-10 w-10 text-lg font-semibold text-gray-700 transition hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-sm font-semibold text-red-600 transition hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-lg border border-gray-200 bg-white p-5 text-left shadow-sm">
          <h2 className="text-lg font-bold text-gray-950">Order summary</h2>

          <div className="mt-5 flex flex-col gap-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>

          <div className="mt-5 flex justify-between border-t border-gray-100 pt-5 text-lg font-bold text-gray-950">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            type="button"
            className="mt-6 w-full rounded-md bg-gray-950 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600"
          >
            Pay now
          </button>
        </aside>
      </section>
    </main>
  );
}

export default Checkout;
