import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { BsChevronDown, BsChevronRight, BsChevronUp } from "react-icons/bs";
import { useState } from "react";
import { removeUser } from "../../redux/slices/user";
import { client } from "../../client";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { setLoading } from "../../redux/slices/loading";
import Address from "../../components/MyAccount/Address";
import UserOrders from "../../components/MyAccount/UserOrders";
import { toast } from "react-hot-toast";

const MyAccount = () => {
  const [profileDiv, setProfileDiv] = useState(false);
  const [addressDiv, setAddressDiv] = useState(false);
  const [ordersDiv, setOrdersDiv] = useState(false);
  const [address, setAddress] = useState([]);
  const [orders, setOrders] = useState([]);
  const { user,logIn } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchEntries = async () => {
    dispatch(setLoading(true));
    const query1 = `*[_type == "address" && user._ref == $userId]`;
    const params = { userId: user[0]?._id };
    const query2 = `*[_type == "orders" && user._ref == $userId]{
      _id,
      orderId,
      total,
      _createdAt,
      allproducts[]{
        ...,
        product->{
          _id,
          name,
        },
      },
    } | order(_createdAt desc)`;
    try {
      await client.fetch(query1, params).then((res) => {
        setAddress(res);
      });

      await client.fetch(query2, params).then((res) => {
        setOrders(res);
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if(!logIn){
      toast.error("Not Logged in");
      navigate("/auth");
    }
    fetchEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full min-h-screen">
      <Helmet>
        <title>Buylocity- Profile</title>
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
      <div className="pt-28 w-11/12 mx-auto app__flex flex-col gap-2 pb-10">
        {user.length > 0 ? (
          <>
            <div className="head-text text-2xl lg:text-4xl">
              <span>My</span> Account
            </div>
            <div className="w-max mt-8 flex flex-col items-center gap-1">
              <img
                className="object-cover rounded-full"
                src={user[0]?.imageUrl}
                alt="alt"
              />
              <div className="h-text">{user[0]?.userName}</div>
            </div>

            {/* profile Details */}
            <div
              className="h-text font-normal w-3/5  md:w-[50%] mt-8 border bg-[var(--white-color)] hover:border-2
        border-[var(--black-color)] rounded-lg px-4 py-2 cursor-pointer hover:opacity-90 hover:border-blue-500"
            >
              <div
                onClick={() => setProfileDiv((prev) => !prev)}
                className="flex justify-between items-center"
              >
                Profile Details{" "}
                {profileDiv ? <BsChevronUp /> : <BsChevronDown />}
              </div>
              {profileDiv && (
                <div className="flex gap-2 mt-2 p-text text-base w-full flex-wrap py-4">
                  <div className="flex flex-col items-start w-full md:w-[48%] ">
                    <label htmlFor="full_name">Full Name:</label>
                    <input
                      type="text"
                      id="full_name"
                      readOnly
                      className="h-10 text-black outline-none border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue={user[0]?.userName}
                    />
                  </div>

                  <div className="flex flex-col items-start w-full md:w-[48%]">
                    <label htmlFor="Email">Email:</label>
                    <input
                      type="text"
                      id="Email"
                      readOnly
                      className="h-10 text-black outline-none border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue={user[0]?.email}
                    />
                  </div>

                  <div className="flex flex-col items-start w-full md:w-[48%]">
                    <label htmlFor="Phone">Phone Number:</label>
                    <input
                      type="text"
                      id="Phone"
                      readOnly
                      className="h-10 text-black outline-none border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue={user[0]?.phoneNo}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Your Orders */}
            <div
              className="h-text font-normal w-3/5  md:w-[50%] mt-4 border hover:border-2  bg-[var(--white-color)]
        border-[var(--black-color)] rounded-lg px-4 py-2 cursor-pointer hover:bg-opacity-90 hover:border-blue-500"
            >
              <div
                onClick={() => setOrdersDiv((prev) => !prev)}
                className="flex justify-between items-center"
              >
                Your Orders {ordersDiv ? <BsChevronUp /> : <BsChevronDown />}
              </div>
              {ordersDiv && (
                <div>
                  {orders.length > 0 ? (
                    <UserOrders orders={orders}/>
                  ) : (
                    <div className="p-text text-base py-4 text-center">
                      No Orders Found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Your Addresses */}
            <div
              className="h-text font-normal w-3/5 md:w-[50%] mt-4 border hover:border-2 bg-[var(--white-color)]
        border-[var(--black-color)] rounded-lg px-4 py-2 cursor-pointer hover:opacity-90 hover:border-blue-500"
            >
              <div
                onClick={() => setAddressDiv((prev) => !prev)}
                className="flex justify-between items-center whitespace-nowrap"
              >
                Your Addresses{" "}
                {addressDiv ? <BsChevronUp /> : <BsChevronDown />}
              </div>
              {addressDiv && (
                <div className="p-text py-4 text-base ">
                  {address.length > 0 ? (
                    <Address address={address} setAddress={setAddress} />
                  ) : (
                    <div className="p-text text-base py-4 text-center">
                      No Addresses Found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Customer Support */}
            <Link
              to="/contact"
              className="h-text font-normal w-3/5  md:w-[50%] mt-4 border hover:border-2 bg-[var(--white-color)] 
        border-[var(--black-color)] rounded-lg px-4 py-2 cursor-pointer hover:opacity-90 hover:border-blue-500"
            >
              <div className="flex justify-between items-center">
                Customer Support <BsChevronRight />
              </div>
            </Link>

            {/* Logout */}
            <div className="w-3/5 md:w-1/2">
              <button
                onClick={onOpenModal}
                className="app__flex gap-1 bg-[var(--secondary-color)] text-lg text-white px-3 py-1 rounded-lg mt-4 hover:bg-blue-500"
              >
                Log Out
              </button>
            </div>

            <Modal open={open} onClose={onCloseModal} center>
              <div className="pr-8 pt-2 p-text text-lg w-fit">
                Are you sure ?
              </div>
              <div className="flex w-full items-center gap-2 mx-auto">
                <button
                  onClick={() => dispatch(removeUser())}
                  className="app__flex gap-1 bg-red-500 whitespace-nowrap w-1/2 text-lg text-white px-3 py-1 rounded-lg mt-4 hover:bg-red-400"
                >
                  Log Out
                </button>
                <button
                  onClick={onCloseModal}
                  className="app__flex gap-1 w-1/2 bg-blue-500 text-lg text-white px-3 py-1 rounded-lg mt-4 hover:bg-blue-400"
                >
                  Cancel
                </button>
              </div>
            </Modal>
          </>
        ) : (
          <div className="app__flex flex-col">
            <div className="head-text text-2xl md:text-3xl">
              Please Login First
            </div>
            <Link to="/auth">
              <button className="app__flex gap-1 bg-[var(--secondary-color)] text-lg text-white px-3 py-1 rounded-lg mt-4 hover:bg-blue-500">
                Log In
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
