import React, { useState, useEffect, useContext } from "react";
import { AiOutlinePlus, AiOutlineWhatsApp } from "react-icons/ai";
import { motion } from "framer-motion";
import { ModeContext } from "../../context/context";

import { urlFor, client } from "../../client";
import "./Product.scss";
import MotionWrap from "../../wrapper/MotionWrap";

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [features, setFeatures] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Clothing");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const { light } = useContext(ModeContext);

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
      // console.log(urlFor(product[1].productImage));
      setFilterProduct(data.filter((prod) => prod.tags.includes("Clothing")));
    });

    const query3 = '*[_type == "features"] | order(_updatedAt asc)';
    client.fetch(query3).then((data) => {
      setFeatures(data);
    });

  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      setFilterProduct(product.filter((prod) => prod.tags.includes(item)));
    }, 500);
  };

  return (
    <section className="app__flex w-full flex-col " id="products">
      <h2 className="head-text">
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
                  <img src={urlFor(feature.featureimg).url()} key={ind} alt=" " loading="lazy"/>
                ))}
            </div> */}
          </div>
        ))}
      </div>
      

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className={`app__work-portfolio ${filterProduct.length===1 && 'justify-center'} ${filterProduct.length<4 && 'lg:justify-center'}`}
      >
        {filterProduct.map((prod, index) => (
          <a
            href={prod.whatsappLink}
            key={index}
            target="_blank"
            rel="noreferrer"
          >
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, type: "tween" }}
              className="app__work-portfolio "
            >
              <div className="app__work-item app__flex" key={index}>
                <div className="app__work-img app__flex">
                  <img
                    src={urlFor(prod.productImage)}
                    alt={prod.name}
                    loading="lazy"
                  />

                  <motion.div
                    whileHover={{ opacity: [0, 1] }}
                    transition={{
                      duration: 0.25,
                      ease: "easeInOut",
                      staggerChildren: 0.5,
                    }}
                    className="app__work-hover app__flex"
                  ></motion.div>
                </div>

                <div className="app__work-content app__flex">
                  <h4 className="bold-text text-[var(--black-color)]">
                    {prod.name}
                  </h4>
                  <pre
                    className="p-text text-[#6b7688] break-all whitespace-pre-line"
                    style={{ marginTop: 10 }}
                  >
                    {prod.description}
                    {/* {(prod.description).substring(0,10)} */}
                  </pre>
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
                  py-1 rounded-lg mt-1 hover:bg-[#DDB34B]"
                  >
                    Add <AiOutlinePlus />
                  </button>
                </div>
              </div>
            </motion.div>
          </a>
        ))}
      </motion.div>

      <div className="flex flex-col w-full my-12">
        <div className="h-[1px] w-full bg-[var(--black-color)]"></div>
        <div className="flex flex-wrap justify-evenly items-baseline mt-8 px-8 w-full">
          {features.map((feat, index) => (
            <img
              src={urlFor(feat.imgUrl)}
              alt={index}
              key={index}
              className={`w-20 lg:w-40 ${light ? "invert-0" : "invert"}`}
            />
          ))}
        </div>
        <div className="h-[1.5px] w-full bg-[var(--black-color)] mt-6"></div>
      </div>

      <div>
        <h2 className="head-text mt-20 text-2xl lg:text-[2rem]">
          For <span>Complete</span> Catalogue, <span>visit:</span>
        </h2>
        <div>
          <a
            href="https://wa.me/c/918383004856"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <button
              className="app__flex gap-2 mx-auto bg-[var(--secondary-color)] text-white text-l lg:text-xl
          px-4 py-3 rounded-2xl mt-8 hover:scale-105 hover:bg-[#DDB34B]"
            >
              Whatsapp Store <AiOutlineWhatsApp />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default MotionWrap(Product, "app__product");
