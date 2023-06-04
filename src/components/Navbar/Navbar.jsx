import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../client";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

import "./Navbar.scss";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBgMode } from "../../redux/slices/bgMode";
import { AiFillHeart } from "react-icons/ai";

const Navbar = ({ home }) => {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState(" ");
  const [open, setOpen] = useState(true);
  const [logo, setLogo] = useState({
    img: null,
    height: "",
    width: "",
  });
  const { light } = useSelector((state) => state.bgMode);
  const dispatch = useDispatch();
  const [navList, setNavlist] = useState([]);
  const { products } = useSelector((state) => state.cart);

  useEffect(() => {
    const query = '*[_type == "status"][0]';

    client.fetch(query).then((data) => {
      setText(data.statustext);
      setOpen(data.stat);
    });
    client
      .fetch('*[_type == "navbar"] | order(_createdAt asc)')
      .then((data) => {
        setNavlist(data);
      })
      .catch((error) => console.error(error));

    client
      .fetch('*[_type == "logo"][0]')
      .then((image) => {
        setLogo({
          img: urlFor(image.imgUrl),
          height: image.height,
          width: image.width,
        });
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div className="h-7 w-full bg-[var(--secondary-color)] fixed z-[2] app__flex">
        <div className="app__flex gap-2 salesDiv">
          <p className="h-text text-xs lg:text-sm text-white whitespace-nowrap">
            {" "}
            {text}{" "}
          </p>
          {open === true && (
            <button className="h-text text-sm text-[#DDB34B] cursor-pointer hover:underline whitespace-nowrap">
              <a href="https://wa.me/c/918383004856">Order now 👇</a>
            </button>
          )}
        </div>
      </div>
      <nav className="app__navbar mt-7">
        <div className="app__navbar-logo mr-3 lg:mr-0">
          <NavLink to="/">
            <img
              src={logo.img}
              alt="logo"
              height={logo.height}
              width={logo.width}
              loading="lazy"
            />
          </NavLink>
        </div>

        {home ? (
          <ul className="app__navbar-links">
            {navList.map((item, index) => (
              <li className="app__flex p-text" key={index}>
                <div />
                {item.link.includes("/") ? (
                  <Link to={item.link}>{item.title}</Link>
                ) : (
                  <a href={`${item.link}`}>{item.title}</a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="app__navbar-links">
            <li className="app__flex p-text">
              <div />
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>
        )}

        <div className="app__navbar-mode">
          <div className="app__flex gap-4">
            <div>
              {light ? (
                <MdDarkMode
                  className="hover:scale-105 mode-icon"
                  style={{ fontSize: "30px" }}
                  onClick={() => dispatch(setBgMode())}
                />
              ) : (
                <MdOutlineLightMode
                  className="hover:scale-105 mode-icon"
                  style={{ fontSize: "30px", color: "white" }}
                  onClick={() => dispatch(setBgMode())}
                />
              )}
            </div>
            <NavLink to="/cart">
              <div className="relative">
                <div
                  className="absolute top-[-40%] right-[-10%] z-[5] h-text text-[var(--black-color)] bg-[var(--white-color)] 
              px-[0.30rem] rounded-full text-sm animate-bounce "
                >
                  {products.length}
                </div>
                <FaShoppingCart
                  className="text-[var(--black-color)]"
                  style={{ fontSize: "26px" }}
                />
              </div>
            </NavLink>
            <NavLink to="/wishlist">
              <div className="relative">
                <AiFillHeart
                  className="text-[var(--black-color)]"
                  style={{ fontSize: "26px" }}
                />
              </div>
            </NavLink>
          </div>
        </div>

        <div className="app__navbar-menu">
          <HiMenuAlt4 onClick={() => setToggle(true)} />

          {toggle && (
            <motion.div
              whileInView={{ x: [100, 0] }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            >
              <HiX onClick={() => setToggle(false)} />
              {home ? (
                <ul className="app__navbar-links">
                  {navList.map((item, index) => (
                    <li className="app__flex p-text" key={index}>
                      <a href={`${item.link}`}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="app__navbar-links">
                  <li className="app__flex p-text">
                    <NavLink to="/">Home</NavLink>
                  </li>
                </ul>
              )}
            </motion.div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
