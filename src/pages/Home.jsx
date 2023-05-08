import React, { useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import Slider from "../components/Slider/Slider";
import Slogan from "../components/Slogan/Slogan";
import Product from "../components/Product/Product";
import Features from "../components/Features/Features";
import Serving from "../components/Serving/Serving";
import About from "../components/About/About";
import Testimonial from "../components/Testimonial/Testimonial";
import Contact from "../components/Contact/Contact";
import { ModeContext } from "../context/context";

const Home = () => {
  const { light } = useContext(ModeContext);

  return (
    <div className={`app ${light ? "background-light" : "background-dark"}`}>
      <Navbar home={true} />
      <Slider />
      <Slogan />
      <Product />
      <Features />
      <Serving />
      <About />
      <Testimonial />
      <Contact />
    </div>
  );
};

export default Home;
