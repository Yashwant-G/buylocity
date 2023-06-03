import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    // 	{
    // 	name:"",
    // 	price:0,
    // 	quantity:0,
    // 	image:"",
    // 	options:{},
    //   }
  ],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.push(action.payload.product);
      state.total += action.payload.product.price;
	  console.log(state);
    },
    removeFromCart: (state, action) => {
      state.products.splice(action.payload.index, 1);
      state.total -= action.payload.price;
    },
	resetCart: (state) => {
		state.products=[];
		state.total=0;
	},
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
