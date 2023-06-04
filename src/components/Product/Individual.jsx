import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  AiOutlinePlus,
  AiOutlineDown,
  AiOutlineUp,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsCartX } from "react-icons/bs";
import { PortableText } from "@portabletext/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Individual.scss";

// import required modules
import { Pagination, Navigation } from "swiper";
import { urlFor } from "../../client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/loading";
import { addToCart } from "../../redux/slices/cart";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlist";
import { RxDoubleArrowUp } from "react-icons/rx";

const Individual = ({ prodImg, prod, options, tags }) => {
  const [showDesc, setShowDesc] = useState(false);
  const [showAb, setShowAb] = useState(false);
  const [actColor, setActColor] = useState("");
  const [actPack, setActPack] = useState("");
  const [actSize, setActSize] = useState("");
  const [colName, setColName] = useState("");
  const [goCart, setGoCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { products } = useSelector((state) => state.wishlist);
  const [wishTogle,setWishTogle] = useState(false);

  useEffect(()=>{
    setWishTogle(true);
    setTimeout(()=>{
      setWishTogle(false);
    },3000)
  },[])

  useEffect(() => {
    setActColor("");
    setActPack("");
    setActSize("");
  }, [location]);

  const cartAdd = () => {
    if (
      options &&
      options.find((item) => item.title === "Size") &&
      actSize === ""
    ) {
      toast.error("Size is required");
      return;
    }
    if (
      options &&
      options.find((item) => item.title === "Pack") &&
      actPack === ""
    ) {
      toast.error("Pack is required");
      return;
    }
    if (
      options &&
      options.find((item) => item.title === "Color") &&
      actColor === ""
    ) {
      toast.error("Color is required");
      return;
    }

    const object = {
      id: prod._id,
      name: prod.name,
      price: prod.price,
      image: prodImg[0],
      stock: prod.stock,
    };
    if (prod.options) {
      const size = options.find((item) => item.title === "Size");
      if (size) object.size = actSize;

      const pack = options.find((item) => item.title === "Pack");
      if (pack) object.pack = actPack;

      const color = options.find((item) => item.title === "Color");
      if (color) object.color = actColor;
    }
    console.log(object);
    dispatch(addToCart(object));

    setGoCart(true);
    setTimeout(() => {
      setGoCart(false);
    }, 3000);
    toast.success(`${prod.name} Added to Cart`);
    confetti({
      particleCount: 300,
      spread: 70,
      origin: { y: 1 },
    });
  };

  const handleChange = async (value, type) => {
    if (type === "Color" && value[0] !== "#") {
      setActColor(value);
    }
    if (type === "Pack") {
      setActPack(value);
    }
    if (type === "Size") {
      setActSize(value);
    }
    if (type === "hex") {
      if (value[0] === "#") {
        dispatch(setLoading(true));
        await fetchData(value.substring(1));
        setActColor(value);
        dispatch(setLoading(false));
      } else {
        setColName("");
      }
    }
  };

  const components = {
    types: {
      code: (props) => (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      ),
      anchor: (props) => (
        <a href={props.node.href} target="_blank" rel="noopener noreferrer">
          {props.children}
        </a>
      ),
      listItem: (props) => <li>{props.children}</li>,
    },
  };

  const fetchData = async (hex) => {
    try {
      const response = await fetch(`https://www.thecolorapi.com/id?hex=${hex}`); // Replace with your API endpoint URL
      const jsonData = await response.json();
      setColName(jsonData.name.value);
      console.log(colName);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="h-full w-full px-8 mb-20 mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative w-[100%] h-full md:h-[577px] md:w-[45%]">
        {wishTogle && (
          <div className="absolute top-14 right-5 z-10 bg-[var(--secondary-color)] 
          flex items-center gap-1 text-white px-2 py-1 rounded-lg animate-bounce">Wishlist here <RxDoubleArrowUp/></div>
        )}
          <Swiper
            id="swiper3"
            grabCursor={true}
            navigation={true}
            pagination={{
              type: "fraction",
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {products.find((p) => p._id === prod._id) ? (
              <AiFillHeart
                onClick={() => dispatch(removeFromWishlist({ id: prod._id }))}
                className="cursor-pointer absolute top-[3%] right-[3%] text-2xl z-10 text-red-500"
              />
            ) : (
              <AiOutlineHeart
                onClick={() => dispatch(addToWishlist(prod))}
                className="cursor-pointer absolute top-[3%] right-[3%] text-2xl z-10 "
              />
            )}

            {prodImg.map((productImage, index) => (
              <SwiperSlide key={index}>
                <img
                  src={urlFor(productImage)}
                  alt={index}
                  loading="lazy"
                  className="rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-[100%] md:w-[55%] h-full app__flex flex-col mx-auto">
          <div className="head-text mt-4 md:mt-0 text-2xl md:text-3xl mr-auto whitespace-pre-line text-left">
            {prod.name}
          </div>

          <div className="h-text text-sm md:text-lg text-[red] mr-auto animate-pulse">
            {prod.special}
          </div>

          <div className="flex mt-6 mr-auto">
            <h4 className="bold-text text-[var(--black-color)] flex gap-2 text-xl md:text-2xl ">
              Rs.{prod.price}
              <span className="line-through text-gray-500">{prod.mrp}</span>
              <span className="text-green-600 ">
                {Math.round(((prod.mrp - prod.price) / prod.mrp) * 100)}% OFF
              </span>
            </h4>
          </div>

          <div className="flex flex-col gap-8 mt-6 mr-auto max-w-full">
            {options &&
              options.map((opt, ind) => (
                <div className="flex flex-col gap-2 " key={ind}>
                  <div className="h-text mr-auto ">{opt.title} </div>
                  {opt.title === "Color" ? (
                    <div className="flex gap-4 cursor-pointer w-full overflow-auto mt-2 scrollDiv">
                      {opt.values.map((op, i) => (
                        <div
                          key={i}
                          onClick={() => handleChange(op, opt.title)}
                          className="flex flex-col items-center gap-1 p-0.5"
                        >
                          <div
                            className={`${
                              op === actColor &&
                              "border-2 border-blue-500 rounded-full hover:scale-110"
                            } p-1`}
                          >
                            <div
                              onClick={() => {
                                handleChange(op, "hex");
                              }}
                              style={{ backgroundColor: `${op.toLowerCase()}` }}
                              className={`h-[30px] w-[30px] hover:scale-110 border-[1.2px] 
                              border-[var(--black-color)] rounded-full`}
                            ></div>
                          </div>
                          {op === actColor && (
                            <div className="text-sm md:text-base text-[var(--black-color)] whitespace-nowrap">
                              {colName === "" ? op : colName}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex gap-4 w-full p-1 overflow-auto scrollDiv">
                      {opt.values.map((op, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            handleChange(op, opt.title);
                          }}
                          className={`${
                            op === actSize || op === actPack
                              ? "bg-[var(--secondary-color)] text-white"
                              : "bg-white text-black"
                          }  p-text text-sm md:text-base w-fit h-full whitespace-nowrap text-center
                    px-3 cursor-pointer py-1 rounded-full hover:bg-[var(--secondary-color)] hover:text-white hover:scale-105`}
                        >
                          {op}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>

          {prod.stock !== 0 ? (
            <div className="w-full mt-8">
              {prod.stock < 3 && (
                <div className="p__opensans ml-1 text-[red] animate-bounce">
                  Hurry only {prod.stock} left !!!
                </div>
              )}
              <div className="flex gap-4 w-[100%] md:w-[90%] mr-auto">
                {goCart ? (
                  <button
                    onClick={() => {
                      navigate("/cart");
                    }}
                    className="app__flex gap-1 bg-[var(--secondary-color)] text-white px-3 
                  py-1 rounded-lg mt-1 hover:bg-blue-500 hover:scale-105 transition-all duration-200  whitespace-nowrap text-lg md:text-xl w-[50%]"
                  >
                    Go to Cart
                    <FiShoppingCart />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      cartAdd();
                    }}
                    className="app__flex gap-1 bg-[var(--secondary-color)] text-white px-3 
                  py-1 rounded-lg mt-1 hover:bg-blue-500 hover:scale-105  whitespace-nowrap text-lg md:text-xl w-[50%]"
                  >
                    Add to Cart
                    <AiOutlinePlus />
                  </button>
                )}

                <button
                  className="app__flex gap-1 bg-yellow-300 text-gray-700 font-medium px-3 
                  py-1 rounded-lg mt-1 hover:bg-yellow-500 hover:scale-105 w-[50%]"
                >
                  <a href={prod.whatsappLink} target="_blank" rel="noreferrer">
                    Buy Now
                  </a>{" "}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-4 mt-8 w-[100%] md:w-[90%] mr-auto">
              <button
                onClick={() => {
                  toast.error("Out of Stock");
                }}
                className="app__flex gap-1 bg-[var(--gray-color)] text-white px-3 
                  py-1 rounded-lg mt-1 hover:bg-gray-700 hover:scale-105  whitespace-nowrap text-lg md:text-xl w-[50%] mx-0 md:mx-auto"
              >
                Out of Stock <BsCartX />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="my-10 app__flex flex-col items-start md:items-center">
        <div
          onClick={() => {
            setShowDesc(!showDesc);
          }}
          className="h-text mb-1 app__flex gap-1 cursor-pointer"
        >
          Description
          {showDesc ? <AiOutlineUp /> : <AiOutlineDown />}
        </div>
        {showDesc && (
          <div className="p-text text-sm md:text-lg">
            <PortableText value={prod.description} components={components} />
          </div>
        )}
      </div>

      <div className="flex flex-col w-full gap-4 mt-0 md:mt-6">
        <div
          onClick={() => {
            setShowAb(!showAb);
          }}
          className="h-text mr-auto md:mr-0 app__flex gap-1 cursor-pointer"
        >
          About Product {showAb ? <AiOutlineUp /> : <AiOutlineDown />}
        </div>
        <div
          className={`p-text text-sm md:text-lg ${showAb ? "flex" : "hidden"}`}
        >
          {prod.shortDescription}
        </div>
      </div>

      {prod.return && (
        <div className="flex flex-col w-full gap-4 mt-10">
          <div className="h-text mr-auto md:mr-0 app__flex gap-2 cursor-pointer">
            Hassle Free Return/Exchange
          </div>
          <div className="p-text md:text-center text-sm md:text-lg">
            {prod.return} For complete informatiom, refer{" "}
            <Link to="/return&refund" className="text-blue-500 hover:underline">
              return/refund policy
            </Link>
          </div>
        </div>
      )}

      {prod.warranty && (
        <div className="flex flex-col w-full gap-4 mt-10">
          <div className="h-text mr-auto md:mr-0 app__flex gap-2 cursor-pointer">
            Warranty
          </div>
          <div className="p-text md:text-center text-sm md:text-lg">
            {prod.warranty}
          </div>
        </div>
      )}

      <div className="flex gap-8 mt-8 overflow-auto scrollDiv">
        {tags.map((t, index) => (
          <div className="text-blue-500" key={index}>
            #{t}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Individual;
