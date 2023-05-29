import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiOutlinePlus, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { BsCartX } from "react-icons/bs";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/zoom";

// import required modules
import { EffectCube, Pagination, Zoom } from "swiper";
import { urlFor } from "../../client";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Individual = ({ prodImg, prod, options, tags }) => {
  const [showDesc, setShowDesc] = useState(false);
  const [showAb, setShowAb] = useState(false);
  const [actColor, setActColor] = useState("");
  const [actPack, setActPack] = useState("");
  const [actSize, setActSize] = useState("");
  const handleChange = (value, type) => {
    if (type === "Color") {
      setActColor(value);
    }
    if (type === "Pack") {
      setActPack(value);
    }
    if (type === "Size") {
      setActSize(value);
    }
    if (type === "Submit") {
      toast.success(`${prod.name} Added to Cart`);
      confetti({
        particleCount: 300,
        spread: 70,
        origin: { y: 1 },
      });
    }
  };

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

          <div className="h-text text-sm md:text-lg text-[red] mr-auto animate-pulse">
            {prod.special}
          </div>

          <div className="flex mt-6 mr-auto">
            <h4 className="bold-text text-[var(--black-color)] flex gap-2 text-xl md:text-2xl ">
              Rs.{prod.price}
              <span className="line-through text-gray-500">{prod.mrp}</span>
              <span className="text-green-600 ">
                {Math.round(((prod.mrp - prod.price) / prod.mrp) * 100)}% OFF
              </span>
            </h4>
          </div>

          <div className="flex flex-col gap-8 mt-6 mr-auto">
            {options &&
              options.map((opt, ind) => (
                <div className="flex flex-col gap-2 " key={ind}>
                  <div className="h-text mr-auto ">{opt.title} </div>
                  {opt.title === "Color" ? (
                    <div className="flex gap-4 cursor-pointer flex-wrap mt-2 ">
                      {opt.values.map((op, i) => (
                        <div
                          key={i}
                          onClick={() => handleChange(op, opt.title)}
                          className="flex flex-col items-center gap-1"
                        >
                          <div
                            className={`${
                              op === actColor &&
                              "border-2 border-blue-500 rounded-full hover:scale-110"
                            } p-1`}
                          >
                            <div
                            style={{backgroundColor: `${op.toLowerCase()}`}}
                              className={`h-[30px] w-[30px] hover:scale-110 border-[1.2px] 
                              border-[var(--black-color)] rounded-full`}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      {opt.values.map((op, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            handleChange(op, opt.title);
                          }}
                          className={`${
                            op === actSize || op === actPack
                              ? "bg-[var(--secondary-color)] text-white"
                              : "bg-white text-black"
                          }  p-text text-sm md:text-base
                    px-3 cursor-pointer py-1 rounded-full hover:bg-[var(--secondary-color)] hover:text-white hover:scale-105`}
                        >
                          {op}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>

          {prod.stock !== 0 ? (
            <div className="w-full mt-8">
              {prod.stock < 3 && (
                <div className="p__opensans ml-1 text-[red] animate-bounce">
                  Hurry only {prod.stock} left !!!
                </div>
              )}
              <div className="flex gap-4 w-[100%] md:w-[90%] mr-auto">
                <button
                  onClick={() => {
                    handleChange(null, "Submit");
                  }}
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
            </div>
          ) : (
            <div className="flex gap-4 mt-8 w-[100%] md:w-[90%] mr-auto">
              <button
                onClick={() => {
                  toast.error("Out of Stock");
                }}
                className="app__flex gap-1 bg-[var(--gray-color)] text-white px-3 
                  py-1 rounded-lg mt-1 hover:bg-gray-700 hover:scale-105  whitespace-nowrap text-lg md:text-xl w-[50%] mx-0 md:mx-auto"
              >
                Out of Stock <BsCartX />
              </button>
            </div>
          )}

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
              className={`app__flex justify-start p-text text-sm md:text-base whitespace-pre-line ${
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

      {prod.return && (
        <div className="flex flex-col w-full gap-4 mt-10">
          <div className="h-text mr-auto md:mr-0 app__flex gap-2 cursor-pointer">
            Hassle Free Return/Exchange
          </div>
          <div className="p-text md:text-center text-sm md:text-lg">
            {prod.return} For complete informatiom, refer{" "}
            <Link to="/return&refund" className="text-blue-500 hover:underline">
              return/refund policy
            </Link>
          </div>
        </div>
      )}

      {prod.warranty && (
        <div className="flex flex-col w-full gap-4 mt-10">
          <div className="h-text mr-auto md:mr-0 app__flex gap-2 cursor-pointer">
            Warranty
          </div>
          <div className="p-text md:text-center text-sm md:text-lg">
            {prod.warranty}
          </div>
        </div>
      )}

      <div className="flex gap-8 mt-8 flex-wrap">
        {tags.map((t, index) => (
          <div className="text-blue-500" key={index}>
            #{t}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Individual;
