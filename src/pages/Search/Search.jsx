import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { client, urlFor } from "../../client";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlist";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [product, setProduct] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const { products } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      setFilterProduct([]);
      return;
    }
    setFilterProduct(
      product.filter(
        (product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          product.shortDescription
            ?.toLowerCase()
            .includes(searchValue.toLowerCase())
      )
    );
    console.log(filterProduct);
  };

  useEffect(() => {
    const query2 = '*[_type == "product"] | order(_updatedAt desc)';

    client.fetch(query2).then((data) => {
      setProduct(data);
      // console.log(data);
    });
  }, []);

  return (
    <div className="w-11/12 mx-auto min-h-screen">
      <Helmet>
        <title>Buylocity- Search</title>
        <meta
          name="description"
          content="Discover a wide selection of products and categories at our online store. Explore our extensive range of high-quality 
          items to meet all your needs. From electronics to home decor, fashion to kitchenware, we offer a diverse collection to cater to 
          every taste and preference. Whether you're looking for the latest gadgets, stylish clothing, or unique gifts, our website has 
          you covered. Browse through our user-friendly interface, conveniently organized into various categories, making it easy to find 
          exactly what you're searching for. Shop with confidence and enjoy a seamless shopping experience with our trusted online store"
        />
      </Helmet>
      <div
        onClick={() => navigate("/")}
        className="pt-6 cursor-pointer border-b ml-4 mr-5 pb-5 border-b-gray-500 flex gap-2 items-center text-lg text-[var(--secondary-color)]"
      >
        <MdArrowBackIosNew />
        <div>Back to Home</div>
      </div>
      <div className="">
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              onChange={handleChange}
              value={searchValue}
              placeholder="Search something.."
            />
          </div>
        </div>

        <div className="mt-8">
          {filterProduct.length > 0 ? (
            <section className="app__flex w-full flex-col " id="products">
              <h2 className="h-text text-xl lg:text-3xl">
                <span>Found</span> {filterProduct.length} Products
              </h2>

              <motion.div
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                className={`app__products-portfolio ${
                  filterProduct.length === 1 && "justify-center"
                } ${filterProduct.length < 4 && "lg:justify-center"}`}
              >
                {filterProduct.map((prod, index) => (
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
                            {products.find((p) => p._id === prod._id) ? (
                              <AiFillHeart
                                onClick={() =>
                                  dispatch(removeFromWishlist({ id: prod._id }))
                                }
                                className=" cursor-pointer absolute top-[3%] right-[3%] text-2xl z-10 text-red-500"
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
                            <Link to={`/products/${prod._id}`}>
                              {prod.name}
                            </Link>
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
                No Products Found
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
