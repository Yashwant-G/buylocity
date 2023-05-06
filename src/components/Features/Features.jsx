import React, { useState, useEffect, useContext } from "react";
import { ModeContext } from "../../context/context";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { client, urlFor } from "../../client";

const Features = () => {
  const [features, setFeatures] = useState([]);
  const { light } = useContext(ModeContext);

  useEffect(() => {
    const query3 = '*[_type == "features"] | order(_updatedAt asc)';
    client.fetch(query3).then((data) => {
      setFeatures(data);
    });
  });
  return (
    <div>
      
      <div className="flex flex-col w-full my-12">
        <div className="h-[1.5px] w-full bg-[var(--black-color)]"></div>
        <div className="overflow-hidden app__flex flex-wrap justify-between mx-auto mt-8 px-4 w-full">
          {features.map((feat, index) => (
            <img
              src={urlFor(feat.imgUrl)}
              alt={index}
              key={index}
              className={`w-20 lg:w-40 ${light ? "invert-0" : "invert"}`}
            />
          ))}
        </div>
        <div className="h-[1.5px] w-full bg-[var(--black-color)] mt-6"></div>
      </div>

      <div>
        <h2 className="head-text mt-20 text-2xl lg:text-[2rem]">
          For <span>Complete</span> Catalogue, <span>visit:</span>
        </h2>
        <div>
          <a
            href="https://wa.me/c/918383004856"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <button
              className="app__flex gap-2 mx-auto bg-[var(--secondary-color)] text-white text-l lg:text-xl
          px-4 py-3 rounded-2xl mt-8 hover:scale-105 hover:bg-[#DDB34B]"
            >
              Whatsapp Store <AiOutlineWhatsApp />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Features;
