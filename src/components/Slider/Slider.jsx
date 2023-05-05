import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../client";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
// import { motion } from 'framer-motion';
import './Slider.css';

const Slider = () => {
  const [SliderData, setSliderData] = useState([]);
  let sz=0;
  let [count, setCount] = useState(0);

  useEffect(() => {
    const query = '*[_type == "slider"] | order(_updatedAt desc)';

    client.fetch(query).then((data) => {
      setSliderData(data);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      sz=data.length;
    });
  }, []);

  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    
    if (direction === 'left') {
      current.scrollLeft -= 400;
    } else {
      current.scrollLeft += 400;
    }
  };
  
  let direction1
  const scroll1 = () => {
    const { current } = scrollRef;
    // console.log(count);
    if(count===sz) direction1="left";
    if(count===0) direction1="right";
    
    if (direction1 === 'left') {
      setCount(count--);
      current.scrollLeft -= 400;
    } else {
      setCount(count++);
      current.scrollLeft += 400;
    }
  };

  
  const intervalTime = 3000;

  // Define the function that will be called by the interval timer
  const autoScroll = () => {
    scroll1();
  };

  // Set up the interval timer
  useEffect(() => {
    const interval = setInterval(autoScroll, intervalTime);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null;
  }

  return (
      <div className="app__slider app__flex" id="home">
        <div className="app__slider-images">
            <div className="app__slider-images_container" ref={scrollRef}>
                {SliderData.map((slide, index) => (
                    <div className="app__slider-images_card app__flex" key={`slider_image-${index + 1}`}>
                        <img src={urlFor(slide.imgUrl)} alt="slider_image" loading="lazy"/>
                    </div>
                ))}
            </div>
            <div className="app__slider-images_arrows">
                <BsArrowLeftShort className="slider__arrow-icon" onClick={() => scroll('left')} />
                <BsArrowRightShort className="slider__arrow-icon" onClick={() => scroll('right')} />
            </div>
        </div>
    </div>
  );
};

export default Slider;

