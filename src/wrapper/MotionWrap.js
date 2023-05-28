import React from 'react';
import { motion } from 'framer-motion';

const MotionWrap = (Component, classNames) => function HOC(props) {
  return (
    <motion.div
      whileInView={{ y: [60,0], opacity: [0.2, 1] }}
      transition={{ duration: 0.5 }}
      className={`${classNames} app__flex`}
    >
      <Component {...props} />
    </motion.div>
  );
};

export default MotionWrap;
