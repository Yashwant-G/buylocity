import React, { useContext } from "react";
import Helmet from "react-helmet";
import Navbar from "../../components/Navbar/Navbar";
import { ModeContext } from "../../context/context";

const Terms = () => {
  const { light } = useContext(ModeContext);

  return (
    <>
      <Helmet>
        <title>Buylocity- Terms & Conditions</title>
        <meta
          name="description"
          content="Discover the comprehensive Terms and Conditions of Buylocity. Gain insights into our policies, rights, and obligations for a transparent and fair partnership. Stay informed and make informed decisions with our detailed terms."
        />
      </Helmet>

      <div
        className={`app ${
          light ? "background-light" : "background-dark"
        } w-full`}
      >
        <Navbar home={false} />
        <div className="pt-28">
          <p className="head-text">Terms & Conditions</p>
        </div>
        <div className="p-12 space-y-8 text-[var(--black-color)]">
          <div>
            The Website Owner, including subsidiaries and affiliates (“Website”
            or “Website Owner” or “we” or “us” or “our”) provides the
            information contained on the website or any of the pages comprising
            the website (“website”) to visitors (“visitors”) (cumulatively
            referred to as “you” or “your” hereinafter) subject to the terms and
            conditions set out in these website terms and conditions, the
            privacy policy and any other relevant terms and conditions, policies
            and notices which may be applicable to a specific section or module
            of the website.
          </div>
          <div>
            Welcome to our website. If you continue to browse and use this
            website you are agreeing to comply with and be bound by the
            following terms and conditions of use, which together with our
            privacy policy govern BuyLocity''s relationship with you in relation
            to this website.
          </div>
          <div>
            The term 'BuyLocity' or 'us' or 'we' refers to the owner of the
            website whose registered/operational office is Mohan Garden New Delhi West Delhi DELHI 110059. The
            term 'you' refers to the user or viewer of our website.
          </div>
          <div className="font-semibold">
            The use of this website is subject to the following terms of use:
          </div>
          <ul className="ml-[2%] space-y-2">
            <li>
              1. The content of the pages of this website is for your general
              information and use only. It is subject to change without notice.
            </li>
            <li>
              2. Neither we nor any third parties provide any warranty or guarantee
              as to the accuracy, timeliness, performance, completeness or
              suitability of the information and materials found or offered on
              this website for any particular purpose. You acknowledge that such
              information and materials may contain inaccuracies or errors and
              we expressly exclude liability for any such inaccuracies or errors
              to the fullest extent permitted by law.
            </li>
            <li>
              3. Your use of any information or materials on this website is
              entirely at your own risk, for which we shall not be liable. It
              shall be your own responsibility to ensure that any products,
              services or information available through this website meet your
              specific requirements.
            </li>
            <li>
              4. This website contains material which is owned by or licensed to
              us. This material includes, but is not limited to, the design,
              layout, look, appearance and graphics. Reproduction is prohibited
              other than in accordance with the copyright notice, which forms
              part of these terms and conditions.
            </li>
            <li>
              5. All trademarks reproduced in this website which are not the
              property of, or licensed to, the operator are acknowledged on the
              website.
            </li>
            <li>
              6. Unauthorized use of this website may give rise to a claim for
              damages and/or be a criminal offense.
            </li>
            <li>
              7. From time to time this website may also include links to other
              websites. These links are provided for your convenience to provide
              further information.
            </li>
            <li>
              8. You may not create a link to this website from another website or
              document without BuyLocity's prior written consent.
            </li>
            <li>
              9. Your use of this website and any dispute arising out of such use
              of the website is subject to the laws of India or other regulatory
              authority.
            </li>
          </ul>
          <div>
            We as a merchant shall be under no liability whatsoever in respect
            of any loss or damage arising directly or indirectly out of the
            decline of authorization for any Transaction, on Account of the
            Cardholder having exceeded the preset limit mutually agreed by us
            with our acquiring bank from time to time
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
