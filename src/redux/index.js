import { combineReducers } from "@reduxjs/toolkit";

import loadingReducer from "./slices/loading";
import bgModeReducer from "./slices/bgMode";
import cartReducer from "./slices/cart";

const rootReducer=combineReducers({
	loading:loadingReducer,
	bgMode:bgModeReducer,
	cart: cartReducer
})

export default rootReducer;