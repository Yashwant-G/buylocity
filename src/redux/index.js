import { combineReducers } from "@reduxjs/toolkit";

import loadingReducer from "./slices/loading";
import bgModeReducer from "./slices/bgMode";
import cartReducer from "./slices/cart";
import wishlistReducer from "./slices/wishlist";

const rootReducer=combineReducers({
	loading:loadingReducer,
	bgMode:bgModeReducer,
	cart: cartReducer,
	wishlist: wishlistReducer
})

export default rootReducer;