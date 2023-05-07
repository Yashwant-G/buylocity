import React, { useContext } from 'react'
import Contact from '../components/Contact/Contact';
import Navbar from "../components/Navbar/Navbar";
import OrderNow from '../components/OrderNow/OrderNow';
import { ModeContext } from '../context/context';

const Order = () => {
  const { light } = useContext(ModeContext);
  return (
    <div className={`app ${light ? "background-light":"background-dark"}`}>
      <Navbar home={false}/>
      <OrderNow/>
      <Contact/>
    </div>
  )
}

export default Order;