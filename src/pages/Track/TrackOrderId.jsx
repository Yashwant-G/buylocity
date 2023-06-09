import React, {  useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { client } from "../../client";
import Contact from "../../components/Contact/Contact";
import Navbar from "../../components/Navbar/Navbar";
import Found from "../../components/Found/Found";
import MotionWrap from "../../wrapper/MotionWrap";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loading";

const TrackOrderId = () => {
  const [found, setFound] = useState(true);
  const [details, setDetails] = useState([]);
  const [status, setStatus] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/").at(-1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    const query = `*[_type == "orders" && orderId == $orderId]{
      ...,
      status->{
        ...,
      },
    }`;
    const params = { orderId: id.toString() };

    client.fetch(query, params).then((order) => {
      if (order.length === 0) {
        setFound(false);
        console.log("not fetched");
      }
      setDetails(order[0]);
      setStatus(order[0].status)
      console.log(order);
    });
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Helmet>
        <title>Buylocity- Live Track your Order</title>
        <meta
          name="description"
          content="Welcome to our order details page, where you can view all the information related to your recent purchase. Our easy-to-use interface provides you with a comprehensive overview of your order, including the items purchased, delivery date, and payment information.
          With our order details page, you can easily review and confirm the details of your purchase. If you have any questions or concerns, our dedicated customer service team is always available to assist you.
          So whether you're checking the status of a recent delivery or simply want to review your purchase history, our order details page makes it easy and convenient. Try our order details page today and experience the ease of managing your purchases online!"
        />
      </Helmet>
      <Navbar home={false} />
      {found ? (
        <Found details={details} status={status}/>
      ) : (
        <div className="app__flex head-text pt-28 gap-1 h-[70vh] text-lg lg:text-2xl">
          Order Id Not found, Please
          <span
            className="cursor-pointer hover:underline"
            onClick={() => navigate(`/track`)}
          >
            try again
          </span>
        </div>
      )}
      <Contact />
    </div>
  );
};

export default MotionWrap(TrackOrderId, "app__track");
