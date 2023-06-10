import React, { useState,useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { client } from "../../client";
import { setLoading } from "../../redux/slices/loading";
import { toast } from "react-hot-toast";
import { setUser, verifyUser } from "../../redux/slices/user";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../components/Form/SignUpForm";

const Signup = () => {
  const { GoogleUser, logIn } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: GoogleUser.name,
    number: '',
    address: "",
    landmark: "",
    pincode: '',
    instructions:"",
    tag:'',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(GoogleUser==={}){
      navigate("/auth")
    }
    if(logIn){
      toast.success("Already logged in");
      navigate("/account");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.number.length !== 10 || formData.pincode.length !== 6) {
      toast.error("Please enter valid number and pincode");
      return;
    }

    dispatch(setLoading(true));
    const entry = {
      _type: "address",
      name: formData.name,
      number: parseInt(formData.number),
      address: formData.address,
      landmark: formData.landmark,
      pincode: parseInt(formData.pincode),
      instructions:formData.instructions,
      tag:formData.tag,
    };
    let adId;
    await client
      .create(entry)
      .then((res) => {
        console.log("success");
        adId = res._id;
        toast.success("Address Saved");
      })
      .catch((err) => console.log(err));

    const userEntry = {
      _type: "users",
      userName: formData.name,
      imageUrl: GoogleUser.picture,
      accountType: "customer",
      phoneNo: parseInt(formData.number),
      email: GoogleUser.email,
      address: [
        {
          _key: "orderKey1",
          _type: "reference",
          _ref: adId,
        },
      ],
    };
    let uId;
    await client
      .create(userEntry)
      .then((res) => {
        console.log("success");
        uId = res._id;
        toast.success("Signup Successful");
      })
      .catch((err) => console.log(err.message));
      
    await client
      .patch(adId)
      .set({
        user:{
          _type: "reference",
          _ref: uId,
        },
      })
      .commit();

    const query = `*[_type == "users" && _id == $id]{
      _id,
      userName,
      imageUrl,
      accountType,
      phoneNo,
      email,
    }`
    let user=[]
    const params={id:uId}
    await client.fetch(query, params).then((res)=>{
      user=res;
    })
    // console.log(user);
    dispatch(setLoading(false));
    dispatch(setUser(user));
    dispatch(verifyUser());
    navigate("/");
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <Helmet>
        <title>Buylocity- Signup</title>
        <meta
          name="description"
          content="BuyLocity is a revolutionary 2-hour delivery service that aims to simplify your shopping experience by connecting you with your favorite local stores. With BuyLocity, you can enjoy a seamless and hassle-free shopping experience from the comfort of your own home. Our platform provides you with access to a wide range of products from local stores, ensuring that you can always find what you're looking for.
          At BuyLocity, we believe in providing our customers with the best possible service. That's why we prioritize quality and reliability in everything we do. Our team works tirelessly to ensure that all products delivered through our platform meet the highest standards of quality. We also guarantee speedy delivery, with all orders arriving at your doorstep within just 2 hours of placing the order.
          So why wait? Whether you need groceries, snacks, or other household items, BuyLocity has got you covered. Experience the convenience of shopping from your favorite local stores without ever leaving your home. Try BuyLocity today and see how we can simplify your shopping experience!"
        />
      </Helmet>
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            Welcome {GoogleUser.name}
          </h2>
          <p className="text-gray-500 mb-6">Lets Begin the Journey</p>

          <div className="bg-[var(--white-color)] rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-[var(--black-color)]">
                <p className="font-medium text-lg">Address Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <SignUpForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
