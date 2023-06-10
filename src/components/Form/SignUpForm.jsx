import React from "react";

const SignUpForm = ({ formData,setFormData, handleSubmit }) => {
  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <div>
      <div className="lg:col-span-2 text-[var(--black-color)]">
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 gap-y-4 text-sm grid-cols-1 md:grid-cols-5"
        >
          <div className="md:col-span-5">
            <label htmlFor="full_name">Full Name</label>
            <input
              type="text"
              required
              placeholder="Your Name"
              name="name"
              id="full_name"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              onChange={changeHandler}
              value={formData.name}
            />
          </div>

          <div className="md:col-span-5">
            <label htmlFor="number">Phone No.</label>
            <input
              placeholder="99XXXXXXXX"
              required
              type="number"
              name="number"
              id="number"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              onChange={changeHandler}
              value={formData.number}
            />
          </div>

          <div className="md:col-span-5">
            <label htmlFor="address">Full Address</label>
            <textarea
              onChange={changeHandler}
              required
              name="address"
              id="address"
              placeholder="HouseNo, Apartments, Area"
              className="border mt-1 rounded p-4 w-full bg-gray-50"
              value={formData.address}
            />
          </div>

          <div className="md:col-span-5">
            <label htmlFor="landmark">Landmark (Opt)</label>
            <input
              onChange={changeHandler}
              placeholder="Near ___"
              type="text"
              name="landmark"
              id="landmark"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              value={formData.landmark}
            />
          </div>

          <div className="md:col-span-5">
            <label htmlFor="pincode">Pincode</label>
            <input
              onChange={changeHandler}
              placeholder="XX00XX"
              required
              type="number"
              name="pincode"
              id="pincode"
              className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              value={formData.pincode}
            />
          </div>

          <div className="md:col-span-5">
            <label htmlFor="instructions">
              Any Delivery Instructions (Opt)
            </label>
            <input
              onChange={changeHandler}
              placeholder="Don't Ring the Bell"
              type="text"
              name="instructions"
              id="instructions"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              value={formData.instructions}
            />
          </div>

          <div className="md:col-span-3">
            <label htmlFor="tag">Tag</label>
            <input
              onChange={changeHandler}
              placeholder="Home/Office/Others"
              type="text"
              required
              name="tag"
              id="tag"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              value={formData.tag}
            />
          </div>

          <div className="md:col-span-5 text-left">
            <div className="inline-flex items-end">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
