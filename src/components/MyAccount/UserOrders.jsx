import React from "react";
import { FcCheckmark } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

const UserOrders = ({ orders }) => {
  // console.log("all",orders[0].allproducts);
  const navigate = useNavigate();
  const latestStatus = (ord) => {
    console.log(ord);
    if (ord.status.orderCancelled) {
      return <div className="flex flex-row gap-1 items-center text-xs text-red-500 mt-1">
        Cancelled
        <RxCross2 />
      </div>;
    }
    if(ord.status.delivered){
      return <div className="flex flex-row gap-1 items-center text-xs text-blue-500 mt-1">
        Delivered
        <FcCheckmark />
      </div>;
    }
    if(ord.status.outForDelivery){
      return <div className="flex flex-row gap-1 items-center text-xs text-blue-500 mt-1">
        Out For Delivery
        <FcCheckmark />
      </div>;
    }
    if(ord.status.orderPacked){
      return <div className="flex flex-row gap-1 items-center text-xs text-blue-500 mt-1">
        Packed
        <FcCheckmark />
      </div>;
    }
    if(ord.status.orderRecieved){
      return <div className="flex flex-row gap-1 items-center text-xs text-green-500 mt-1">
        Recieved
        <FcCheckmark />
      </div>;
    }
  };
  return (
    <div className="w-full h-full p-text text-sm flex flex-col gap-4 py-6">
      {orders.map((ord, ind) => (
        <div
          key={ind}
          className="border rounded-lg border-[var(--black-color)] px-2 py-4"
        >
          {/* details div */}
          <div className="flex justify-between items-start">
            <div className="text-sm">
              <div className="font-semibold">#{ord.orderId}</div>
              <div>Rs.{ord.total}</div>
            </div>
            <div className="flex gap-1 items-center">{latestStatus(ord)}</div>
          </div>

          {/* horizontal division */}
          <div className="w-full border border-dotted border-[var(--black-color)] my-3"></div>

          {/* product Details */}
          <div className="font-semibold">Items</div>
          <div className="text-xs">
            {ord.allproducts.map((prod, i) => (
              <Link
                key={i}
                to={`/products/${prod.product._id}`}
                className="hover:underline flex flex-col"
              >
                {prod.product.name} ({prod.quantity})
              </Link>
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-start md:items-center mt-2">
            <div className="text-xs">
              Placed: {new Date(ord._createdAt).toLocaleString()}
            </div>
            <div
              onClick={() => navigate(`/order/${ord.orderId}`)}
              className="text-[var(--secondary-color)] hover:underline"
            >
              View Details
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
