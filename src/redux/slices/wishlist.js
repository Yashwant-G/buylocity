import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  products: localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [],
  // products:[]
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.products.push(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.products));
      toast.success("Product added to wishlist")
    },
    removeFromWishlist: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload.id
      );
      toast.success("Product removed from wishlist");
      localStorage.setItem("wishlist", JSON.stringify(state.products));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
