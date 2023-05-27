import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Helmet from "react-helmet";
import Contact from "../../components/Contact/Contact";
import Navbar from "../../components/Navbar/Navbar";
import Individual from "../../components/Product/Individual";
import Spinner from "../../components/Spinner/Spinner";
import { ModeContext } from "../../context/context";
import { client } from "../../client";

const IndiProduct = () => {
  const { light } = useContext(ModeContext);
  const [prod, setProd] = useState([]);
  const [prodImg, setProdImg] = useState([]);
  const [options,setOptions]=useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  //   const navigate = useNavigate();
  const id = location.pathname.split("/").at(-1);
  useEffect(() => {
    setLoading(true);
    const query = `*[_type == "product" && _id == $productId][0]`;
    const params = { productId: id.toString() };
    client.fetch(query, params).then((data) => {
      setProd(data);
      setProdImg(data.productImages);
      setOptions(data.options);
      console.log(data);
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={`app ${light ? "background-light" : "background-dark"}`}>
      <Helmet>
        <title>Buylocity- {`${prod.name}`}</title>
        <meta
          name="description"
          content="Welcome to our order form page, where you can easily place an order for your desired products in just a few clicks. Our simple and user-friendly order form makes it easy to browse through our selection of products and add them to your cart.
          With our secure payment system, you can rest assured that your payment information is safe and secure. Our team of professionals works hard to ensure that your order is processed quickly and accurately, and we always strive to provide the best possible customer service.
          So whether you're looking to purchase groceries, household items, or any other products, our order form page makes it easy and convenient. Simply browse through our selection, add items to your cart, and complete your purchase with just a few clicks. Try our order form page today and experience the ease of online shopping!"
        />
      </Helmet>
      {loading && <Spinner />}
      <Navbar home={false} />
      <div className="min-h-[100vh] w-full pt-32">
        <Individual prod={prod} prodImg={prodImg} options={options} />
      </div>
      <Contact />
    </div>
  );
};

export default IndiProduct;
