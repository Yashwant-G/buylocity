import React, { useContext } from "react";
import Helmet from "react-helmet";
import Contact from "../components/Contact/Contact";
import Navbar from "../components/Navbar/Navbar";
import OrderNow from "../components/OrderNow/OrderNow";
import { ModeContext } from "../context/context";

const Order = () => {
  const { light } = useContext(ModeContext);
  return (
    <div className={`app ${light ? "background-light" : "background-dark"}`}>
      <Helmet>
        <title>Buylocity- Order Form</title>
        <meta
          name="description"
          content="Welcome to our order form page, where you can easily place an order for your desired products in just a few clicks. Our simple and user-friendly order form makes it easy to browse through our selection of products and add them to your cart.
          With our secure payment system, you can rest assured that your payment information is safe and secure. Our team of professionals works hard to ensure that your order is processed quickly and accurately, and we always strive to provide the best possible customer service.
          So whether you're looking to purchase groceries, household items, or any other products, our order form page makes it easy and convenient. Simply browse through our selection, add items to your cart, and complete your purchase with just a few clicks. Try our order form page today and experience the ease of online shopping!"
        />
      </Helmet>
      <Navbar home={false} />
      <OrderNow />
      <Contact />
    </div>
  );
};

export default Order;
