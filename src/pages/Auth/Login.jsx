import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar/Navbar";
import { client, urlFor } from "../../client";
import { ImQuotesLeft } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setCookie, verifyLogin } from "../../redux/slices/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
  const [logo, setLogo] = useState(null);
  const [quote, setQuote] = useState({ q: "Start", author: "Yash" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logIn } = useSelector((state) => state.user);

  function handleCallbackResponse(response) {
    dispatch(setCookie(response.credential));
    dispatch(verifyLogin());
    navigate("/");
  }

  useEffect(() => {
    if(logIn){
      toast.success("Already logged in");
      navigate("/profile");
    }
    /*global google */
    google.accounts.id.initialize({
      client_id:
        "435725511546-5amgavsdaq9pe43d4mg2q2j18nm0jmpv.apps.googleusercontent.com",
      callback: handleCallbackResponse,
      context: "signin",
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      text: "continue_with",
    });
    google.accounts.id.prompt();

    const fetchData = async () => {
      try {
        const response = await fetch("https://api.quotable.io/random");
        const jsonData = await response.json();
        setQuote({ q: jsonData.content, author: jsonData.author });
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();

    client
      .fetch('*[_type == "logo"][0]')
      .then((image) => {
        setLogo(urlFor(image.imgUrl));
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full h-screen">
      <Helmet>
        <title>Buylocity- Signup/Login</title>
        <meta
          name="description"
          content="BuyLocity is a revolutionary 2-hour delivery service that aims to simplify your shopping experience by connecting you with your favorite local stores. With BuyLocity, you can enjoy a seamless and hassle-free shopping experience from the comfort of your own home. Our platform provides you with access to a wide range of products from local stores, ensuring that you can always find what you're looking for.
          At BuyLocity, we believe in providing our customers with the best possible service. That's why we prioritize quality and reliability in everything we do. Our team works tirelessly to ensure that all products delivered through our platform meet the highest standards of quality. We also guarantee speedy delivery, with all orders arriving at your doorstep within just 2 hours of placing the order.
          So why wait? Whether you need groceries, snacks, or other household items, BuyLocity has got you covered. Experience the convenience of shopping from your favorite local stores without ever leaving your home. Try BuyLocity today and see how we can simplify your shopping experience!"
        />
      </Helmet>
      <Navbar home={false} />
      <div className="pt-28 flex w-11/12 h-screen pb-0.5">
        <div className="w-[55%] hidden lg:block rounded-r-3xl bg-cover h-full bg-[url(https://images.unsplash.com/photo-1574634534894-89d7576c8259?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80)]">
          <div className="flex flex-col w-[60%] h-fit mx-auto mt-[15%] py-10 pl-5 pr-10 rounded-3xl justify-center items-center bg-gray-400">
            <div className="head-text text-white mr-auto">Hey There,</div>
            <div className="head-text text-white mr-auto -mt-3">Welcome!</div>
            <div className="h-text text-lg text-[var(--secondary-color)] my-2 mr-auto text-left">
              We are a 2hr Delivery Company
            </div>
            <div className="text-[var(--secondary-color)] mr-auto mt-2">
              <ImQuotesLeft className="text-4xl" />
            </div>
            <div className="p-text text-gray-600 text-base mr-auto mt-1">
              {quote.q}
            </div>
            <div className="h-text text-lg text-[var(--secondary-color)] ml-auto mt-2">
              {quote.author}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[45%]">
          <div className="app__flex mt-8">
            <img
              src={logo}
              alt="logo"
              className="w-[40%] md:w-[20%]"
              loading="lazy"
            />
          </div>
          <div className="head-text text-2xl md:text-3xl mt-8">Sign In/Up</div>
          <div className="w-full my-10">
            <button
              id="signInDiv"
              className="flex gap-2 items-center p-3 rounded-lg p-text text-lg whitespace-nowrap mx-auto border border-gray-600"
            ></button>
          </div>
          <div className="p-text text-lg text-center font-bold mt-4">
            You think you come fast? No we come fast!
          </div>
          <div className="p-text text-base text-center">
            Sign up now for the challenge and prove your speed!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
