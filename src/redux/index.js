import { combineReducers } from "@reduxjs/toolkit";

import loadingReducer from "./slices/loading";
import bgModeReducer from "./slices/bgMode";
import cartReducer from "./slices/cart";
import wishlistReducer from "./slices/wishlist";
import userReducer from "./slices/user";
import orderReducer from "./slices/order";

const rootReducer=combineReducers({
	loading:loadingReducer,
	bgMode:bgModeReducer,
	cart: cartReducer,
	wishlist: wishlistReducer,
	user: userReducer,
	order: orderReducer
})

export default rootReducer;