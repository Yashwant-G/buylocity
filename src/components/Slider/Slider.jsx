import React, { useEffect, useState } from "react";

import { client, urlFor } from "../../client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

import "./Slider.scss";

const Slider = () => {
  const [SliderData, setSliderData] = useState([]);

  useEffect(() => {
    const query = '*[_type == "slider"] | order(_updatedAt desc)';

    client.fetch(query).then((data) => {
      setSliderData(data);
    });
  }, []);

  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null;
  }

  return (
    <div className="flex flex-col h-full w-full" id="home">
      <div className="pt-32" >
        <Swiper id="swiper1"
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {SliderData.map((slide, index) => (
            <SwiperSlide key={index}>
              <img
                className="sm:rounded-xl pb-7"
                src={urlFor(slide.imgUrl)}
                alt="slider_image"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
