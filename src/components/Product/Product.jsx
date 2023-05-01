import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineWhatsApp } from "react-icons/ai";
import { motion } from "framer-motion";

// import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Product.scss";
import MotionWrap from "../../wrapper/MotionWrap";

const Product = () => {
    const [categories, setCategories]=useState([]);
    const [product, setProduct]=useState([]);
//   const [works, setWorks] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Clothing");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    const query1 = '*[_type == "categories"] | order(_updatedAt desc)';

    client.fetch(query1).then((data) => {
      setCategories(data);
    });

    const query2 = '*[_type == "product"]';

    client.fetch(query2).then((data) => {
      setProduct(data);
      setFilterProduct(data.filter((prod) => prod.tags.includes("Clothing")));
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
    <>
      <h2 className="head-text">
        Explore <span>Our</span> Catalogue
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
          </div>
        ))}
      </div>
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterProduct.map((prod, index) => (
          <a href={prod.whatsappLink} target="_blank" rel="noreferrer"> 
            <motion.div
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, type: "tween" }}
                className="app__work-portfolio"
            >
                <div className="app__work-item app__flex" key={index}>
                  <div className="app__work-img app__flex">
                      <img src={urlFor(prod.productImage)} alt={prod.name} loading="lazy"/>

                      <motion.div
                      whileHover={{ opacity: [0, 1] }}
                      transition={{
                          duration: 0.25,
                          ease: "easeInOut",
                          staggerChildren: 0.5,
                      }}
                      className="app__work-hover app__flex"
                      >
                      
                      </motion.div>
                  </div>

                  <div className="app__work-content app__flex">
                      <h4 className="bold-text text-black">{prod.name}</h4>
                      <p className="p-text text-[#6b7688]" style={{ marginTop: 10 }}>
                          {prod.description}
                      </p>
                  </div>
                  <div className="app__work-content app__flex flex mt-[-15px] ">
                      <h4 className="bold-text text-black flex gap-1">Rs.{prod.price}  
                        <span className="line-through text-gray-500">{prod.mrp}</span> 
                        <span className="text-green-500">
                        {Math.round((prod.price/prod.mrp)*100)}% OFF</span>
                      </h4>
                  </div>
                  <div>
                    <button className="app__flex gap-1 bg-[var(--secondary-color)] text-white px-3 py-1 rounded-lg mt-1">Add <AiOutlinePlus/></button>
                  </div>
                </div>
            </motion.div>
          </a>
        ))}
      </motion.div>

      <div>
        <h2 className="head-text mt-20 text-2xl lg:text-[2rem]">
          For <span>Complete</span> Collections, <span>visit:</span> 
        </h2>
        <div>
          <a href="https://wa.link/f2n8dc" target="_blank" rel="noreferrer"> <button className="app__flex gap-2 mx-auto bg-[var(--secondary-color)] text-white text-l lg:text-xl
          px-4 py-3 rounded-2xl mt-8 hover:scale-105 hover:bg-blue-800">Whatsapp Store <AiOutlineWhatsApp/></button></a>
        </div>
      </div>
    </>
  );
};

export default MotionWrap(Product,"app__product");

