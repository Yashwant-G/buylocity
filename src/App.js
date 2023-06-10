import "./App.scss";
import { useEffect, useLayoutEffect } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";

import Products from "./pages/Products/Products";
import IndiProduct from "./pages/Products/IndiProduct";

import TrackOrder from "./pages/Track/TrackOrder";
import TrackOrderId from "./pages/Track/TrackOrderId";

import Privacy from "./pages/Formal/Privacy";
import ContactPage from "./pages/Formal/ContactPage";
import Terms from "./pages/Formal/Terms";
import Return from "./pages/Formal/Return";
import Shipping from "./pages/Formal/Shipping";

import PageNotFound from "./assets/404.png";
import Spinner from "./components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/CartComp";
import Wishlist from "./pages/Wishlist/Wishlist";
import Success from "./pages/Success/Success";
import Checkout from "./components/Checkout/Checkout";
import Login from "./pages/Auth/Login";
import { setSignupUser, setUser, verifyUser } from "./redux/slices/user";
import Search from "./pages/Search/Search";
import jwt_decode from "jwt-decode";
import { client } from "./client";
import Signup from "./pages/Auth/Signup";
import MyAccount from "./pages/Auth/MyAccount";
import OrderId from "./pages/OrderId/OrderId";


function App() {
  const location = useLocation();
  const { light } = useSelector((state) => state.bgMode);
  const { loading } = useSelector((state) => state.loading);
  const dispatch=useDispatch();
  const navigate = useNavigate();


  function handleCallbackResponse(response) {
    const info=jwt_decode(response.credential);
    // console.log(info);
    const query = `*[_type == "users" && email == $email]{
      _id,
      userName,
      imageUrl,
      accountType,
      phoneNo,
      email,
    }`
    const params={email: info.email.toString()}
    client.fetch(query, params).then((res)=>{
      // console.log(res);
      if(res.length===0){
        dispatch(setSignupUser(info));
        navigate('/auth/signup');
      }
      else{
        dispatch(setUser(res));
        dispatch(verifyUser());
        navigate('/');
      }
    })
  }

  useEffect(() => {
    dispatch(verifyUser());
    
    /*global google */
    google.accounts.id.initialize({
      client_id: "131016831943-6h3277k754eb9b1srp6l1m6fl67c3lcb.apps.googleusercontent.com",
      callback: handleCallbackResponse,
      context: "signin",
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className={`app ${light ? "background-light" : "background-dark"}`}>
      {loading && <Spinner />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<IndiProduct />} />
        <Route path="/order/:id" element={<OrderId />} />
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/track/:id" element={<TrackOrderId />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/cart/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/search" element={<Search />} />
        <Route path="/order/:id/success" element={<Success />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms&conditions" element={<Terms />} />
        <Route path="/privacy&policy" element={<Privacy />} />
        <Route path="/return&refund" element={<Return />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route
          path="*"
          element={
            <div className="w-full h-[100vh] head-text app__flex flex-col background-light">
              <img
                src={PageNotFound}
                alt="404 Not Found"
                className="w-1/2  rounded-xl"
                loading="lazy"
              />
              <p>Page Not Found</p>
              <button
                className="bg-[var(--secondary-color)] text-white p-text text-lg px-7 py-1 mt-8 hover:bg-blue-500 
              rounded-3xl text-center mx-auto"
              >
                <Link to="/">Home</Link>
              </button>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
