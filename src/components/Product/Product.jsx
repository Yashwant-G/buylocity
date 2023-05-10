import React, { useState, useEffect, useContext } from "react";
import { AiOutlinePlus, AiOutlineDoubleRight } from "react-icons/ai";
import { motion } from "framer-motion";
import { ModeContext } from "../../context/context";

import { urlFor, client } from "../../client";
import "./Product.scss";
import MotionWrap from "../../wrapper/MotionWrap";

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Clothing");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [loading,setLoading]=useState(false);
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
      

      {!loading ? <motion.div
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
                    whileInView={{opacity:0}}
                    whileHover={{ opacity: 1 }}
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
                    className="p-text text-[#8693a9] break-all whitespace-pre-line"
                    style={{ marginTop: 10 }}
                  >
                    {(prod.description).substring(0,150)}...
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
      :
      <div className="h-text text-2xl p-20 animate-pulse">loading....</div>
      }

      {filterProduct.length > 2 && (
        <AiOutlineDoubleRight
          className={`mt-4 text-4xl scrollRight ${
            light ? "invert-0" : "invert"
          }`}
        />
      )}
      
    </section>
  );
};

export default MotionWrap(Product, "app__product");
