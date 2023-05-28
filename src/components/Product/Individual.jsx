import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiOutlinePlus, AiOutlineDown, AiOutlineUp } from "react-icons/ai";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/zoom";

// import required modules
import { EffectCube, Pagination, Zoom } from "swiper";
import { urlFor } from "../../client";
import { Link } from "react-router-dom";

const Individual = ({ prodImg, prod, options, tags }) => {
  const [showDesc, setShowDesc] = useState(false);
  const [showAb, setShowAb] = useState(false);
  return (
    <div className="h-full w-full px-8  mb-20 mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-[100%] h-full md:w-[45%]">
          <Swiper
            effect={"cube"}
            zoom={true}
            grabCursor={true}
            // loop={true}
            cubeEffect={{
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Zoom, EffectCube, Pagination]}
            className="mySwiper"
          >
            {prodImg.map((productImage, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-zoom-container">
                  <img
                    src={urlFor(productImage)}
                    alt={index}
                    className="rounded-lg pb-8"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-[100%] md:w-[55%] h-full app__flex flex-col mx-auto">
          <div className="head-text mt-4 md:mt-0 text-2xl md:text-3xl mr-auto whitespace-pre-line text-left">
            {prod.name}
          </div>

          <div className="h-text text-sm md:text-lg text-red-400 mr-auto animate-pulse">
            {prod.special}
          </div>

          <div className="flex mt-6 mr-auto">
            <h4 className="bold-text text-[var(--black-color)] flex gap-2 text-xl md:text-2xl ">
              Rs.{prod.price}
              <span className="line-through text-gray-500">{prod.mrp}</span>
              <span className="text-green-500 animate-pulse">
                {Math.round(((prod.mrp - prod.price) / prod.mrp) * 100)}% OFF
              </span>
            </h4>
          </div>

          <div className="flex flex-col gap-8 mt-6 mr-auto">
            {options &&
              options.map((opt, ind) => (
                <div className="flex flex-col gap-2 " key={ind}>
                  <div className="h-text mr-auto ">{opt.title} </div>
                  <div className="flex gap-4">
                    {opt.values.map((op, i) => (
                      <div key={i}
                        className={`bg-[var(--secondary-color)] p-text text-sm md:text-base text-white 
                    px-3 cursor-pointer py-1 rounded-full hover:bg-blue-500 hover:scale-105`}
                      >
                        {op}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          <div className="flex gap-4 mt-8 w-[100%] md:w-[90%] mr-auto">
            <button
              className="app__flex gap-1 bg-[var(--secondary-color)] text-white px-3 
                  py-1 rounded-lg mt-1 hover:bg-blue-500 hover:scale-105  whitespace-nowrap text-lg md:text-xl w-[50%]"
            >
              <a href={prod.whatsappLink} target="_blank" rel="noreferrer">
                Add to cart
              </a>{" "}
              <AiOutlinePlus />
            </button>
            <button
              className="app__flex gap-1 bg-yellow-300 text-gray-700 font-medium px-3 
                  py-1 rounded-lg mt-1 hover:bg-yellow-500 hover:scale-105 w-[50%]"
            >
              <a href={prod.whatsappLink} target="_blank" rel="noreferrer">
                Buy Now
              </a>{" "}
            </button>
          </div>

          <div className="my-10 app__flex flex-col items-start mr-auto">
            <div
              onClick={() => {
                setShowDesc(!showDesc);
              }}
              className="h-text mb-1 app__flex gap-1 cursor-pointer"
            >
              Description
              {showDesc ? <AiOutlineUp /> : <AiOutlineDown />}
            </div>
            <pre
              className={`app__flex justify-start p__opensans whitespace-pre-line ${
                showDesc ? "flex" : "hidden"
              }`}
            >
              {prod.description}
            </pre>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-4 mt-0 md:mt-6">
        <div
          onClick={() => {
            setShowAb(!showAb);
          }}
          className="h-text mr-auto md:mr-0 app__flex gap-1 cursor-pointer"
        >
          About Product {showAb ? <AiOutlineUp /> : <AiOutlineDown />}
        </div>
        <div
          className={`p-text text-sm md:text-lg ${showAb ? "flex" : "hidden"}`}
        >
          {prod.shortDescription}
        </div>
      </div>

      {prod.return && <div className="flex flex-col w-full gap-4 mt-10">
        <div className="h-text mr-auto md:mr-0 app__flex gap-2 cursor-pointer">Hassle Free Return/Exchange</div>
        <div className="p-text md:text-center text-sm md:text-lg">{prod.return} For complete informatiom, refer <Link to="/return&refund" className="text-blue-500 hover:underline" >return/refund policy</Link></div>
      </div>}

      { prod.warranty && <div className="flex flex-col w-full gap-4 mt-10">
        <div className="h-text mr-auto md:mr-0 app__flex gap-2 cursor-pointer">Warranty</div>
        <div className="p-text md:text-center text-sm md:text-lg">{prod.warranty}</div>
      </div>}


      <div className="flex gap-8 mt-8 flex-wrap">
        {tags.map((t, index) => (
          <div className="text-blue-500" key={index}>#{t}</div>
        ))}
      </div>
    </div>
  );
};

export default Individual;
