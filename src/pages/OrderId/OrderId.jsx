import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { client, urlFor } from "../../client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";
import { Helmet } from "react-helmet";
import Contact from "../../components/Contact/Contact";
import { TbArrowUpRight } from "react-icons/tb";
import { BiCurrentLocation } from "react-icons/bi";

const OrderId = () => {
  const [details, setDetails] = useState([]);
  const { user, logIn } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.pathname.split("/").at(-1);

  async function fetch() {
    const query = `*[_type=="orders" && orderId == $orderId]{
		...,
		address->{...},
		allproducts[]{
			...,
			product->{
				...,
			},
		},
	}`;
    const params = { orderId: orderId.toString() };
    client.fetch(query, params).then((res) => {
      console.log(res);
      if (res[0].user._ref !== user[0]._id) {
        toast.error("Not your Order");
        navigate("/");
        return;
      }
      setDetails(res);
    });
  }
  useEffect(() => {
    if (!logIn) {
      navigate("/auth");
      return;
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);
  return (
    <div className="w-full min-h-screen">
      <Helmet>
        <title>Buylocity- Order Details</title>
        <meta
          name="description"
          content="Discover a wide selection of products and categories at our online store. Explore our extensive range of high-quality 
	  items to meet all your needs. From electronics to home decor, fashion to kitchenware, we offer a diverse collection to cater to 
	  every taste and preference. Whether you're looking for the latest gadgets, stylish clothing, or unique gifts, our website has 
	  you covered. Browse through our user-friendly interface, conveniently organized into various categories, making it easy to find 
	  exactly what you're searching for. Shop with confidence and enjoy a seamless shopping experience with our trusted online store"
        />
      </Helmet>
      <Navbar home={false} />
      <div className="pt-32 pb-16 w-full md:w-11/12 mx-auto px-10 h-full">
        {details.map((ord, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="flex md:flex-row flex-col gap-2 justify-between items-center">
              <div className="head-text whitespace-nowrap">Order Id: #{ord.orderId}</div>
              <div
                className="bg-[var(--secondary-color)] text-white px-2 py-1 rounded-lg"
                onClick={() => navigate(`/track/${ord.orderId}`)}
              >
                <button className="flex gap-1 items-center">
                  Track here <BiCurrentLocation />
                </button>
              </div>
            </div>

            <div className="p-text text-sm flex items-center gap-1">Placed at: <span className="font-semibold">{new Date(ord._createdAt).toLocaleString()}</span></div>
            <div className="w-full border border-[var(--black-color)]"></div>

            <div className="flex flex-col gap-2">
              <div className="h-text">Products</div>
              {ord.allproducts.map((prod, i) => (
                <div key={i} className="flex flex-col mb-2 md:flex-row justify-between items-center text-[var(--black-color)]">
                  <div className="w-full h-full flex gap-2 items-center">
                    <div className="w-16">
                      <img
                        className="object-cover rounded-lg"
                        src={urlFor(prod.product.productImages[0])}
                        alt="alt"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <div>{prod.product.name}</div>
                      <div className="flex items-center">
                        <div style={{backgroundColor:prod.color}} className="mr-2 w-5 h-5 rounded-full">
                        </div>
                        <div className="px-2 border-l border-[var(--black-color)]">
                          {prod.size}
                        </div>
                        <div className="px-2 border-l border-[var(--black-color)]">
                          {prod.pack}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex justify-center md:flex-col gap-1">
                    <div className="md:ml-auto">Rs.{prod.product.price}</div>
                    <div className="flex gap-1 items-center md:ml-auto">Qty: {prod.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full border border-[var(--black-color)]"></div>
            <div className="flex flex-col gap-2 md:flex-row text-[var(--black-color)]">
              <div className="w-1/2 flex flex-col">
                <div className="h-text text-left">Payment</div>
                <div>Mode: {ord.payment.mode.toUpperCase()}</div>
                <div>
                  {ord.payment.mode === "online" &&
                    `Transaction Id: ${ord.payment.transactionId}`}
                </div>
                <div>
                  Status: {ord.payment.success ? "Completed" : "Pending"}
                </div>
              </div>
              <div className="w-1/2 flex flex-col gap-1">
                <div className="h-text text-left">Delivery</div>
                <div>{ord.address.name}</div>
                <div>{ord.address.number}</div>
                <div>
                  {ord.address.address}, {ord.address.pincode}
                </div>
                <div>{ord.address.landmark}</div>
              </div>
            </div>

            <div className="w-full border border-[var(--black-color)]"></div>
            <div className="flex flex-col gap-2 md:flex-row text-[var(--black-color)]">
              <div className="w-1/2 flex flex-col gap-2">
                <div className="h-text text-left">Need Help?</div>
                <div className="flex gap-1 items-start">
                  Return/Exchange <TbArrowUpRight />{" "}
                </div>
                <div className="flex gap-1 items-start">
                  Contact Us <TbArrowUpRight />{" "}
                </div>
              </div>
              <div className="w-1/2 flex flex-col">
                <div className="h-text text-left">Order Summary</div>
                <div className="flex justify-between items-center mt-2">
                  <div>Subtotal:</div>
                  <div className="font-[500]">Rs.{ord.total}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>Delivery:</div>
                  <div className="font-[500] text-green-600">Free</div>
                </div>
                <div className="w-full border border-dashed border-[var(--black-color)] my-4"></div>
                <div className="flex justify-between items-center">
                  <div>Total:</div>
                  <div className="font-[500]">Rs.{ord.total}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Contact />
    </div>
  );
};

export default OrderId;
