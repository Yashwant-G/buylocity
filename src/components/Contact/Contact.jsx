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
          <p className="p__opensans hover:underline hover:text-blue-400"><a href="tel:+919899655710">+91 9899655710</a> </p>
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
            <a href="https://instagram.com/buylocity?igshid=YmMyMTA2M2Y=" target="_blank" rel="noreferrer"> <FiInstagram   className="hover:scale-110" style={{color:'var(--black-color)'}} /> </a>
            <a href="https://facebook.com/buylocity" target="_blank" rel="noreferrer"> <FiFacebook className="hover:scale-110" style={{color:'var(--black-color)'}} /> </a>
            <a href="https://twitter.com/buylocity?t=j7V4L9RSJZLaVjThs1e8YA&s=09" target="_blank" rel="noreferrer"> <FiTwitter className="hover:scale-110"  style={{color:'var(--black-color)'}}/> </a>
            <a href="https://wa.me/c/918383004856" target="_blank" rel="noreferrer"> <SiWhatsapp className="hover:scale-110" style={{color:'var(--black-color)'}}/> </a>
            <a href="https://www.linkedin.com/in/buylocity-undefined-aa9975274" target="_blank" rel="noreferrer"> <FiLinkedin className="hover:scale-110" style={{color:'var(--black-color)'}}/> </a>
          </div>
        </div>

        <div className="app__footer-links_work">
          <h1 className="app__footer-headtext">Working Hours</h1>
          <p className="p__opensans">Monday-Sunday:</p>
          <p className="p__opensans capitalize">10:00 aM - 9:00 pM</p>
          <p className="p__opensans">Saturday-Sunday:</p>
          <p className="p__opensans capitalize">10:00 aM - 10:00 pM</p>
        </div>
      </div>

      <div className="footer__copyright">
        <p className="p__opensans">2023 Buylocity. All Rights reserved.</p>
      </div>
    </div>
  );
};

export default MotionWrap(Contact,"app__contact");

