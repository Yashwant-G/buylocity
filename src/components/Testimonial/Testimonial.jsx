import React, { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { motion } from "framer-motion";

import MotionWrap from "../../wrapper/MotionWrap";

import { urlFor, client } from "../../client";
import "./Testimonial.scss";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    desig: "",
    email: "",
    test: "",
    rate: undefined,
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { username, desig, email, test, rate } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsFormSubmitted(true);
    setLoading(true);

    const entry = {
      _type: "testimonial",
      _id: 'drafts.',
      name: formData.username,
      // userImage: formData.img,
      designation: formData.desig,
      email: formData.email,
      testimonial: formData.test,
      rating: parseInt(formData.rate),
    };

    client
      .create(entry)
      .then(() => {
        console.log("success");
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const query = '*[_type == "testimonial"] | order(_updatedAt asc)';

    client.fetch(query).then((data) => {
      setTestimonials(data);
    });
  }, []);

  return (
    <div className="app__testimonial " id="testimonial">
      <h2 className="head-text about_head text-3xl sm:text-4xl">Our Testimonials</h2>
      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <div className="app__testimonial-rating">
              {testimonials[currentIndex].userImage && (
                <img
                  src={urlFor(testimonials[currentIndex].userImage)}
                  alt={testimonials[currentIndex].name}
                  loading="lazy"
                />
              )}
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
              <p className="p-text text-lg sm:text-xl">
                {testimonials[currentIndex].testimonial}
              </p>
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
          className="app__flex gap-2 mx-auto bg-[var(--secondary-color)] text-white text-l lg:text-2xl
          px-5 py-3 rounded-2xl mt-8 hover:scale-105 hover:bg-[#DDB34B]"
          onClick={() => {
            setOpen(true);
          }}
        >
          Write a Testimonial
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] 
      scale-1 z-10 bg-[#ffce53] app__flex flex-col gap-4 py-8 px-8 
      rounded-2xl ${!open ? "scale-0" : "scale-1"}`}
      >
        <div className="flex w-full justify-end items-center text-xl cursor-pointer mt-[-1rem]">
          <AiOutlineCloseCircle
            onClick={() => {
              setOpen(false);
            }}
            className=""
          />
        </div>
        {!isFormSubmitted ? (
          <>
            <div>
              <input
                className="px-4 py-2 h-text text-left text-sm outline-none rounded-lg"
                type="text"
                placeholder="Your name"
                name="username"
                value={username}
                onChange={handleChangeInput}
                required
              />
            </div>
            <div>
              <input
                className="px-4 py-2 h-text text-left text-sm outline-none rounded-lg"
                type="text"
                placeholder="Your Designation"
                name="desig"
                value={desig}
                onChange={handleChangeInput}
              />
            </div>

            <div>
              <input
                className="px-4 py-2 h-text text-left text-sm outline-none rounded-lg"
                type="email"
                placeholder="Your Email"
                name="email"
                value={email}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <textarea
                className="px-4 py-2 h-text text-left text-sm outline-none rounded-lg"
                placeholder="Your Testimony"
                name="test"
                value={test}
                onChange={handleChangeInput}
              />
            </div>
            <div className="relative w-full">
              <input
                className="px-4 py-2 h-text text-left text-sm outline-none rounded-lg appearance-none w-full"
                type="number"
                placeholder="Rate us Out of 5"
                name="rate"
                value={rate}
                onChange={handleChangeInput}
                min="1"
                max="5"
              />
            </div>
            <button
              className="bg-[var(--secondary-color)] text-white p-text text-lg px-3 py-1 hover:bg-white 
        hover:text-[var(--gray-color)] rounded-3xl"
              type="submit"
            >
              {!loading ? "Submit" : "Submitting..."}
            </button>
            <div className="flex justify-start w-[200px]">
              <p className="p-text text-gray-500">
                If you are comfortable in sharing your image, please{" "}
                <a
                  className=" text-blue-500"
                  href="https://forms.gle/LMKQWXXYP9NKnQ8F8"
                  target="_blank"
                  rel="noreferrer"
                >
                  click here
                </a>{" "}
              </p>
            </div>
          </>
        ) : (
          <div className="h-text">Thank You For Your Testimonial..🙂</div>
        )}
      </form>

      <div
        onClick={() => {
          setOpen(false);
        }}
        className={`fixed bg-[#5f5f5f83] top-0 left-0 right-0 bottom-0 ${open? 'scale-1':'scale-0'}`}
      ></div>

      <div>
        <h1 className="text-[var(--black-color)] text-center text-3xl my-[5rem] mt-28 lg:text-6xl coming-soon">
          <motion.div
            whileInView={{ x: [-60, 0], opacity: [0, 1], scale: [0, 1] }}
            transition={{ duration: 1 }}
            className=""
          >
            App Coming Soon....
          </motion.div>
        </h1>
      </div>
    </div>
  );
};

export default MotionWrap(Testimonial, "app__testimonial");
