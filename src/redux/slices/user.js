import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import cryptoJs from "crypto-js";
const secretKey = process.env.REACT_APP_SECRET_KEY;

const initialState = {
  user: [],
  GoogleUser: {},
  logIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSignupUser: (state, action) => {
      state.GoogleUser = action.payload;
    },
    setUser: (state, action) => {
      const encryptedData = cryptoJs.AES.encrypt(
        JSON.stringify(action.payload),
        secretKey
      ).toString();
      localStorage.setItem("encUser", encryptedData);
    },
    verifyUser: (state) => {
      const val=localStorage.getItem('encUser')
      if(val){
        const decryptedBytes = cryptoJs.AES.decrypt(val, secretKey);
        const decryptedData = JSON.parse(decryptedBytes.toString(cryptoJs.enc.Utf8));
        state.user = decryptedData;
        state.logIn = true;
        toast.success(`Welcome ${state.user[0].userName}`)
      }
      else{
        toast.error(`Please Sign up`);
      }
    },
    removeUser:(state)=>{
      localStorage.removeItem('encUser');
      state.user = {};
      state.GoogleUser = {};
      state.logIn = false;
      toast.success(`Logged out`);
    }
  },
});

export const { setSignupUser, setUser, verifyUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
