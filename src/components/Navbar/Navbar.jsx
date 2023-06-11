import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../client";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";

import "./Navbar.scss";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBgMode } from "../../redux/slices/bgMode";
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { removeUser } from "../../redux/slices/user";

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
  const { user, logIn } = useSelector((state) => state.user);

  function handleLogout() {
    /*global google */
    google.accounts.id.disableAutoSelect();
    dispatch(removeUser());
  }

  useEffect(() => {
    // console.log(user[0].imageUrl);
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

        <div className="flex items-center justify-center">
          <div className="app__navbar-mode">
            <div className="app__flex gap-4 md:gap-6 mb-1 -mr-2 md:mr-0">
              <NavLink to="/search">
                <div className="relative">
                  <AiOutlineSearch className="text-[var(--black-color)] text-2xl md:text-3xl" />
                </div>
              </NavLink>
              <NavLink to="/wishlist">
                <div className="relative">
                  <AiOutlineHeart className="text-[var(--black-color)] text-2xl md:text-3xl" />
                </div>
              </NavLink>
              {logIn ? (
                <div className="w-8 dropdown mt-2">
                  <button className="dropbtn">
                    <img
                      className="object-cover rounded-full"
                      src={user[0].imageUrl}
                      alt="profile"
                    />
                  </button>
                  <div className="dropdown-content text-sm whitespace-nowrap rounded-lg">
                    <Link to="/account" className="rounded-t-lg">My Account</Link>
                    <button onClick={handleLogout} className="text-[var(--black-color)] hover:text-white pl-3 pb-2 w-full text-left hover:bg-[var(--secondary-color)] rounded-b-lg">Log Out</button>
                  </div>
                </div>
              ) : (
                <NavLink to="/auth">
                  <div className="relative">
                    <CgProfile className="text-[var(--black-color)] text-2xl md:text-3xl" />
                  </div>
                </NavLink>
              )}
              <div>
                {light ? (
                  <MdDarkMode
                    fontSize={"1.5rem"}
                    className="hover:scale-105 mode-icon text-[1.7rem] md:text-3xl leading-none text-black"
                    onClick={() => dispatch(setBgMode())}
                  />
                ) : (
                  <MdOutlineLightMode
                    className="hover:scale-105 mode-icon text-2xl md:text-3xl text-white"
                    onClick={() => dispatch(setBgMode())}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="app__navbar-menu">
            <HiMenuAlt4
              style={{ fontSize: "23px", color: "white" }}
              onClick={() => setToggle(true)}
            />

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
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
