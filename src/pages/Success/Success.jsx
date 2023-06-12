import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar/Navbar";
import { firework } from "../../api/firework";
import img from "../../assets/confetti.png";
import bike from "../../assets/delivery-scooter.gif";
import { useLocation, useNavigate } from "react-router-dom";
import CartTree from "../../components/Cart/CartTree";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/loading";
import { client } from "../../client";
import { resetCart } from "../../redux/slices/cart";
import { resetOrderState } from "../../redux/slices/order";

const Success = () => {
  const [bgGreen, setbgGreen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/").at(-2);
  const { loading } = useSelector((state) => state.loading);
  const { products, total } = useSelector((state) => state.cart);
  const { user, logIn } = useSelector((state) => state.user);
  const { address, payment, orderStart } = useSelector((state) => state.order);

  const saveOrder = async () => {
    let entry = {
      _type: "trackorder",
      trackId: id,
      orderRecieved: true,
    };
    let Tid = "";
    let Oid = "";
    await client.create(entry).then((res) => (Tid = res._id));

    entry = {
      _type: "orders",
      orderId: id,
      status: {
        _type: "reference",
        _ref: Tid,
      },
      user: {
        _type: "reference",
        _ref: user[0]._id,
      },
      address: {
        _type: "reference",
        _ref: address,
      },
      total: parseInt(total),
      allproducts: products.map((item) => ({
        _type: "object",
        _key: "unique" + item.id,
        product: {
          _type: "reference",
          _ref: item.id,
        },
        size: item.size,
        color: item.color,
        pack: item.pack,
        quantity: parseInt(item.quantity),
      })),
      payment: payment,
    };
    await client.create(entry).then((res) => (Oid = res._id));
    await client
      .patch(Tid)
      .set({
        orderId: {
          _type: "reference",
          _ref: Oid,
        },
      })
      .commit();
    let l = -1;
    await client
      .getDocument(user[0]._id)
      .then((res) => (l = res.orders.length))
      .catch((err) => (l = -1));
    if (l > 0) {
      await client
        .patch(user[0]._id)
        .prepend("orders", [
          { _key: "new" + Oid, _type: "reference", _ref: Oid },
        ])
        .commit();
    } else {
      await client.patch(user[0]._id).set({
        orders: [
          {
            _key: "new" + Oid,
            _type: "reference",
            _ref: Oid,
          },
        ],
      }).commit();
    }

    dispatch(resetCart());
    dispatch(resetOrderState());
  };

  useEffect(() => {
    if (!logIn || !orderStart) {
      navigate("/cart");
      return;
    }
    dispatch(setLoading(true));
    saveOrder();
    dispatch(setLoading(false));
    setbgGreen(true);
    firework();
    setTimeout(() => {
      setbgGreen(false);
    }, 3500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div
        className={`w-full min-h-screen ${
          bgGreen && "bg-[#a8faa8]"
        } transition-all duration-1000`}
      >
        <Helmet>
          <title>Buylocity- Success</title>
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
        {!loading ? (
          <div className="pt-28">
            <div className="mt-4">
              {bgGreen && <CartTree success={true} bag={true} details={true} />}
            </div>
            <div className="flex justify-center items-center gap-2 flex-col mt-8 px-6 relative">
              <div className="absolute z-10 top-0 left-20 text-red-500">
                Note*: Not a real order, its in development phase
              </div>
              <div className="w-40 h-40 ml-14">
                <img
                  src={img}
                  alt="alt"
                  className="object-cover animate-bounce"
                />
              </div>

              <div className="h-text">Order Confirmed</div>
              <div className="p-text text-lg">
                Yay!!, Thanks for Shopping with us
              </div>
              <div className="p-text text-lg text-center">
                Keep a watch at your door, order is coming soon
                <img className="w-20 h-20 mx-auto" src={bike} alt="alt" />
              </div>
              <div>
                <button
                  onClick={() => navigate(`/track/${id}`)}
                  className="h-text py-2 px-4 rounded-xl text-white bg-[var(--secondary-color)]"
                >
                  Track Your Order
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-28 text-center head-text">
            Confirming your order...
          </div>
        )}
      </div>
    </>
  );
};

export default Success;
