import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { client, urlFor } from "../../client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";
import { Helmet } from "react-helmet";

const OrderId = () => {
  const [details, setDetails] = useState([]);
  const { user } = useSelector((state) => state.user);
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
        navigate("/home");
        return;
      }
      setDetails(res);
    });
  }
  useEffect(() => {
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
      <div className="pt-28 w-full h-full">
        {details.map((ord, index) => (
          <div key={index} className="flex flex-col gap-4 items-center justify-center">
            <div className="head-text">Order: #{ord.orderId}</div>
            <div>Placed at: {new Date(ord._createdAt).toLocaleString()}</div>
            <div onClick={() => navigate(`/track/${ord.orderId}`)}>
              <button>Track here</button>
            </div>
            <div>
              <div>Address</div>
              <div>{ord.address.name}</div>
              <div>{ord.address.number}</div>
              <div>
                {ord.address.address}, {ord.address.pincode}
              </div>
              <div>{ord.address.landmark && ord.address.landmark}</div>
            </div>

            <div className="flex flex-col gap-2"> 
              <div>Products</div>
              {ord.allproducts.map((prod, i) => (
                <div key={i} >
                  <div>{prod.product.name}</div>
                  <div>{prod.product.price}</div>
                  <img
                    className="w-7"
                    src={urlFor(prod.product.productImages[0])}
                    alt="alt"
                  />
				  <div>{prod.quantity}</div>
				  <div>{prod.color}</div>
				  <div>{prod.size}</div>
				  <div>{prod.pack}</div>
                </div>
              ))}
            </div>

            <div>Order Total: {ord.total}</div>

            <div>
              <div>Payment</div>
              <div>Mode: {ord.payment.mode}</div>
              <div>
                {ord.payment.mode === "online" &&
                  `Transaction Id: ${ord.payment.transactionId}`}
              </div>
              <div>Status: {ord.payment.success ? "Completed" : "Pending"}</div>
            </div>


            <div>Raise a return/exchange Request here</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderId;
