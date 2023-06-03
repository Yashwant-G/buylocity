import React from "react";
import Helmet from "react-helmet";
import Navbar from "../../components/Navbar/Navbar";

const Return = () => {
  return (
    <>
      <Helmet>
        <title>Buylocity- Return & Refund</title>
        <meta
          name="description"
          content="Learn about our Return, Refund, and
        Cancellation Policy at Buylocity. Understand the procedures and
        terms for cancelling orders, returning products, and initiating refunds.
        Stay informed and make informed decisions with our comprehensive
        policy."
        />
      </Helmet>

      <div>
        <Navbar />
        <div className="container mx-auto py-8 pt-28 p-12 text-[var(--black-color)]">
          <h1 className="head-text font-bold mb-4">
            Returns and Refunds Policy
          </h1>
          <p className="mb-4 mt-8">
            <strong>1. Who is BUYLOCITY?</strong>
            <br />
            Buylocity Pvt. Ltd., a company incorporated under the laws of India,
            is a retail and logistics company offering various online lifestyle,
            fashion, and electronics solutions through its website
            www.Buylocity.in. Users can purchase cosmetics, electronics, toys,
            lifestyle, and fashion merchandise ("Products") from the Platforms.
          </p>
          <p className="mb-4">
            <strong>
              2. What is this Cancellation, Return and Refund Policy?
            </strong>
            <br />
            This Cancellation, Return and Refund Policy outlines BUYLOCITY's
            procedures and policies for accepting product cancellations and
            returns. Users must read and understand this policy before accepting
            the Terms of Use. By initiating a request to purchase Product(s) on
            the Platforms, Users agree to be bound by the terms herein.
          </p>
          <p className="mb-4 space-y-2">
            <strong>3. Terms of Cancellation</strong>
            <br />
            <strong>3.1. Cancellation before dispatch.</strong>
            <br />
            3.1.1. Users can fully or partially cancel orders before they are
            dispatched from BUYLOCITY.
            <br />
            3.1.2. After successfully placing an order and handing over the
            Product(s) to its Logistic Partner, Users will receive a unique
            order identity number to track the delivery status.
            <br />
            3.1.3. Users can cancel the purchase by sending a WhatsApp text
            message referencing the unique order identity number to BUYLOCITY.
            <br />
            3.1.4. Refunds for cancellations before dispatch will be initiated
            by BUYLOCITY within 2 hours of receiving the request from the User.
            <br />
            3.1.5. Cash on delivery refunds will be credited to the User's bank
            account or UPI within a reasonable time, subject to applicable bank
            charges.
            <br />
            3.1.6. Refunds for prepaid payments will be made to the original
            mode of payment, subject to applicable bank charges.
            <br />
            <strong>3.2. Cancellation after dispatch.</strong>
            <br />
            We also accept post-dispatch cancellation of orders.
          </p>
          <p className="mb-4">
            <strong>4. Terms of Return and Refund</strong>
            <br />
            <strong>4.1. Category-wise details</strong>
            <br />
            Please read all sections carefully to understand the conditions and
            cases under which returns will be accepted. Refer to the Product
            display page for specific return information.
          </p>

          <h1 className="h-text font-bold mb-4">
            Product Categories Return Period
          </h1>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Product Category</th>
                <th className="px-4 py-2">Return Period</th>
                <th className="px-4 py-2">Conditions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[var(--black-color)] px-4 py-2">
                  Fashion and Lifestyle Products
                </td>
                <td className="border border-[var(--black-color)] px-4 py-2">
                  2 Hours from the date and time of delivery
                </td>
                <td className="border border-[var(--black-color)] px-4 py-2">
                  Unused product with intact price tags
                </td>
              </tr>
              <tr>
                <td className="border border-[var(--black-color)] px-4 py-2">
                  Electronic Products
                </td>
                <td className="border border-[var(--black-color)] px-4 py-2">
                  2 Hours from the date and time of delivery
                </td>
                <td className="border border-[var(--black-color)] px-4 py-2">
                  Visible damage or key product-related defects
                </td>
              </tr>
              {/* Add more rows for each product category */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Return;
