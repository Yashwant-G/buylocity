import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { client } from "../client";
import Contact from "../components/Contact/Contact";
import Found from "../components/Found/Found";
import Navbar from "../components/Navbar/Navbar";
import { ModeContext } from "../context/context";
import MotionWrap from "../wrapper/MotionWrap";

const TrackOrderId = () => {
  const { light } = useContext(ModeContext);
  const [found, setFound] = useState(true);
  const [details, setDetails] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const id = location.pathname.split("/").at(-1);
    const query = `*[_type == "orders" && orderId == $orderId]`;
    const params = { orderId: id.toString() };

    client.fetch(query, params).then((order) => {
      if (order.length === 0) {
        setFound(false);
        console.log("not fetched");
      }
      setDetails(order[0]);
      console.log(order);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`app ${light ? "background-light" : "background-dark"}`}>
      <Navbar home={false} />
      {found ? (
        <Found details={details} />
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
