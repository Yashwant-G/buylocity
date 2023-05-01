import React, { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { motion } from "framer-motion";

import MotionWrap from "../../wrapper/MotionWrap";

import { urlFor, client } from "../../client";
import "./Testimonial.scss";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const query = '*[_type == "testimonial"]';

    client.fetch(query).then((data) => {
      setTestimonials(data);
    });
  }, []);

  return (
    <div className="app__testimonial">
      <h2 className="head-text about_head mt-40">Our Testimonials</h2>
      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <div className="app__testimonial-rating">
              <img
                src={urlFor(testimonials[currentIndex].userImage)}
                alt={testimonials[currentIndex].name}
              />
              <div className="flex">
                {Array.from(
                  { length: testimonials[currentIndex].rating },
                  (_, i) => (
                    <span key={i}>
                      <AiFillStar style={{ color: "#FFD700" }} />
                    </span>
                  )
                )}
                {Array.from(
                  { length: 5 - testimonials[currentIndex].rating },
                  (_, i) => (
                    <span key={testimonials[currentIndex].rating + i}>
                      <AiOutlineStar style={{ color: "var(--black-color)" }} />
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="app__testimonial-content">
              <p className="p-text">{testimonials[currentIndex].testimonial}</p>
              <div>
                <h4 className="bold-text">{testimonials[currentIndex].name}</h4>
                <h5 className="p-text">
                  {testimonials[currentIndex].designation}
                </h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>

            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}
      <div>
        <button
          className="text-white text-center text-xl lg:text-3xl flex justify-center 
              items-center mx-auto bg-[var(--secondary-color)] 
              px-7 py-5 mt-4 mb-8 rounded-full p-text hover:scale-105"
        >
          <a href="/" target="_blank" rel="noreferrer">
            {" "}
            Write a Testimonial
          </a>
        </button>
      </div>

      <div>
        <h1 className="text-[var(--black-color)] text-center text-3xl my-[5rem] mt-28 lg:text-6xl">
          <motion.div
            whileInView={{ x: [-200, 0], opacity: [0, 1], scale: [0, 1] }}
            transition={{ duration: 2 }}
            className=""
          >
            <i>App Coming Soon....</i>
          </motion.div>
        </h1>
      </div>
    </div>
  );
};

export default MotionWrap(Testimonial, "app__testimonial");
