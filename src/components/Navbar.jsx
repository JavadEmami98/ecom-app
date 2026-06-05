import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
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
        <Link to="/checkout">سبد خرید</Link>
      </div>
      <div className="flex gap-5">
        <Link to="/auth">
          <Button
            sx={{ display: "flex", alignItems: "center" }}
            variant="contained"
          >
            وارد شوید
          </Button>
        </Link>
        <Link to="/auth">
          <Button variant="outlined">ثبت نام</Button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
