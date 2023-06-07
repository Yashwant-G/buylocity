import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiOutlinePlus, AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import { urlFor, client } from "../../client";
import "./Product.scss";
import MotionWrap from "../../wrapper/MotionWrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/loading";
import { toast } from "react-hot-toast";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlist";

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Clothing");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [sortBy, setSortBy] = useState("new");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.wishlist);

  useEffect(() => {
    const query1 = '*[_type == "categories"] | order(_updatedAt desc)';

    client.fetch(query1).then((data) => {
      setCategories(data);
      // console.log(categories[1].features.length);
      // console.log(urlFor(categories[1].features[1].featureimg));
    });

    const query2 = '*[_type == "product"] | order(_updatedAt desc)';

    client.fetch(query2).then((data) => {
      setProduct(data);
      // console.log(data);
      setFilterProduct(data.filter((prod) => prod.tags.includes("Clothing")));
    });
  }, []);

  useEffect(() => {
    setSortBy("new")
  },[activeFilter]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    dispatch(setLoading(true));
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      if (e.target.value === "new") {
        setFilterProduct((prevFilterProduct) => {
          const sortedProducts = [...prevFilterProduct].sort((a, b) => {
            const dateA = new Date(a._updatedAt);
            const dateB = new Date(b._updatedAt);
            return dateB - dateA;
          });
          return sortedProducts;
        });
      }
      if (e.target.value === "LtoH") {
        setFilterProduct((prevFilterProduct) => {
          const sortedProducts = [...prevFilterProduct].sort(
            (a, b) => a.price - b.price
          );
          return sortedProducts;
        });
      }
      if (e.target.value === "HtoL") {
        setFilterProduct((prevFilterProduct) => {
          const sortedProducts = [...prevFilterProduct].sort(
            (a, b) => b.price - a.price
          );
          return sortedProducts;
        });
      }
      setAnimateCard([{ y: 0, opacity: 1 }]);
    }, 500);

    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  };

  const handleWorkFilter = (item) => {
    dispatch(setLoading(true));
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      setFilterProduct(product.filter((prod) => prod.tags.includes(item)));
    }, 500);
    setTimeout(() => {
      dispatch(setLoading(false));
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

      <div className="flex gap-2 items-center w-[78%] mx-auto mb-4 justify-center md:justify-start">
        <div className="h-text font-[500] text-base md:text-lg">Sort by:</div>
        <select
          name="sort"
          value={sortBy}
          onChange={handleSortChange}
          className="p-0.5 md:p-1 border md:border-2 rounded-sm border-gray-600 outline-none w-fit p-text md:text-base"
        >
          <option value="new">Newest</option>
          <option value="LtoH">Price: Low to High</option>
          <option value="HtoL">Price: High to Low</option>
        </select>
      </div>

      <motion.div
        animate={animateCard}
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
                          className="h-full w-full z-0"
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
      </motion.div>
    </section>
  );
};

export default MotionWrap(Product, "app__product");
