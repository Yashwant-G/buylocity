import React from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const { user, logIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!logIn) {
      toast.error("Please login first");
      navigate("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {user[0] && (
        <div>
          <div>
            <img src={user[0].imageUrl} alt="alt" />
          </div>
          <div>{user[0].userName}</div>
          <div>{user[0].email} </div>
          <div>{user[0].phoneNo} </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
