import React,{useState,useEffect} from "react";

const OrderNow = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const height = width < 650 ? 700 : 450;
  const width1=width < 650 ? 300 : 700;

  return (
    <div className="app__flex flex-col gap-8 w-full h-full">
      <div className="mt-28 h-text">Please fill up this Order Form</div>
      <div className=" border-black border-2 rounded-xl p-4 mb-8">
        <iframe
          title="gForm"
          src="https://docs.google.com/forms/d/e/1FAIpQLSedDAMzrU0n-pSiTTGYLR2yrypYPq6u1leZikkHzM-nfRDBCA/viewform?embedded=true"
          width={width1}
          height={height}
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
};

export default OrderNow;
