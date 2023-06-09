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
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/loading";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [currentRate, setCurrentRate] = useState(0);

  const [formData, setFormData] = useState({
    username: "",
    desig: "",
    email: "",
    test: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const { username, desig, email, test } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentRate === 0) {
      toast.error("Please Provide Rating");
      return;
    }

    // setIsFormSubmitted(true);
    dispatch(setLoading(true));

    const entry = {
      _type: "testimonial",
      _id: "drafts.",
      name: formData.username,
      // userImage: "formData.img",
      designation: formData.desig,
      email: formData.email,
      testimonial: formData.test,
      rating: currentRate,
    };

    client
      .create(entry)
      .then(() => {
        console.log("success");
        dispatch(setLoading(false));
        setLoading(false);
        setIsFormSubmitted(true);
        toast.success("Testimonial Submitted");
      })
      .catch((err) => console.log(err));

    toast.success("Testimonial Submitted");
  };

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const query =
      '*[_type == "testimonial" && _id in path("drafts.**") == false] | order(_updatedAt desc)';

    client.fetch(query).then((data) => {
      setTestimonials(data);
      // console.log(data);
    });
  }, []);

  return (
    <div className="app__testimonial " id="testimonial">
      <h2 className="head-text about_head text-3xl sm:text-4xl">
        Our Testimonials
      </h2>
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
          px-5 py-3 rounded-2xl mt-8 hover:scale-105 hover:bg-blue-500"
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
      rounded-2xl ${!open ? "scale-0" : "scale-1"} z-20`}
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
                className="px-4 py-2 h-text text-left text-black text-sm outline-none rounded-lg"
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
                className="px-4 py-2 h-text text-left text-black text-sm outline-none rounded-lg"
                type="text"
                placeholder="Your Designation"
                name="desig"
                value={desig}
                onChange={handleChangeInput}
              />
            </div>

            <div>
              <input
                className="px-4 py-2 h-text text-left text-black text-sm outline-none rounded-lg"
                type="email"
                placeholder="Your Email"
                name="email"
                value={email}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <textarea
                className="px-4 py-2 h-text text-left text-black text-sm outline-none rounded-lg"
                placeholder="Your Testimony"
                name="test"
                value={test}
                onChange={handleChangeInput}
              />
            </div>

            <div className="fle flex-col gap-4">
              <p className="text-lg text-gray-500 font-semibold -mt-2 mb-4 mr-auto">
                Rate Our Service
              </p>
              <div className="relative w-full app__flex -mt-2">
                {[1, 2, 3, 4, 5].map((ind, i) => (
                  <div key={i}>
                    {ind <= currentRate ? (
                      <AiFillStar
                        onClick={() => {
                          setCurrentRate(ind);
                        }}
                        className="text-2xl text-blue-600 cursor-pointer"
                      />
                    ) : (
                      <AiOutlineStar
                        onClick={() => {
                          setCurrentRate(ind);
                        }}
                        className="text-2xl text-blue-600 cursor-pointer"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              className="bg-[var(--secondary-color)] text-white p-text text-lg px-3 py-1 hover:bg-white 
        hover:text-[var(--gray-color)] rounded-3xl mt-2"
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
        className={`fixed bg-[#5f5f5f83] top-0 left-0 right-0 bottom-0 ${
          open ? "scale-1" : "scale-0"
        } z-10`}
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
