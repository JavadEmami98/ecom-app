import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItemsCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <div className="flex justify-between items-center border-b-2 rounded-b-lg shadow-lg px-2">
      <div className="h-[70px] w-[70px]">
        <Link to="/">
          <img
            src="https://asset.okala.com/unsigned/rs:fill/size:56:30/quality:90/dpr:2.5/plain/s3:/cdn/static/react-ui-v2/okala-logo.svg"
            alt=""
            className="p-1"
          />
        </Link>
      </div>

      <div className="flex gap-5">
        <Link to="/">خانه</Link>
        <Link to="/checkout" className="relative">
          سبد خرید
          {cartItemsCount > 0 && (
            <span className="absolute -right-4 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-xs font-bold text-white">
              {cartItemsCount}
            </span>
          )}
        </Link>
      </div>

      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          <span className="max-w-40 truncate text-sm text-gray-600">
            {user?.email}
          </span>
          <Button variant="outlined" onClick={() => dispatch(logout())}>
            خروج
          </Button>
        </div>
      ) : (
        <div className="flex gap-5">
          <Link to="/auth?mode=login">
            <Button
              sx={{ display: "flex", alignItems: "center" }}
              variant="contained"
            >
              ورود
            </Button>
          </Link>
          <Link to="/auth?mode=signup">
            <Button variant="outlined">ثبت نام</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
