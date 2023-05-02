import React, { useEffect, useState } from "react";
import MotionWrap from "../../wrapper/MotionWrap";

const Serving = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const height = width < 640 ? 480 : 650;
  return (
    <div className="app__flex mt-32 flex-col gap-8 ">
      <h2 className="head-text mb-4">
        Currently <span>Serving</span>
      </h2>
      <div className="w-full overflow-hidden">
        <iframe
          title="gMaps"
          src="https://www.google.com/maps/d/u/0/embed?mid=19kkeX5tHnoNqDZFVB1i3MmxQ8hIIlok&ehbc=2E312F"
          width={width / 1.2}
          height={height}
          frameborder="0"
          style={{
            border: "2px solid var(--secondary-color)",
            marginTop: "-150px",
            padding: "4px",
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default MotionWrap(Serving, "app__serving");
