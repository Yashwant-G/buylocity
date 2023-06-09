import React, {useEffect } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { MdAddCall } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loading";

const Found = ({ details,status }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const date = new Date(details._createdAt);

  const formatted = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const [formattedDate,formattedTime]=formatted.split(' at ');
  return (
    <div className="w-full min-h-[100vh] mb-20">
      <div className="pt-28 w-full h-full app__flex flex-col gap-12 lg:gap-8">
        <div className="head-text text-2xl lg:text-3xl">
          Order id: <span>{details.orderId}</span>
        </div>
        <div className="flex flex-col h-text mr-auto ml-8 text-left text-sm lg:text-xl">
          <div>Order placed at:</div>
          <span className="mt-2">{formattedDate}</span>
          <span>{formattedTime}</span>
        </div>
        <div className="h-text text-xl lg:text-2xl mt-10">
          <div>Status</div>
        </div>
        {status.orderCancelled ? (
          <div className="app__flex flex-col gap-8 mt-8">
            <div className="app__flex gap-2">
              <div className="bg-[var(--white-color)] p-3 rounded-full">
                <FaTimes className="text-red-500 text-xl" />
              </div>
              <div className="p-text text-lg">Order cancelled</div>
            </div>
            <div className="h-text text-lg mt-8">
              Sorry, your order is cancelled due to :
            </div>
            <div className="h-text mb-8">
              <span className="mr-2">{status.reason}</span>
            </div>
            <div className="p-text text-lg">Contact us for more details</div>
          </div>
        ) : (
          <div className="app__flex flex-col items-start gap-8">
            <div className="app__flex gap-2 relative">
              <div className="bg-[var(--white-color)] p-3 rounded-full">
                <FaCheck className="text-green-500 text-xl" />
              </div>
              <div className="p-text text-lg">Order Placed</div>
            </div>

            <div className="app__flex gap-2 relative">
              <div
                className={`${
                  status.orderRecieved ? "bg-green-500" : "bg-gray-400"
                } h-[2rem] absolute top-[-2rem] left-5 w-1`}
              ></div>
              <div className="bg-[var(--white-color)] p-3 rounded-full">
                <FaCheck
                  className={`text-green-500 text-xl ${
                    status.orderRecieved ? "opacity-1" : "opacity-0"
                  }`}
                />
              </div>
              <div className="p-text text-lg">Order Recieved</div>
            </div>

            <div className="app__flex gap-2 relative">
              <div
                className={`${
                  status.orderPacked ? "bg-green-500" : "bg-gray-400"
                } h-[2rem] absolute top-[-2rem] left-5 w-1`}
              ></div>
              <div className="bg-[var(--white-color)] p-3 rounded-full">
                <FaCheck
                  className={`text-green-500 text-xl ${
                    status.orderPacked ? "opacity-1" : "opacity-0"
                  }`}
                />
              </div>
              <div className="p-text text-lg">Order Packed</div>
            </div>

            <div className="app__flex gap-2 relative">
              <div
                className={`${
                  status.outForDelivery ? "bg-green-500" : "bg-gray-400"
                } h-[2rem] absolute top-[-2rem] left-5 w-1`}
              ></div>
              <div className="bg-[var(--white-color)] p-3 rounded-full">
                <FaCheck
                  className={`text-green-500 text-xl ${
                    status.outForDelivery ? "opacity-1" : "opacity-0"
                  }`}
                />
              </div>

              <div className="p-text text-lg">
                <p>Out For Delivery </p>
              </div>
              <div className="">
                {!status.delivered && status.outForDelivery && (
                  <a href={`tel:+91${status.phoneNumber}`}>
                    <MdAddCall className="text-lg text-blue-700" />
                  </a>
                )}
              </div>
            </div>

            <div className="app__flex gap-2 relative">
              <div
                className={`${
                  status.delivered ? "bg-green-500" : "bg-gray-400"
                } h-[2rem] absolute top-[-2rem] left-5 w-1`}
              ></div>
              <div className="bg-[var(--white-color)] p-3 rounded-full">
                <FaCheck
                  className={`text-green-500 text-xl ${
                    status.delivered ? "opacity-1" : "opacity-0"
                  }`}
                />
              </div>
              <div className="p-text text-lg">Order delivered</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Found;
