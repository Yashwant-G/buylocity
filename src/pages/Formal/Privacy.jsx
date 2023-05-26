import React, { useContext } from "react";
import Helmet from "react-helmet";
import Navbar from "../../components/Navbar/Navbar";
import { ModeContext } from "../../context/context";

const Privacy = () => {
  const { light } = useContext(ModeContext);

  return (
    <>
      <Helmet>
        <title>Buylocity- Privacy & Policy</title>
        <meta
          name="description"
          content="Discover the comprehensive Terms and Conditions of [Company Name]. Gain insights into our policies, rights, and obligations for a transparent and fair partnership. Stay informed and make informed decisions with our detailed terms."
        />
      </Helmet>

      <div
        className={`app ${
          light ? "background-light" : "background-dark"
        } w-full`}
      >
        <Navbar home={false} />
        <div className="pt-28">
          <p className="head-text">Privacy & Policy</p>
        </div>
        <div className="p-12 space-y-8 text-[var(--black-color)]">
          <div>
            This privacy policy sets out how BuyLocity uses and protects any
            information that you give BuyLocity when you use this website.
          </div>
          <div>
            BuyLocity is committed to ensuring that your privacy is protected.
            Should we ask you to provide certain information by which you can be
            identified when using this website, and then you can be assured that
            it will only be used in accordance with this privacy statement.
          </div>
          <div>
            BuyLocity may change this policy from time to time by updating this
            page. You should check this page from time to time to ensure that
            you are happy with any changes.
          </div>
          <div className="font-semibold">
            We may collect the following information:
          </div>
          <ul className="ml-[2%] space-y-2">
            <li>1. Name and job title</li>
            <li>2. Contact information including email address</li>
            <li>
              3. Demographic information such as postcode, preferences and
              interests
            </li>
            <li>
              4. Other information relevant to customer surveys and/or offers
            </li>
          </ul>
          <div className="font-semibold">
            What we do with the information we gather
          </div>
          <div>
            We require this information to understand your needs and provide you
            with a better service, and in particular for the following reasons:
          </div>
          <ul className="ml-[2%] space-y-2">
            <li>1. Name and job title</li>
            <li>2. Contact information including email address</li>
            <li>
              3. Demographic information such as postcode, preferences and
              interests
            </li>
            <li>
              4. Other information relevant to customer surveys and/or offers
            </li>
          </ul>
          <div>
            We are committed to ensuring that your information is secure. In
            order to prevent unauthorised access or disclosure we have put in
            suitable measures.
          </div>
          <div className="font-semibold">How we use cookies</div>
          <div>
            A cookie is a small file which asks permission to be placed on your
            computer's hard drive. Once you agree, the file is added and the
            cookie helps analyses web traffic or lets you know when you visit a
            particular site. Cookies allow web applications to respond to you as
            an individual. The web application can tailor its operations to your
            needs, likes and dislikes by gathering and remembering information
            about your preferences.
          </div>
          <div>
            We use traffic log cookies to identify which pages are being used.
            This helps us analyses data about webpage traffic and improve our
            website in order to tailor it to customer needs. We only use this
            information for statistical analysis purposes and then the data is
            removed from the system.
          </div>
          <div>
            Overall, cookies help us provide you with a better website, by
            enabling us to monitor which pages you find useful and which you do
            not. A cookie in no way gives us access to your computer or any
            information about you, other than the data you choose to share with
            us.
          </div>
          <div>
            You can choose to accept or decline cookies. Most web browsers
            automatically accept cookies, but you can usually modify your
            browser setting to decline cookies if you prefer. This may prevent
            you from taking full advantage of the website.
          </div>
          <div className="font-semibold">
            Controlling your personal information
          </div>
          <div>
            You may choose to restrict the collection or use of your personal
            information in the following ways:
          </div>
          <ul className="ml-[2%] space-y-2">
            <li>
              1. whenever you are asked to fill in a form on the website, look for
              the box that you can click to indicate that you do not want the
              information to be used by anybody for direct marketing purposes
            </li>
            <li>
              2. if you have previously agreed to us using your personal
              information for direct marketing purposes, you may change your
              mind at any time by writing to or emailing us at
              customercare@buylocity.in
            </li>
          </ul>
          <div>
            We will not sell, distribute or lease your personal information to
            third parties unless we have your permission or are required by law
            to do so. We may use your personal information to send you
            promotional information about third parties which we think you may
            find interesting if you tell us that you wish this to happen.
          </div>
          <div>
            If you believe that any information we are holding on you is
            incorrect or incomplete, please write to or email us as soon as
            possible, at the above address. We will promptly correct any
            information found to be incorrect.
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
