import { createSlice } from "@reduxjs/toolkit";

const bgModeSlicer=createSlice({
	name:"bgMode",
	initialState:{light:true},
	reducers:{
        setBgMode:(state)=>{
            state.light=!state.light;
        }
    }
})

export const {setBgMode}=bgModeSlicer.actions
export default bgModeSlicer.reducer