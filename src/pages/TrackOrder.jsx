import React, { useContext,useState } from "react";
import Contact from "../components/Contact/Contact";
import Navbar from "../components/Navbar/Navbar";
import { ModeContext } from "../context/context";
import { useNavigate } from 'react-router-dom';

const TrackOrder = () => {
  const { light } = useContext(ModeContext);
  const [orderId,setOrderId]=useState(undefined);
  const navigate = useNavigate() ;

  const handleChangeInput = (e) => {
    setOrderId(e.target.value);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(orderId);
      navigate(`/track/${orderId}`);
  }
  return (
    <div className={`app ${light ? "background-light" : "background-dark"}`}>
      <Navbar home={false} />
      <div className="app__flex flex-col w-full h-[90vh]">
        <div className="head-text mt-28" >Track <span>Your</span> order</div>
        <form onSubmit={handleSubmit} className="flex flex-col p-16 gap-4">
          <h2 className="h-text">
            Enter Your Order Id
          </h2>
          <input
            className="px-4 py-2 h-text text-black text-sm outline-none text-center rounded-lg"
            type="text"
            placeholder="Order Id"
            name="username"
            value={orderId}
            onChange={handleChangeInput}
            required
          />
          <button
            className="bg-[var(--secondary-color)] text-white p-text text-lg px-3 py-1 hover:bg-white 
        hover:text-[var(--gray-color)] rounded-3xl text-center w-[50%] mx-auto"
            type="submit"
          >
            Track
          </button>
        </form>
      </div>
      <Contact />
    </div>
  );
};

export default TrackOrder;
