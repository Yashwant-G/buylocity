import React, { useState } from "react";
import CartTree from "../Cart/CartTree";
import { MdArrowBackIosNew } from "react-icons/md";
import "./Checkout.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const [address, setAddress] = useState("one");
  const [paymentMode, setPaymentMode] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAddress(event.target.value);
  };
  const handleChangePaymentMode = (event) => {
    setPaymentMode(event.target.value);
  };
  const handleSubmit = () => {
    if (address === "" || paymentMode === "") {
      toast.error("Please Select Address and Payment Mode!");
      return;
    }
    navigate("/order/1234/success");
  };
  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col px-6 md:px-16 py-8">
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
            <div class="radio-list text-black pr-4 mt-4">
              <div
                className={`mb-3 bg-white ${
                  address === "one" && "border-2 border-[#524eee] "
                } rounded-md `}
              >
                <div class="radio-item">
                  <input
                    type="radio"
                    name="radio"
                    id="radio1"
                    value="one"
                    checked={address === "one"}
                    onChange={handleChange}
                  />

                  <label
                    for="radio1"
                    className="flex flex-col md:flex-row items-start md:items-center"
                  >
                    <div className="h-text text-black text-base">
                      Yashwant G
                    </div>
                    <div className="p-text md:ml-10 text-sm whitespace-nowrap">
                      125, Police Line, Vikaspuri
                    </div>
                    <div className="md:ml-auto md:mr-0 mr-auto text-base md:text-lg font-[500] text-[#524eee]">
                      <button>Edit</button>
                    </div>
                  </label>
                </div>
              </div>

              <div
                className={`mb-3 bg-white ${
                  address === "two" && "border-2 border-[#524eee] "
                } rounded-md `}
              >
                <div class="radio-item">
                  <input
                    type="radio"
                    name="radio"
                    id="radio2"
                    value="two"
                    checked={address === "two"}
                    onChange={handleChange}
                  />

                  <label
                    for="radio2"
                    className="flex flex-col md:flex-row items-start md:items-center"
                  >
                    <div className="h-text text-black text-base">
                      Yashwant G
                    </div>
                    <div className="p-text md:ml-10 text-sm whitespace-nowrap">
                      125, Police Line, Vikaspuri
                    </div>
                    <div className="md:ml-auto md:mr-0 mr-auto text-base md:text-lg font-[500] text-[#524eee]">
                      <button>Edit</button>
                    </div>
                  </label>
                </div>
              </div>

              <div
                className={`mb-3 bg-white ${
                  address === "three" && "border-2 border-[#524eee] "
                } rounded-md `}
              >
                <div class="radio-item">
                  <input
                    type="radio"
                    name="radio"
                    id="radio3"
                    value="three"
                    checked={address === "three"}
                    onChange={handleChange}
                  />

                  <label
                    for="radio3"
                    className="flex flex-col md:flex-row items-start md:items-center"
                  >
                    <div className="h-text text-black text-base">
                      Yashwant G
                    </div>
                    <div className="p-text md:ml-10 text-sm whitespace-nowrap">
                      125, Police Line, Vikaspuri
                    </div>
                    <div className="md:ml-auto md:mr-0 mr-auto text-base md:text-lg font-[500] text-[#524eee]">
                      <button>Edit</button>
                    </div>
                  </label>
                </div>
              </div>

              <div
                className={`mb-3 bg-white ${
                  address === "last" && "border-2 border-[#524eee] "
                } rounded-md `}
              >
                <div class="radio-item">
                  <input
                    type="radio"
                    name="radio"
                    id="radio4"
                    value="last"
                    checked={address === "last"}
                    onChange={handleChange}
                  />

                  <label for="radio4">
                    <div className="h-text text-black text-base">
                      Add new address
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="h-text text-left">Payment Mode</div>
            <div class="radio-list text-black pr-4 mt-4">
              <div
                className={`mb-3 bg-white ${
                  paymentMode === "cod" && "border-2 border-[#524eee] "
                } rounded-md `}
              >
                <div class="radio-item">
                  <input
                    type="radio"
                    name="paymentMode"
                    id="radio5"
                    value="cod"
                    checked={paymentMode === "cod"}
                    onChange={handleChangePaymentMode}
                  />

                  <label for="radio5">
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
                <div class="radio-item">
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
            <button>Place Order</button>
          </div>

          <div className="mt-3 p-text w-full">
            By placing your order, you agree to our company's{" "}
            <span className="underline">Privacy Policy</span> and{" "}
            <span className="underline">Terms and Conditions</span>
          </div>

          <div className="h-0.5 w-full bg-gray-300 my-6" />

          <div className="h-text text-black text-left text-base">Order Summary</div>

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
