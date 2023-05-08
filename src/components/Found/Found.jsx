import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { MdAddCall } from "react-icons/md";

const Found = ({ details }) => {
  const date = new Date(details.orderPlaced);

  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return (
    <div className="w-full h-full mb-20">
      <div className="pt-28 w-full h-full app__flex flex-col gap-4">
        <div className="head-text">
          Order id: <span>{details.orderId}</span>
        </div>
        <div className="h-text mr-auto ml-8 text-left">
          <div>Order placed at:</div>
          <span>{formattedDate}</span>
        </div>
        <div className="h-text text-2xl">
          <div>Status</div>
        </div>
        {details.orderCancelled ? (
          <div className="app__flex flex-col gap-8 mt-8">
            <div className="app__flex gap-2">
              <div className="bg-[var(--white-color)] p-3 rounded-full">
                <FaTimes className="text-red-500 text-xl" />
              </div>
              <div className="p-text text-lg">Order cancelled</div>
            </div>
            <div className="h-text ">
              Sorry, your order is cancelled due to :
            </div>
            <div className="h-text mb-8 mr-auto">
              <span className="mr-2">{details.reason},</span>
              Contact us for more details
            </div>
          </div>
        ) : (
          <div className="app__flex flex-col items-start gap-8">
            <div className="app__flex gap-2">
              <div className="bg-[var(--white-color)] p-3 rounded-full">
                <FaCheck className="text-green-500 text-xl" />
              </div>
              <div className="p-text text-lg">Order Placed</div>
            </div>
            {details.orderRecieved && (
              <div className="app__flex gap-2">
                <div className="bg-[var(--white-color)] p-3 rounded-full">
                  <FaCheck className="text-green-500 text-xl" />
                </div>
                <div className="p-text text-lg">Order Recieved</div>
              </div>
            )}
            {details.orderPacked && (
              <div className="app__flex gap-2">
                <div className="bg-[var(--white-color)] p-3 rounded-full">
                  <FaCheck className="text-green-500 text-xl" />
                </div>
                <div className="p-text text-lg">Order Packed</div>
              </div>
            )}
            {details.outForDelivery && (
              <div className="app__flex gap-2">
                <div className="bg-[var(--white-color)] p-3 rounded-full">
                  <FaCheck className="text-green-500 text-xl" />
                </div>
                <div className="p-text text-lg">
                  <p>Out For Delivery </p>
                </div>
                <div className="">
                  <a href={`tel:+91${details.phoneNumber}`}>
                    <MdAddCall className="text-lg text-blue-700" />
                  </a>
                </div>
              </div>
            )}
            {details.delivered && (
              <div className="app__flex gap-2">
                <div className="bg-[var(--white-color)] p-3 rounded-full">
                  <FaCheck className="text-green-500 text-xl" />
                </div>
                <div className="p-text text-lg">Order delivered</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Found;
