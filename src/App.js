import "./App.scss";
import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Spinner from "./components/Spinner/Spinner";
import Home from "./pages/Home";
import Order from "./pages/Order";

import TrackOrder from "./pages/Track/TrackOrder";
import TrackOrderId from "./pages/Track/TrackOrderId";

import Privacy from "./pages/Formal/Privacy";
import ContactPage from "./pages/Formal/ContactPage";
import Terms from "./pages/Formal/Terms";
import Return from "./pages/Formal/Return";
import Shipping from "./pages/Formal/Shipping";

import PageNotFound from "./assets/404.png";

function App() {
  const [wait, setwait] = useState(false);
  useEffect(() => {
    setwait(true);
    setTimeout(() => {
      setwait(false);
    }, 2500);
  }, []);
  return (
    <>
      <div
        className={`fixed bg-[#5f5f5f83] top-0 left-0 right-0 bottom-0 z-50 ${
          wait ? "scale-1" : "scale-0"
        }`}
      ></div>
      {wait && <Spinner />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/track/:id" element={<TrackOrderId />} />
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
                className="h-1/2 rounded-xl"
              />
              <p>Page Not Found</p>
              <button
                className="bg-[var(--secondary-color)] text-white p-text text-lg px-7 py-1 mt-8 hover:bg-[var(--hover-color)] 
              rounded-3xl text-center mx-auto"
              >
                <Link to="/">Home</Link>
              </button>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
