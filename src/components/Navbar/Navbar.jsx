import React, { useEffect, useState } from 'react';
import { client,urlFor } from '../../client';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import {MdDarkMode,MdOutlineLightMode} from 'react-icons/md'
import { motion } from 'framer-motion';

// import { images } from '../../constants';
import './Navbar.scss';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [logo,setLogo]=useState({
    img: null,
    height: "",
    width: "",
  });
  const [light,setLight]=useState(true);
  const [navList,setNavlist]=useState([]);

  function handleMode(){
    if(light){
      setLight(false);
      document.documentElement.style.setProperty('--primary-color', '#1e1e1e');
      document.documentElement.style.setProperty('--secondary-color', '#6b75e0');
      document.documentElement.style.setProperty('--black-color', '#ffffff');
      document.documentElement.style.setProperty('--gray-color', '#a5b1c5');
      document.documentElement.style.setProperty('--white-color', '#030303');
    }else{
      setLight(true);
      document.documentElement.style.setProperty('--primary-color', '#edf2f8');
      document.documentElement.style.setProperty('--secondary-color', '#1d2687');
      document.documentElement.style.setProperty('--black-color', '#030303');
      document.documentElement.style.setProperty('--gray-color', '#6b7688');
      document.documentElement.style.setProperty('--white-color', '#ffffff');
      
    }
  }

  useEffect(()=>{
    client
        .fetch('*[_type == "navbar"] | order(_createdAt asc)')
        .then((data) => {
          setNavlist(data);
        })
        .catch((error) => console.error(error))

    client
        .fetch('*[_type == "logo"][0]')
        .then((image) => {
          setLogo({
            img: urlFor(image.imgUrl),
            height: image.height,
            width: image.width,
          });
        })
        .catch((error) => console.error(error))      
  },[])
 

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <a href='/'><img src={logo.img} alt="logo"  /></a>
      </div>
      <ul className="app__navbar-links">
        {navList.map((item,index) => (
          <li className="app__flex p-text" key={index}>
            <div />
            <a href={`${item.link}`}>{item.title}</a>
          </li>
        ))}
      </ul>
      <div className='app__navbar-mode'>
         {light ? 
            <MdDarkMode className='hover:scale-105' style={{fontSize: '35px'}} onClick={()=>handleMode()} /> 
            : 
            <MdOutlineLightMode className='hover:scale-105' style={{fontSize: '30px', color:'white'}} onClick={()=>handleMode()} />
         }   
      </div>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {navList.map((item) => (
                <li key={item}>
                  <a href={`${item.link}`} onClick={() => setToggle(false)}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;