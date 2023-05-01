import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../client";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
// import { motion } from 'framer-motion';
import './Slider.css';

const Slider = () => {
  const [SliderData, setSliderData] = useState([]);

  useEffect(() => {
    const query = '*[_type == "slider"]';

    client.fetch(query).then((data) => {
      setSliderData(data);
    });
  }, []);

  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;

    if (direction === 'left') {
      current.scrollLeft -= 500;
    } else {
      current.scrollLeft += 500;
    }
  };

  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null;
  }

  return (
      <div className="app__gallery flex__center" id="home">
        <div className="app__gallery-images">
            <div className="app__gallery-images_container" ref={scrollRef}>
                {SliderData.map((slide, index) => (
                    <div className="app__gallery-images_card flex__center" key={`gallery_image-${index + 1}`}>
                        <img src={urlFor(slide.imgUrl)} alt="gallery_image" loading="lazy"/>
                    </div>
                ))}
            </div>
            <div className="app__gallery-images_arrows">
                <BsArrowLeftShort className="gallery__arrow-icon" onClick={() => scroll('left')} />
                <BsArrowRightShort className="gallery__arrow-icon" onClick={() => scroll('right')} />
            </div>
        </div>
    </div>
  );
};

export default Slider;

