import { createSlice } from "@reduxjs/toolkit";

const bgModeSlicer=createSlice({
	name:"bgMode",
	initialState:{light:false},
	reducers:{
        setBgMode:(state)=>{
            state.light=!state.light;
        }
    }
})

export const {setBgMode}=bgModeSlicer.actions
export default bgModeSlicer.reducer