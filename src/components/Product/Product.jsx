import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";
import Spinner from "../Spinner/Spinner";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import { urlFor, client } from "../../client";
import "./Product.scss";
import MotionWrap from "../../wrapper/MotionWrap";
import { Link } from "react-router-dom";

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Clothing");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query1 = '*[_type == "categories"] | order(_updatedAt asc)';

    client.fetch(query1).then((data) => {
      setCategories(data);
      // console.log(categories[1].features.length);
      // console.log(urlFor(categories[1].features[1].featureimg));
    });

    const query2 = '*[_type == "product"] | order(_updatedAt asc)';

    client.fetch(query2).then((data) => {
      setProduct(data);
      console.log(data);
      setFilterProduct(data.filter((prod) => prod.tags.includes("Clothing")));
    });
  }, []);

  const handleWorkFilter = (item) => {
    setLoading(true);
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      setFilterProduct(product.filter((prod) => prod.tags.includes(item)));
    }, 500);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="app__flex w-full flex-col " id="products">
      <h2 className="head-text text-2xl lg:text-4xl">
        Explore <span>Our</span> Collections
      </h2>

      <div className="app__work-filter">
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item.category)}
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === item.category ? "item-active" : ""
            }`}
          >
            {item.category}
            {/* <div>
                {item.features.map((feature, ind) => (
                  <img src={urlFor(feature).url()} key={ind} alt=" " loading="lazy"/>
                ))}
            </div> */}
          </div>
        ))}
      </div>

      {!loading ? (
        <motion.div
          animate={animateCard}
          transition={{ duration: 0.5, delayChildren: 0.5 }}
          className={`app__products-portfolio ${
            filterProduct.length === 1 && "justify-center"
          } ${filterProduct.length < 4 && "lg:justify-center"}`}
        >
          {filterProduct.map((prod, index) => (
            <div>
              <motion.div
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, type: "tween" }}
                className="app__products-portfolio "
              >
                <div className="app__work-item app__flex" key={index}>
                  <div className="app__work-img app__flex">
                    <Swiper
                      id="swiper2"
                      pagination={{
                        type: "fraction",
                      }}
                      navigation={true}
                      loop={true}
                      modules={[Pagination, Navigation]}
                      className="mySwiper h-full w-full"
                    >
                      {prod.productImages.map((productImage, ind) => (
                        <SwiperSlide>
                          <img
                            src={urlFor(productImage)}
                            alt={prod.name}
                            loading="lazy"
                            key={ind}
                            className="h-full w-full"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  <div className="app__work-content app__flex">
                    {prod.special && (
                      <div className="text-red-400 p-text text-sm -mb-2">
                        {prod.special}
                      </div>
                    )}
                    <h4 className="bold-text text-[var(--black-color)] hover:underline">
                      <Link to={`/products/${prod._id}`}>{prod.name}</Link>
                    </h4>
                    <div
                      className="p-text text-[#8693a9] mr-auto"
                      style={{ marginTop: 10 }}
                    >
                      {prod.description.substring(0, 20)}...
                    </div>
                  </div>
                  <div className="app__work-content app__flex flex mt-[-15px] ">
                    <h4 className="bold-text text-[var(--black-color)] flex gap-1">
                      Rs.{prod.price}
                      <span className="line-through text-gray-500">
                        {prod.mrp}
                      </span>
                      <span className="text-green-500">
                        {Math.round(((prod.mrp - prod.price) / prod.mrp) * 100)}
                        % OFF
                      </span>
                    </h4>
                  </div>
                  <div>
                    <button
                      className="app__flex gap-1 bg-[var(--secondary-color)] text-white px-3 
                  py-1 rounded-lg mt-1 hover:bg-blue-500"
                    >
                      <a
                        href={prod.whatsappLink}
                        key={index}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Add
                      </a>{" "}
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      ) : (
        <Spinner />
      )}
    </section>
  );
};

export default MotionWrap(Product, "app__product");
