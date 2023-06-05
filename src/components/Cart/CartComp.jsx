import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { urlFor } from "../../client";
import { Helmet } from "react-helmet";
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import {
  AiFillDelete,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import {RiHeartAddLine} from "react-icons/ri"
import { RxCross1 } from "react-icons/rx";
import {
  descrementQuantity,
  incrementQuantity,
  removeFromCart,
  resetCart,
} from "../../redux/slices/cart";
import { toast } from "react-hot-toast";

const CartComp = () => {
  const { products, total } = useSelector((state) => state.cart);
  console.log("Cart Page", products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-full h-[100vh] md:overflow-hidden">
      <Helmet>
        <title>Buylocity- Cart</title>
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
      <div className="pt-28">
        {products.length > 0 ? (
          <div className="w-full flex flex-col md:flex-row p-4 h-fit ">
            <div className="w-full md:w-[70%] px-6 md:px-16 py-4 md:py-8 bg-white h-[509px] overflow-auto">
              <div className="flex justify-between">
                <div className="h-text text-black text-left text-base whitespace-nowrap md:text-lg">
                  Shopping Cart
                </div>

                <div className="h-text text-black text-base md:text-lg">
                  {products.length} Items
                </div>
              </div>

              <div className="flex md:flex-row gap-2 md:gap-0 justify-between items-start md:items-center mt-6 md:mt-2">
                <div className="text-[var(--secondary-color)] p-text text-base">
                  <Link to="/products">
                    <button className="app__flex gap-1 md:gap-2">
                      <BsArrowLeft /> Back To Products
                    </button>
                  </Link>{" "}
                </div>
                <Link className="my-auto" to="/wishlist">
                  <div className="flex items-center gap-1 text-[var(--secondary-color)] p-text text-base cursor-pointer">
                    <div className="hidden md:block">Add from Wishlist</div>
                    <RiHeartAddLine />
                  </div>
                </Link>
                <div
                  onClick={() => {
                    dispatch(resetCart());
                  }}
                  className="p-text my-auto text-base cursor-pointer flex items-center gap-1 text-red-500"
                >
                  <div className="hidden md:block">Reset Cart</div>
                  <AiFillDelete />
                </div>
              </div>

              <div className="h-[1px] w-full bg-black my-4 md:my-6"></div>

              <div className="flex flex-col w-full mt-2">
                <div className="hidden md:flex w-full text-gray-500 text-base">
                  <div className="w-[40%] text-left">Product Details</div>
                  <div className="w-[20%] text-center">Quantity</div>
                  <div className="w-[20%] text-center">Price</div>
                  <div className="w-[20%] text-center">Total</div>
                </div>

                {products.map((prod, index) => (
                  <div
                    key={index}
                    className="flex relative flex-col md:flex-row w-full mt-6 border-b border-gray-400"
                  >
                    <div className="w-[100%] md:w-[40%] flex gap-4">
                      <div
                        className="w-28 cursor-pointer"
                        onClick={() => navigate(`/products/${prod.id}`)}
                      >
                        <img
                          className="object-cover rounded-md"
                          src={urlFor(prod.image)}
                          alt="alt"
                        />
                      </div>
                      <div className="flex flex-col justify-between mb-8 gap-2">
                        <div
                          onClick={() => navigate(`/products/${prod.id}`)}
                          className="cursor-pointer hover:underline bold-text text-black text-sm md:text-base leading-5"
                        >
                          {prod.name}
                        </div>
                        <div className="flex gap-2">
                          {prod.color && (
                            <div
                              style={{
                                backgroundColor: `${prod.color.toLowerCase()}`,
                              }}
                              className={`h-[20px] w-[20px] rounded-full border border-black`}
                            ></div>
                          )}
                          {prod.size && (
                            <div className="bg-[var(--secondary-color)] text-xs md:text-sm px-1.5 py-0.5 my-auto text-white rounded-md">
                              {prod.size}
                            </div>
                          )}
                          {prod.pack && (
                            <div className="bg-[var(--secondary-color)] text-xs md:text-sm px-1.5 py-0.5 my-auto text-white rounded-md">
                              {prod.pack}
                            </div>
                          )}
                        </div>
                        <div className="block md:hidden text-sm md:text-base">
                          Rs{prod.price * prod.quantity}
                        </div>
                        <div onClick={() => {
                            dispatch(
                              removeFromCart({
                                index,
                                price: prod.price,
                                quantity: prod.quantity,
                              })
                            );
                          }} className="md:hidden block cursor-pointer text-red-500 absolute -right-4 top-0"><RxCross1/></div>
                        <div
                          onClick={() => {
                            dispatch(
                              removeFromCart({
                                index,
                                price: prod.price,
                                quantity: prod.quantity,
                              })
                            );
                          }}
                          className="hidden md:flex items-center gap-1 text-red-500 cursor-pointer"
                        >
                          Remove <AiFillDelete />
                        </div>
                      </div>
                    </div>

                    <div className="w-[20%] py-2 md:py-0 ml-5 md:ml-0">
                      <div className="app__flex gap-2">
                        <button
                          onClick={() => {
                            dispatch(
                              descrementQuantity({ index, price: prod.price })
                            );
                          }}
                        >
                          <AiOutlineMinus />
                        </button>
                        <div className="px-3 py-0 border border-gray-500">
                          {prod.quantity}
                        </div>
                        <button
                          onClick={() => {
                            dispatch(
                              incrementQuantity({
                                index,
                                price: prod.price,
                                stock: prod.stock,
                              })
                            );
                          }}
                        >
                          <AiOutlinePlus />
                        </button>
                      </div>
                    </div>

                    <div className="w-[20%] hidden md:block justify-center text-center">
                      Rs{prod.price}
                    </div>
                    <div className="w-[20%] hidden md:block justify-center text-center">
                      Rs{prod.quantity * prod.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-[30%] px-8 py-8 flex flex-col gap-2 bg-teal-100">
              <div className="h-text text-black">Order Summary</div>
              <div className="h-[1px] mt-12 w-full bg-black"></div>
              <div className="flex justify-between items-center mt-3.5 ">
                <div className="font-[500]">Total Items</div>
                <div className="font-bold">Rs{total}</div>
              </div>
              <div className="flex justify-between items-center">
                <div>Delivery Charges</div>
                <div className="font-bold text-[green]">Free</div>
              </div>
              <div className="flex flex-col gap-4 mt-2">
                <div>Promo Code</div>
                <div>
                  <input
                    className="w-full outline-none p-2"
                    type="text"
                    name="promo"
                    placeholder="Enter Your Code"
                  />
                </div>
                <div>
                  <button
                    onClick={() => toast.error("Invalid Coupon Code")}
                    className="w-fit bg-red-500 text-white py-2 px-4 rounded-md"
                    type="submit"
                  >
                    Apply
                  </button>
                </div>
              </div>
              <div className="h-[1px] mt-4 w-full bg-black"></div>
              <div className="flex justify-between items-center">
                <div className="my-3">Total Amount</div>
                <div className="font-bold">Rs{total}</div>
              </div>
              <div>
                <Link to="/order/1234/success">
                  <button className="w-full bg-[var(--secondary-color)] text-white py-2 rounded-md">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="app__flex flex-col h-[60vh] gap-4">
            <div className="head-text text-2xl md:text-3xl">
              Your Cart is Empty
            </div>
            <div>
              <Link to="/products">
                <button className="h-text text-base md:text-xl text-white bg-[var(--secondary-color)] px-4 py-2 rounded-2xl ">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartComp;
