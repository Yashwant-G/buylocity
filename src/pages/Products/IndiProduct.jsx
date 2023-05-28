import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Helmet from "react-helmet";
import Contact from "../../components/Contact/Contact";
import Navbar from "../../components/Navbar/Navbar";
import Individual from "../../components/Product/Individual";
import Spinner from "../../components/Spinner/Spinner";
import { ModeContext } from "../../context/context";
import { client } from "../../client";
import Features from "../../components/Features/Features";
import BestSeller from "../../components/Product/BestSeller";

const IndiProduct = () => {
  const { light } = useContext(ModeContext);
  const [prod, setProd] = useState([]);
  const [prodImg, setProdImg] = useState([]);
  const [options, setOptions] = useState([]);
  const [tags, setTags] = useState([]);
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
      setTags(data.tags);
      // console.log(data);
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div className={`app ${light ? "background-light" : "background-dark"}`}>
      <Helmet>
        <title>Buylocity- {`${prod.name}`}</title>
        <meta
          name="description"
          content="Discover a wide selection of products and categories at our online store. Explore our extensive range of high-quality 
          items to meet all your needs. From electronics to home decor, fashion to kitchenware, we offer a diverse collection to cater to 
          every taste and preference. Whether you're looking for the latest gadgets, stylish clothing, or unique gifts, our website has 
          you covered. Browse through our user-friendly interface, conveniently organized into various categories, making it easy to find 
          exactly what you're searching for. Shop with confidence and enjoy a seamless shopping experience with our trusted online store"
        />
      </Helmet>
      {loading && <Spinner />}
      <Navbar home={false} />
      <div className="min-h-[100vh] w-full pt-32">
        <Individual
          prod={prod}
          prodImg={prodImg}
          options={options}
          tags={tags}
        />
      </div>
      <div className="-mt-12 mb-16">
        <Features />
      </div>
      <div className="mb-8">
        <BestSeller
          search={tags}
          heading={"Our Bestsellers"}
          firstHead={"Similar"}
          secondHead={"Products"}
        />
      </div>
      <Contact />
    </div>
  );
};

export default IndiProduct;
