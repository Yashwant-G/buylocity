import React, {  useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Slider from "../components/Slider/Slider";
import Slogan from "../components/Slogan/Slogan";
import BestSeller from "../components/Product/BestSeller";
import Features from "../components/Features/Features";
import Serving from "../components/Serving/Serving";
import About from "../components/About/About";
import Testimonial from "../components/Testimonial/Testimonial";
import Contact from "../components/Contact/Contact";
import Helmet from "react-helmet";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/slices/loading";
import CartIcon from "../components/cartIcon/CartIcon";


const Home = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1250);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
      <Helmet>
        <title>Buylocity - Delivery in 2 hours</title>
        <meta
          name="description"
          content="BuyLocity is a revolutionary 2-hour delivery service that aims to simplify your shopping experience by connecting you with your favorite local stores. With BuyLocity, you can enjoy a seamless and hassle-free shopping experience from the comfort of your own home. Our platform provides you with access to a wide range of products from local stores, ensuring that you can always find what you're looking for.
          At BuyLocity, we believe in providing our customers with the best possible service. That's why we prioritize quality and reliability in everything we do. Our team works tirelessly to ensure that all products delivered through our platform meet the highest standards of quality. We also guarantee speedy delivery, with all orders arriving at your doorstep within just 2 hours of placing the order.
          So why wait? Whether you need groceries, snacks, or other household items, BuyLocity has got you covered. Experience the convenience of shopping from your favorite local stores without ever leaving your home. Try BuyLocity today and see how we can simplify your shopping experience!"
        />
      </Helmet>
      <CartIcon/>
      <Navbar home={true} />
      <Slider />
      <Slogan />
      <BestSeller search={["Bestseller"]} firstHead={"Our"} secondHead={"Bestseller"} />
      <Features />
      <Serving />
      <About />
      <Testimonial />
      <Contact />
    </div>
  );
};

export default Home;
