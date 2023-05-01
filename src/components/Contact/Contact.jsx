import React from "react";
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiLinkedin } from 'react-icons/fi';
import {SiWhatsapp} from 'react-icons/si';
import MotionWrap from "../../wrapper/MotionWrap";
import './Contact.css'


const Contact = () => {
  return (
    <div className="app__footer section__padding" id="contact">
      <div className="app__footer-links">
        <div className="app__footer-links_contact">
          <h1 className="app__footer-headtext">Contact Us</h1>
          <p className="p__opensans">MD Danish</p>
          <p className="p__opensans hover:underline hover:text-blue-400"><a href="tel:+917428337091">+91 7428337091</a> </p>
          <br/>
          <p className="p__opensans">Nishant</p>
          <p className="p__opensans hover:underline hover:text-blue-400"><a href="tel:+918368947987">+91 8368947987</a></p>
        </div>

        <div className="app__footer-links_logo">
          <h2 className="head-text about_head">Buylocity</h2>
          <p className="p__opensans">
            &quot;The best way to find yourself is to lose yourself in the
            service of others.&quot;
          </p>
          <div className="app__footer-links_icons">
            <a href="mailto: contactus@buylocity.in"> <FiMail  className="hover:scale-110" style={{color:'var(--black-color)'}} /> </a>
            <a href="https://instagram.com/buylocity?igshid=YmMyMTA2M2Y="> <FiInstagram   className="hover:scale-110" style={{color:'var(--black-color)'}} /> </a>
            <a href="/"> <FiFacebook className="hover:scale-110" style={{color:'var(--black-color)'}} /> </a>
            <a href="/"> <FiTwitter className="hover:scale-110"  style={{color:'var(--black-color)'}}/> </a>
            <a href="https://wa.me/c/918383004856"> <SiWhatsapp className="hover:scale-110" style={{color:'var(--black-color)'}}/> </a>
            <a href="/"> <FiLinkedin className="hover:scale-110" style={{color:'var(--black-color)'}}/> </a>
          </div>
        </div>

        <div className="app__footer-links_work">
          <h1 className="app__footer-headtext">Working Hours</h1>
          <p className="p__opensans">Monday-Friday:</p>
          <p className="p__opensans">09:00 am - 9:00 pm</p>
          <p className="p__opensans">Saturday-Sunday:</p>
          <p className="p__opensans">07:00 am - 12:00 pm</p>
        </div>
      </div>

      <div className="footer__copyright">
        <p className="p__opensans">2023 Buylocity. All Rights reserved.</p>
      </div>
    </div>
  );
};

export default MotionWrap(Contact,"app__contact");

