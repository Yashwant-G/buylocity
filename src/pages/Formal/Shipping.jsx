import React from "react";
import Helmet from "react-helmet";
import Navbar from "../../components/Navbar/Navbar";

const Shipping = () => {
  return (
    <>
      <Helmet>
        <title>Buylocity- Shipping Policy</title>
        <meta
          name="description"
          content="Learn about our Shipping Policy at Buylocity. Understand the procedures and
        terms for cancelling orders, returning products, and initiating refunds.
        Stay informed and make informed decisions with our comprehensive
        policy."
        />
      </Helmet>

      <div>
        <Navbar />
        <div className="container mx-auto py-8 pt-28 p-12 flex flex-col gap-8 text-[var(--black-color)]">
          <h1 className="head-text font-bold mb-2">Shipping Policy</h1>
          <div className="mt-0">
            At Buylocity, we understand the importance of timely delivery and
            exceptional customer service. Our shipping policy is designed to
            provide you with a seamless and efficient experience. Read on to
            learn more about our shipping procedures and timelines.
          </div>
          <ul className="flex flex-col gap-4">
            <div>
              <li className="text-left text-lg font-semibold">
                1. Order Processing:
              </li>
              <div>
                Upon receiving your order, our team will begin processing it
                immediately. We strive to process all orders within 1 hour of
                placement, ensuring a swift start to the shipping process.
              </div>
            </div>
            <div>
              <li className="text-left text-lg font-semibold">
                2. Delivery Timeframe:
              </li>
              <div>
                We take pride in our fast delivery service. We guarantee
                delivery within 2 hours from the time your order is confirmed.
                However, please note that certain factors such as location,
                weather conditions, and peak hours may occasionally affect
                delivery times. In such cases, the maximum delivery time will be
                24 hours.
              </div>
            </div>
            <div>
              <li className="text-left text-lg font-semibold">
                3. Tracking Orders:
              </li>
              <div>
                To keep you informed every step of the way, we provide real-time
                order tracking. Once your order is dispatched, you will receive
                a tracking number via email or SMS, allowing you to monitor its
                progress until it reaches your doorstep.
              </div>
            </div>
            <div>
              <li className="text-left text-lg font-semibold">
                4. Shipping Charges:
              </li>
              <div>
                We offer competitive shipping rates based on the weight and
                dimensions of your order. The shipping charges will be displayed
                during the checkout process, ensuring transparency and no
                surprises.
              </div>
            </div>
            <div>
              <li className="text-left text-lg font-semibold">
                5. Delivery Area:
              </li>
              <div>
                Currently, we provide delivery services within limited areas of
                Delhi NCR. If your location falls within this area, you can
                enjoy our swift and reliable shipping service.(Refer Homepage)
              </div>
            </div>
            <div>
              <li className="text-left text-lg font-semibold">
                6. Returns and Exchanges:
              </li>
              <div>
                For information on returns and exchanges, please refer to our
                dedicated Returns Policy page on our website.
              </div>
            </div>
          </ul>
          <div>
            At Buylocity, we prioritize customer satisfaction and strive to
            provide exceptional shipping services. We are committed to
            delivering your orders in a timely manner, ensuring your convenience
            and peace of mind. If you have any questions or concerns regarding
            our shipping policy, please feel free to contact our customer
            support team, who will be more than happy to assist you.
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
