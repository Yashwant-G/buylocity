import React,{useState,useEffect} from "react";
import MotionWrap from "../../wrapper/MotionWrap";

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
  const width1=width < 650 ? 350 : 700;

  return (
    <div className="app__flex flex-col gap-8 w-full h-full">
      <div className="mt-28 h-text">Please fill up this Order Form</div>
      <div className=" border-[var(--black-color)] border-2 rounded-xl p-1 py-4 lg:pb-5 mb-8">
        <iframe
          title="gForm"
          src="https://docs.google.com/forms/d/e/1FAIpQLSdjlCzTpoHIlV-op00vN2WlTO72Z91fmLSFPVVr84WU-Qu76Q/viewform?embedded=true"
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

export default MotionWrap(OrderNow, "app__serving");
