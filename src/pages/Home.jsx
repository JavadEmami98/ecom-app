import React from "react";
import ProductGrid from "../components/ProductGrid";

function Home() {
  return (
    <>
      <div
        className="flex flex-col justify-between items-center border-b-2 rounded-b-lg shadow-lg px-2
     bg-white dark:bg-slate-800 dark:border-slate-600"
      >
        <div className="mt-[70px]">
          <h2>خوش آمدید</h2>
          <p className="text-gray-400 mt-1">فروشگاه فروش محصولات دیجیتال</p>
        </div>
        <div className="flex mt-[80px] justify-start w-full text-2xl">
          محصولات
        </div>
        <div className="bg-white dark:bg-slate-800 dark:border-slate-600">
          <ProductGrid />
        </div>
      </div>
    </>
  );
}

export default Home;
