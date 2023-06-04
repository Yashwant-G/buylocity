import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";

const CartIcon = () => {
  return (
    <div>
      <Link to="/cart">
        <div className="fixed bottom-[5%] right-[2%] bg-black text-4xl text-white p-3 rounded-full z-50">
          <HiOutlineShoppingBag />
          <div className="absolute animate-bounce top-2 right-[27%] text-base bg-white px-1 rounded-full text-black">
            1
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CartIcon;
