import React, { useState, useEffect, useContext } from "react";
import {
  AiOutlinePlus,
  AiOutlineDoubleRight,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { motion } from "framer-motion";
import { ModeContext } from "../../context/context";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import { urlFor, client } from "../../client";
import "./BestSeller.scss";
import MotionWrap from "../../wrapper/MotionWrap";
import { Link } from "react-router-dom";

const BestSeller = ({ search, firstHead, secondHead }) => {
  const [filterProduct, setFilterProduct] = useState([]);
  const { light } = useContext(ModeContext);
  // console.log(search==="Bestseller");

  useEffect(() => {
    const query2 = '*[_type == "product"] | order(_updatedAt asc)';
    client.fetch(query2).then((data) => {
      setFilterProduct(
        data.filter((prod) => search.some((tag) => prod.tags.includes(tag)))
      );
    });
  }, [search]);

  return (
    <section className="app__flex w-full flex-col " id="products">
      <h2 className="head-text text-2xl lg:text-4xl mb-8 md:mb-16 mt-10">
        {firstHead} <span>{secondHead}</span>
      </h2>

      <div className={`app__bestseller-portfolio app__flex `}>
        {filterProduct.map((prod, index) => (
          <div key={index}>
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, type: "tween" }}
              className="app__bestseller-portfolio "
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
                      <SwiperSlide key={ind}>
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
                      {Math.round(((prod.mrp - prod.price) / prod.mrp) * 100)}%
                      OFF
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
      </div>

      {filterProduct.length > 2 && (
        <AiOutlineDoubleRight
          className={`mt-4 text-4xl scrollRight ${
            light ? "invert-0" : "invert"
          }`}
        />
      )}

      <div>
        <Link to="/products">
          <button
            className="mx-auto bg-[var(--secondary-color)] text-white text-l lg:text-xl
          px-5 py-3 rounded-2xl mt-8 hover:scale-105 hover:bg-blue-500 app__flex gap-2"
          >
            {" "}
            All Products <AiOutlineShoppingCart />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default MotionWrap(BestSeller, "app__product");
