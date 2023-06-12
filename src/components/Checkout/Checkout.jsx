import React, { useState } from "react";
import CartTree from "../Cart/CartTree";
import { MdArrowBackIosNew } from "react-icons/md";
import "./Checkout.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/loading";
import { client } from "../../client";
import { useEffect } from "react";
import { setOrderAddress, setOrderPayment } from "../../redux/slices/order";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [paymentMode, setPaymentMode] = useState("");
  const { user, logIn } = useSelector((state) => state.user);
  const { orderStart } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function generateRandomString() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    let randomString = "";

    // Generate first two random alphabets
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomString += alphabet[randomIndex];
    }

    // Generate last four random numbers
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      randomString += numbers[randomIndex];
    }

    return randomString;
  }
  const handleChange = (event) => {
    setAddress(event.target.value);
  };
  const handleChangePaymentMode = (event) => {
    setPaymentMode(event.target.value);
  };
  const handleSubmit = () => {
    if (address === "" || address === "last" || paymentMode === "") {
      toast.error("Please Select Address and Payment Mode!");
      return;
    };
    dispatch(setOrderAddress(address));
    dispatch(setOrderPayment({mode:paymentMode,transactionId:"TXT12345SMPL",success:true}))
    navigate(`/order/${generateRandomString()}/success`);
  };

  const fetchEntries = async () => {
    dispatch(setLoading(true));
    const query1 = `*[_type == "address" && user._ref == $userId]`;
    const params = { userId: user[0]?._id };
    try {
      await client.fetch(query1, params).then((res) => {
        setAddresses(res);
      });
    } catch (error) {
      console.log(error);
      // navigate("/");
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if(!logIn || !orderStart){
      toast.error("Please Login first");
      navigate("/auth");
      return;
    }
    fetchEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col px-6 md:px-16 py-8">
      <Helmet>
        <title>Buylocity- Checkout</title>
        <meta
          name="description"
          content="BuyLocity is a revolutionary 2-hour delivery service that aims to simplify your shopping experience by connecting you with your favorite local stores. With BuyLocity, you can enjoy a seamless and hassle-free shopping experience from the comfort of your own home. Our platform provides you with access to a wide range of products from local stores, ensuring that you can always find what you're looking for.
          At BuyLocity, we believe in providing our customers with the best possible service. That's why we prioritize quality and reliability in everything we do. Our team works tirelessly to ensure that all products delivered through our platform meet the highest standards of quality. We also guarantee speedy delivery, with all orders arriving at your doorstep within just 2 hours of placing the order.
          So why wait? Whether you need groceries, snacks, or other household items, BuyLocity has got you covered. Experience the convenience of shopping from your favorite local stores without ever leaving your home. Try BuyLocity today and see how we can simplify your shopping experience!"
        />
      </Helmet>
      <div
        onClick={() => navigate("/cart")}
        className="cursor-pointer border-b ml-4 mr-5 pb-5 border-b-gray-500 flex gap-2 items-center text-lg text-[var(--secondary-color)]"
      >
        <MdArrowBackIosNew />
        <div>Back to Cart</div>
      </div>
      <div className="mt-4">
        <CartTree bag={true} details={true} />
      </div>
      <div className="w-full flex flex-col md:flex-row mt-10">
        <div className="w-full md:w-[70%] flex flex-col">
          <div>
            <div className="h-text text-left">Delivery Address</div>
            {addresses.map((add, index) => (
              <div key={index} className="radio-list text-black pr-4 mt-4">
                <div
                  className={`mb-3 bg-white ${
                    address === add._id && "border-2 border-[#524eee] "
                  } rounded-md `}
                >
                  <div className="radio-item">
                    <input
                      type="radio"
                      name="radio"
                      id={add._id}
                      value={add._id}
                      checked={address === add._id}
                      onChange={handleChange}
                    />

                    <label
                      htmlFor={add._id}
                      className="flex flex-col md:flex-row items-start md:items-center"
                    >
                      <div className="h-text relative text-black text-base flex flex-col items-start">
                        <div className="absolute left-0 -top-1/3 bg-[var(--secondary-color)] px-1 py-0.5 rounded-xl text-white text-xs">
                          {add.tag}
                        </div>
                        <div>{add.name}</div>
                        <div>{add.number}</div>
                      </div>
                      <div className="p-text md:ml-10 text-sm md:whitespace-nowrap">
                        {add.address}, {add.pincode}
                      </div>
                      <div
                        onClick={() => navigate("/account")}
                        className="md:ml-auto md:mr-0 mr-auto text-base md:text-lg font-[500] text-[#524eee]"
                      >
                        <button>Edit</button>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="h-text text-left">Payment Mode</div>
            <div className="radio-list text-black pr-4 mt-4">
              <div
                className={`mb-3 bg-white ${
                  paymentMode === "cod" && "border-2 border-[#524eee] "
                } rounded-md `}
              >
                <div className="radio-item">
                  <input
                    type="radio"
                    name="paymentMode"
                    id="radio5"
                    value="cod"
                    checked={paymentMode === "cod"}
                    onChange={handleChangePaymentMode}
                  />

                  <label htmlFor="radio5">
                    <div className="h-text text-black text-base">
                      Cash on Delivery
                    </div>
                  </label>
                </div>
              </div>

              <div
                className={`mb-3 bg-white ${
                  paymentMode === "online" && "border-2 border-[#524eee] "
                } rounded-md `}
              >
                <div className="radio-item">
                  <input
                    type="radio"
                    name="paymentMode"
                    id="radio6"
                    value="online"
                    checked={paymentMode === "online"}
                    onChange={handleChangePaymentMode}
                  />

                  <label
                    for="radio6"
                    className="flex flex-col md:flex-row items-start md:items-center"
                  >
                    <div className="h-text text-black text-base">
                      Online Payment
                    </div>
                    <div className="p-text md:ml-2 mt-1 whitespace-nowrap">
                      Secure Payment through Razorpay
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[30%] h-fit rounded-lg bg-white flex flex-col px-3 py-6">
          <div
            onClick={handleSubmit}
            className=" cursor-pointer w-full bg-[var(--secondary-color)] text-white text-center py-1.5 rounded-md"
          >
            <button>
              {paymentMode === "cod" || paymentMode === ""
                ? "Place Order"
                : "Pay Now"}
            </button>
          </div>

          <div className="mt-3 p-text w-full">
            By placing your order, you agree to our company's{" "}
            <span className="underline">Privacy Policy</span> and{" "}
            <span className="underline">Terms and Conditions</span>
          </div>

          <div className="h-0.5 w-full bg-gray-300 my-6" />

          <div className="h-text text-black text-left text-base">
            Order Summary
          </div>

          <div className="flex justify-between items-center mt-4 p-text text-sm">
            <div>Items(2):</div>
            <div className="font-semibold">Rs 1500</div>
          </div>
          <div className="flex justify-between items-center p-text text-sm">
            <div>Delivery Charges:</div>
            <div className="font-semibold text-green-500">Free</div>
          </div>
          <div className="h-0.5 w-full bg-gray-300 my-6" />
          <div className="flex justify-between items-center p-text text-sm">
            <div>Order Total:</div>
            <div className="font-semibold">Rs1500</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
