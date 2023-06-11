import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderStart: false,
  address: "",
  payment: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderStart(state) {
      state.orderStart = true;
    },
    setOrderAddress(state, action) {
      state.address = action.payload;
    },
    setOrderPayment(state, action) {
      state.payment = action.payload;
    },
    resetOrderState(state) {
      return { orderStart: false, address: null, payment: null };
    },
  },
});

export const { setOrderStart, setOrderAddress, setOrderPayment, resetOrderState } =
  orderSlice.actions;

export default orderSlice.reducer;
