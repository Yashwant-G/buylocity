import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartIcon = () => {
  const { products } = useSelector((state) => state.cart);
  return (
    <div>
      {products.length > 0 && (
        <Link to="/cart">
          <div className="fixed bottom-[5%] right-[2%] bg-[var(--black-color)]  text-[var(--white-color)] text-4xl p-3 rounded-full z-50">
            <HiOutlineShoppingBag />
            <div className="absolute animate-bounce top-2 right-[27%] text-base px-1 rounded-full bg-[var(--white-color)]  text-[var(--black-color)]">
              {products.length}
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default CartIcon;
