import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar/Navbar";
import { firework } from "../../api/firework";
import img from "../../assets/confetti.png";
import bike from "../../assets/delivery-scooter.gif";
import { useNavigate } from "react-router-dom";
import CartTree from "../../components/Cart/CartTree";

const Success = () => {
  const [bgGreen, setbgGreen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setbgGreen(true);
    firework();
    setTimeout(() => {
      setbgGreen(false);
    }, 3500);
  }, []);
  return (
    <div
      className={`w-full min-h-screen ${
        bgGreen && "bg-[#a8faa8]"
      } transition-all duration-1000`}
    >
      <Helmet>
        <title>Buylocity- Success</title>
        <meta
          name="description"
          content="Discover a wide selection of products and categories at our online store. Explore our extensive range of high-quality 
          items to meet all your needs. From electronics to home decor, fashion to kitchenware, we offer a diverse collection to cater to 
          every taste and preference. Whether you're looking for the latest gadgets, stylish clothing, or unique gifts, our website has 
          you covered. Browse through our user-friendly interface, conveniently organized into various categories, making it easy to find 
          exactly what you're searching for. Shop with confidence and enjoy a seamless shopping experience with our trusted online store"
        />
      </Helmet>
      <Navbar home={false} />
      <div className="pt-28">
        <div className="mt-4">
          {bgGreen && <CartTree success={true} bag={true} details={true} />}
        </div>
        <div className="flex justify-center items-center gap-2 flex-col mt-8 px-6 relative">
          <div className="absolute z-10 top-0 left-20 text-red-500">
            Note*: Not a real order, its in development phase
          </div>
          <div className="w-40 h-40 ml-14">
            <img src={img} alt="alt" className="object-cover animate-bounce" />
          </div>

          <div className="h-text">Order Confirmed</div>
          <div className="p-text text-lg">
            Yay!!, Thanks for Shopping with us
          </div>
          <div className="p-text text-lg text-center">
            Keep a watch at your door, order is coming soon
            <img className="w-20 h-20 mx-auto" src={bike} alt="alt" />
          </div>
          <div>
            <button
              onClick={() => navigate("/track/1234")}
              className="h-text py-2 px-4 rounded-xl text-white bg-[var(--secondary-color)]"
            >
              Track Your Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
