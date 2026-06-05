import React from "react";
import ProductGrid from "../components/ProductGrid";

function Home() {
  return (
    <>
      <div className="mt-[70px]">
        <h2>خوش آمدید</h2>
        <p className="text-gray-400 mt-1">فروشگاه فروش محصولات دیجیتال</p>
      </div>
      <div className="flex mt-[80px] justify-start w-full text-2xl">
        محصولات
      </div>
      <ProductGrid />
    </>
  );
}

export default Home;
