import React, { useState, useEffect } from "react";
import {
  AiOutlinePlus,
  AiOutlineDoubleRight,
  AiOutlineShoppingCart,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import "./BestSeller.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import { urlFor, client } from "../../client";
import MotionWrap from "../../wrapper/MotionWrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlist";
import { useDispatch, useSelector } from "react-redux";

const BestSeller = ({ search, firstHead, secondHead }) => {
  const [filterProduct, setFilterProduct] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.wishlist);
  // console.log(search==="Bestseller");

  useEffect(() => {
    const query2 = '*[_type == "product"] | order(_updatedAt desc)';
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
                  {products.find((p) => p._id === prod._id) ? (
                      <AiFillHeart
                        onClick={() =>
                          dispatch(removeFromWishlist({ id: prod._id }))
                        }
                        className="cursor-pointer absolute top-[3%] right-[3%] text-2xl z-10 text-red-500"
                      />
                    ) : (
                      <AiOutlineHeart
                        onClick={() => dispatch(addToWishlist(prod))}
                        className="text-black cursor-pointer absolute top-[3%] right-[3%] text-2xl z-10 "
                      />
                    )}
                    {prod.productImages.map((productImage, ind) => (
                      <SwiperSlide key={ind}>
                        <img
                          onClick={() => {
                            navigate(`/products/${prod._id}`);
                          }}
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
                  {prod.shortDescription && (
                    <div
                      className="p-text text-[#8693a9] mr-auto"
                      style={{ marginTop: 10 }}
                    >
                      {prod.shortDescription.substring(0, 20)}...
                    </div>
                  )}
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
                  {prod.stock !== 0 ? (
                    <button
                      onClick={() => {
                        navigate(`/products/${prod._id}`);
                        toast.error("Select Variant");
                      }}
                      className="app__flex gap-1 bg-[var(--secondary-color)] text-white px-3 
                  py-1 rounded-lg mt-1 hover:bg-blue-500"
                    >
                      Add
                      <AiOutlinePlus />
                    </button>
                  ) : (
                    <button
                      onClick={() => toast.error("Out of Stock")}
                      className="app__flex gap-1 bg-gray-400 text-white px-3 
                  py-1 rounded-lg mt-1 hover:bg-gray-600"
                    >
                      Out of stock
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {filterProduct.length > 2 && (
        <AiOutlineDoubleRight
          className={`mt-4 text-4xl scrollRight text-[var(--black-color)]`}
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
