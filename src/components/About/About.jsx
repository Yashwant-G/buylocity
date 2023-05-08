import React, { useState, useEffect } from "react";
import "./About.scss";
import { client } from "../../client";
import { motion } from "framer-motion";
import MotionWrap from "../../wrapper/MotionWrap";

const About = () => {
  const [abouts, setAbouts] = useState(" ");
  const [rdMore, setRdMore] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const query = '*[_type == "aboutUs"][0].aboutUs';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sScreen = width < 650 ? true : false;
  return (
    <div className="app__about " id="about">
      <h2 className="head-text about_head text-3xl sm:text-4xl">About Us</h2>
      <h2 className="h-text about_text">
        <motion.div
          whileInView={{ scale: [0.5, 1], opacity: [0, 1] }}
          transition={{ duration: 1 }}
          className=""
        >
          {sScreen ? (
            <i>
              {rdMore ? (
                <i>
                  {abouts.substring(0, 400)}....
                  <span onClick={() => setRdMore(!rdMore)}>Read more</span>
                </i>
              ) : (
                <i>
                  {abouts}
                  <span onClick={() => setRdMore(!rdMore)}>Show Less</span>
                </i>
              )}
              
            </i>
          ) : (
            <i>{abouts}</i>
          )}
        </motion.div>
      </h2>
    </div>
  );
};

export default MotionWrap(About, "app__about");
