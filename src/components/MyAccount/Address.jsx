import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { AiOutlineDelete } from "react-icons/ai";
import SignUpForm from "../Form/SignUpForm";
import { client } from "../../client";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/loading";

const Address = ({ address, setAddress }) => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    address: "",
    landmark: "",
    pincode: "",
    instructions: "",
    tag: "",
  });
  const [newAdd, setNewAdd] = useState(false);
  const [addId, setAddId] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.number.length !== 10 || formData.pincode.length !== 6) {
      toast.error("Please enter valid number and pincode");
      return;
    }
    dispatch(setLoading(true));
    onCloseModal();
    if (newAdd) {
      const entry = {
        _type: "address",
        name: formData.name,
        number: parseInt(formData.number),
        user: {
          _type: "reference",
          _ref: user[0]._id,
        },
        address: formData.address,
        landmark: formData.landmark,
        pincode: parseInt(formData.pincode),
        instructions: formData.instructions,
        tag: formData.tag,
      };
      let adId;
      await client
        .create(entry)
        .then((res) => {
          console.log("success");
          adId = res._id;
        })
        .catch((err) => console.log(err));

      let l = -1;
      await client
        .getDocument(user[0]._id)
        .then((res) => (l = res.orders.length))
        .catch((err) => (l = -1));

      if (l > 0) {
        await client
          .patch(user[0]._id)
          .append("address", [
            {
              _key: `new ${adId}`,
              _type: "reference",
              _ref: adId,
            },
          ])
          .commit();
      } else {
        await client
          .patch(user[0]._id)
          .set({
            address: [
              {
                _key: "new" + adId,
                _type: "reference",
                _ref: adId,
              },
            ],
          })
          .commit();
      }

      toast.success("Address Saved");
    } else {
      await client
        .patch(addId)
        .set({
          name: formData.name,
          number: parseInt(formData.number),
          address: formData.address,
          landmark: formData.landmark,
          pincode: parseInt(formData.pincode),
          instructions: formData.instructions,
          tag: formData.tag,
        })
        .commit()
        .then(() => toast.success("Address updated successfully"))
        .catch((err) => console.log(err.message));
    }
    toast.success("Changes will reflect in a min");
    dispatch(setLoading(false));
  };

  const deleteAdd = async (id) => {
    dispatch(setLoading(true));
    let arr;
    let ind = -1;
    const query = `*[_type == "users" && _id == $userId]{address}`;
    const params = { userId: user[0]._id };
    await client.fetch(query, params).then((res) => (arr = res[0].address));
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._ref === id) {
        ind = i;
        break;
      }
    }
    await client
      .patch(user[0]._id)
      .splice("address", parseInt(ind), 1)
      .commit()
      .then((res) => console.log("success"))
      .catch((err) => console.log(err.message));

    await client.patch(id).unset(["user"]).commit();

    toast.success("Address Deleted Successfully");
    setAddress(address.filter((add) => add._id !== id));

    dispatch(setLoading(false));
  };

  const [open, setOpen] = useState(false);
  const onOpenModal = (add, type) => {
    // console.log(add);
    if (type === "add") {
      setFormData({
        name: "",
        number: "",
        address: "",
        landmark: "",
        pincode: "",
        instructions: "",
        tag: "",
      });
      setNewAdd(true);
    } else {
      setFormData({
        name: add.name,
        number: add.number,
        address: add.address,
        landmark: add.landmark,
        pincode: add.pincode,
        instructions: add.instructions,
        tag: add.tag,
      });
      setNewAdd(false);
      setAddId(add._id);
    }
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);
  return (
    <div className="w-full h-full flex flex-col items-start gap-2">
      {address.map((add, ind) => (
        <div
          key={ind}
          className="border border-[var(--black-color)] w-full rounded-lg px-2 py-1 flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between items-start md:items-center"
        >
          <div>
            <div className="flex gap-2 items-center">
              <div className="font-bold">{add.name}</div>
              <div className="bg-[var(--secondary-color)] text-white rounded-xl px-1 py-0.5 w-fit h-fit text-xs text-center">
                {add.tag}
              </div>
            </div>
            <div>{add.number}</div>
            <div>{add.address}</div>
          </div>
          <div className="pr-2 flex items-center gap-4">
            <button
              onClick={() => onOpenModal(add, "edit")}
              className="text-[var(--secondary-color)]"
            >
              View/Edit
            </button>
            <div className="h-5 w-0.5 bg-gray-500 text-black"></div>
            <button
              onClick={() => deleteAdd(add._id)}
              className="text-red-500 text-lg"
            >
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      ))}
      <div className="pr-2" onClick={() => onOpenModal({}, "add")}>
        <button className="text-[var(--secondary-color)]">Add New +</button>
      </div>
      <Modal open={open} onClose={onCloseModal} center animationDuration={250}>
        <div className="h-text mb-4 font-semibold">
          {newAdd ? "New" : "Update"} Address
        </div>
        <SignUpForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default Address;
