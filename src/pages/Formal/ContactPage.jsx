import React from "react";
import Helmet from "react-helmet";
import Navbar from "../../components/Navbar/Navbar";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Buylocity- Contact Us</title>
        <meta
          name="description"
          content="Contact Us - Get in touch with our dedicated customer support team for any inquiries, feedback, or assistance you need. Call our hotline, send us an email, or chat with us live. We're here to help!"
        />
      </Helmet>

      <div>
        <Navbar home={false} />
        <div className="pt-40">
          <p className="head-text">Contact us</p>
        </div>
        <div className="ml-[15%] mt-12 space-y-2">
          <p className="font-bold text-xl">Head of Operations:</p>
          <p className="text-lg">MD Danish</p>
          <p className="text-blue-800 hover:underline">
            <a href="tel:+919899655710">+91 9899655710</a>
          </p>
          <p className="text-lg">Nishant</p>
          <p className="text-blue-800 hover:underline">
            <a href="tel:+918368947987">+91 8368947987</a>
          </p>
        </div>
        <div className="ml-[15%] mt-8 space-y-2">
          <p className="font-bold text-xl">Email</p>
          <p className="text-blue-800 hover:underline">
            <a href="mailto: customercare@buylocity.in">
              customercare@buylocity.in
            </a>
          </p>
        </div>
        <div className="ml-[15%] mt-8 space-y-2">
          <p className="font-bold text-xl">Office Address:</p>
          <p>Mohan Garden, Dwarka, New Delhi-110059</p>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
