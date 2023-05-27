import React, { useContext } from "react";
import Helmet from "react-helmet";
import Contact from "../../components/Contact/Contact";
import Navbar from "../../components/Navbar/Navbar";
import Product from "../../components/Product/Product";
import { ModeContext } from "../../context/context";

const Products = () => {
  const { light } = useContext(ModeContext);
  return (
    <div className={`app ${light ? "background-light" : "background-dark"}`}>
      <Helmet>
        <title>Buylocity- Products</title>
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
        <Product />
      </div>
      <Contact />
    </div>
  );
};

export default Products;
