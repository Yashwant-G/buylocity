import React from "react";
import { AiFillHeart, AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import { urlFor } from "../../client";
import "./WishlistProd.scss";
import MotionWrap from "../../wrapper/MotionWrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { removeFromWishlist } from "../../redux/slices/wishlist";

const Wishlist = () => {
  const { products } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      {products.length > 0 ? (
        <section className="app__flex w-full flex-col " id="products">
          <h2 className="head-text text-2xl lg:text-4xl">
            <span>Your</span> Wishlist
          </h2>

          <motion.div
            transition={{ duration: 0.5, delayChildren: 0.5 }}
            className={`app__products-portfolio ${
              products.length === 1 && "justify-center"
            } ${products.length < 4 && "lg:justify-center"}`}
          >
            {products.map((prod, index) => (
              <div key={index}>
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
					  
                      <AiFillHeart
                        onClick={() =>
                          dispatch(removeFromWishlist({ id: prod._id }))
                        }
                        className="absolute top-[3%] right-[3%] text-2xl z-10 text-red-500"
                      />
                
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
                          {Math.round(
                            ((prod.mrp - prod.price) / prod.mrp) * 100
                          )}
                          % OFF
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
          </motion.div>
        </section>
      ) : (
        <div className="app__flex flex-col h-[60vh] gap-4">
          <div className="head-text text-2xl md:text-3xl">
            Your Wishlist is Empty
          </div>
          <div>
            <Link to="/products">
              <button className="h-text text-base md:text-xl text-white bg-[var(--secondary-color)] px-4 py-2 rounded-2xl ">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MotionWrap(Wishlist, "app__product");
