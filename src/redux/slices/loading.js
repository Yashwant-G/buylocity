import { createSlice } from "@reduxjs/toolkit";

const loadingSlice=createSlice({
	name:"loading",
    initialState:{loading:false},
    reducers:{
		setLoading(state,action){
			state.loading=action.payload;
			if(state.loading===true){
				document.body.style.overflowY = 'hidden';
			}
			else{
				document.body.style.overflowY = 'auto';
			}
		}
	}
})

export const {setLoading}=loadingSlice.actions;
export default loadingSlice.reducer