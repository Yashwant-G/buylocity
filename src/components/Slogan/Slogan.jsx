import React from "react";
import MotionWrap from "../../wrapper/MotionWrap";
import { motion } from "framer-motion";

const Slogan = () => {
  return (
    <div className="w-[80%] h-full py-20">
      <h2 className="h-text">
        <motion.div
          whileInView={{ x: [-200, 0], opacity: [0, 1] }}
          transition={{ duration: 1.5 }}
          className=""
        >
          <i>
          &quot;You think <span>you'll come fast.</span> No, we'll <span>come fast</span>.&quot;
          </i>
        </motion.div>
      </h2>
    </div>
  );
};

export default MotionWrap(Slogan, "app__slogan");
