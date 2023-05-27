import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiOutlinePlus } from "react-icons/ai";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/zoom";

// import required modules
import { EffectCube, Pagination, Zoom } from "swiper";
import { urlFor } from "../../client";

const Individual = ({ prodImg, prod, options }) => {
  return (
    <div className="h-full w-full px-8  mb-20">
      <div className="flex flex-col md:flex-row gap-2">
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
              <SwiperSlide>
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

        <div className="w-[100%] md:w-[55%] h-full ml-12 flex flex-col">
          <div className="head-text mr-auto whitespace-nowrap">{prod.name}</div>

          <div className="h-text text-lg text-red-400 mr-auto animate-pulse">
            {prod.special}!
          </div>

          <div className="flex mt-6">
            <h4 className="bold-text text-[var(--black-color)] flex gap-2 text-2xl ">
              Rs.{prod.price}
              <span className="line-through text-gray-500">{prod.mrp}</span>
              <span className="text-green-500 animate-pulse">
                {Math.round(((prod.mrp - prod.price) / prod.mrp) * 100)}% OFF
              </span>
            </h4>
          </div>

          <div className="flex flex-col gap-8 mt-6">
            {options.map((opt, ind) => (
              <div className="flex flex-col gap-2 " key={ind}>
                <div className="h-text mr-auto ">{opt.title} </div>
                <div className="flex gap-4">
                  {opt.values.map((op, i) => (
                    <div
                      className={`bg-[var(--secondary-color)] p-text text-base text-white 
                    px-3 cursor-pointer py-1 rounded-full hover:bg-blue-500 hover:scale-105`}
                    >
                      {op}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-8 w-[90%]">
            <button
              className="app__flex gap-1 bg-[var(--secondary-color)] text-white px-3 
                  py-1 rounded-lg mt-1 hover:bg-blue-500 hover:scale-105 text-xl w-[50%]"
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

          <div className="my-10 app__flex flex-col items-start">
            <div className="h-text mb-1">Description</div>
            <pre className="app__flex justify-start p__opensans">
              {prod.description}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Individual;
