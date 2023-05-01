import React, { useState, useEffect } from "react";
import "./About.scss";
import { client } from "../../client";
import { motion } from "framer-motion";
import MotionWrap from "../../wrapper/MotionWrap";

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "aboutUs"][0].aboutUs';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);
  return (
    <div className="app__about" id="about">
      <h2 className="head-text about_head">About Us</h2>
      <h2 className="h-text about_text">
        <motion.div
          whileInView={{ scale:[0.5,1] , opacity: [0, 1] }}
          transition={{ duration: 1 }}
          className=""
        >
          <i>{abouts}</i>
        </motion.div>
      </h2>
    </div>
  );
};

export default MotionWrap(About, "app__about");
