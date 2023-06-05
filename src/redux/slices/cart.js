import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  products: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementQuantity: (state, action) => {
      if (
        state.products[action.payload.index].quantity === action.payload.stock
      ) {
        toast.error("Max-Quantity Reached");
      } else {
        state.products[action.payload.index].quantity += 1;
        state.total += action.payload.price;
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
      localStorage.setItem("total", state.total);
    },
    descrementQuantity: (state, action) => {
      state.products[action.payload.index].quantity -= 1;
      state.total -= action.payload.price;
      if (state.products[action.payload.index].quantity === 0) {
        state.products.splice(action.payload.index, 1);
        toast.success("Product Removed");
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
      localStorage.setItem("total", state.total);
    },
    addToCart: (state, action) => {
      const { id, name, price, image, size, pack, color, stock } =
        action.payload;

      const existingProductIndex = state.products.findIndex(
        (item) =>
          item.id === id &&
          item.name === name &&
          (!size || item.size === size) &&
          (!pack || item.pack === pack) &&
          (!color || item.color === color)
      );

      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].quantity += 1;
      } else {
        state.products.push({
          id,
          name,
          price,
          quantity: 1,
          stock,
          image,
          ...(size && { size }),
          ...(pack && { pack }),
          ...(color && { color }),
        });
      }

      state.total += price;

      localStorage.setItem("cart", JSON.stringify(state.products));
      localStorage.setItem("total", state.total);
    },

    removeFromCart: (state, action) => {
      state.total -= action.payload.price * action.payload.quantity;
      state.products.splice(action.payload.index, 1);
      toast.success("Product Removed")
      localStorage.setItem("cart", JSON.stringify(state.products));
      localStorage.setItem("total", JSON.stringify(state.total));
    },
    resetCart: (state) => {
      localStorage.removeItem("cart", JSON.stringify(state.products));
      localStorage.removeItem("total", JSON.stringify(state.total));
      return { products: [], total: 0 };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  resetCart,
  incrementQuantity,
  descrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
