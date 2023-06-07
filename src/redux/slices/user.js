import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { toast } from "react-hot-toast";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState = {
  user: {},
  logIn: cookies.get("jwt_aut") ? true : false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCookie: (state, action) => {
      cookies.set("jwt_aut", action.payload, {
        expires: new Date(Date.now() + 60 * 60 * 1000),
      });
      toast.success("Login successful");
    },
    verifyLogin: (state) => {
      const cookieValue = cookies.get("jwt_aut");
      if (cookieValue) {
        var res = jwt_decode(cookieValue);
        state.user = res;
        state.logIn = true;
        toast.success(`Welcome ${state.user.name}`);
      } else {
        state.logIn = false;
        toast.error("Session Expired, Please log in again");
      }
    },
    logOut:(state)=>{
      cookies.remove("jwt_auth");
      state.logIn=false;
      state.user={};
      toast.success("Logout successful");
    }
  },
});

export const { setCookie, verifyLogin,logOut } = userSlice.actions;
export default userSlice.reducer;
