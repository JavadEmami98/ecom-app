import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./swiper1.css";

import ProductCard from "../ProductCard";

function ProductSwiper() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch(() => setError("محصولات بارگذاری نشدند."))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="swiper-status">در حال بارگذاری محصولات...</p>;
  if (error) return <p className="swiper-status">{error}</p>;

  return (
    <section className="swiper-section w-full">
      <h2 className="swiper-section__title">
        محصولات <span>ویژه</span>
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 28 },
          1280: { slidesPerView: 4, spaceBetween: 28 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default ProductSwiper;
