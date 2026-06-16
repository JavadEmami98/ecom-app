import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../store/cartSlice";
import AddIcon from '@mui/icons-material/Add';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("محصول به سبد خرید اضافه شد.");
  };

  return (
    <div className="product-card">
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__category">{product.category}</span>
          <span className="product-card__rating">
            ⭐ {product.rating?.rate ?? 0}
            <em>/5</em>
          </span>
        </div>

        <h2 className="product-card__title">{product.title}</h2>

        <p className="product-card__desc">{product.description}</p>

        <div className="product-card__footer">
          <div className="product-card__price">
            ${product.price}
            <span>USD</span>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={handleAddToCart}
              className="product-card__btn product-card__btn--outline"
            >
              <AddIcon/>
            </button>
            <Link
              to={`/products/${product.id}`}
              className="product-card__btn product-card__btn--solid"
            >
              جزئیات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;