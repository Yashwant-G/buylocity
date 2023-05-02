import React, { useEffect, useState } from 'react'
import MotionWrap from '../../wrapper/MotionWrap';

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
    <div className='app__flex mt-32 flex-col gap-8'>
        <h2 className="head-text">
            Currently <span>Serving</span>
        </h2>
        <iframe
            title="gMaps"
            src="https://www.google.com/maps/d/u/0/embed?mid=19kkeX5tHnoNqDZFVB1i3MmxQ8hIIlok&ehbc=2E312F"
            width={width/1.2}
            height={height}
          ></iframe>
    </div>
  )
}

export default MotionWrap(Serving, "app__serving");