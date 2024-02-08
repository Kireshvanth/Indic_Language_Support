import React, { useEffect, useState } from 'react';
import '../index.css';

const Timeline = ({ current }) => {
  const [width, setWidth] = useState('w-[0%]');

  useEffect(() => {
    const w = (current - 1) * 25;
    console.log(w);
    setWidth(`w-[${w}%]`);
  }, [current]);

  return (
    <div className="horizontal timeline">
      <div className="steps">
        <div className={`step ${current === 1 && 'current'}`}>
          <span>To be prepared</span>
        </div>
        <div className={`step ${current === 2 && 'current'}`}>
          <span>Sent to logistics</span>
        </div>
        <div className={`step ${current === 3 && 'current'}`}>
          <span>In preparation</span>
        </div>
        <div className={`step ${current === 4 && 'current'}`}>
          <span>Shipped</span>
        </div>
        <div className={`step ${current === 5 && 'current'}`}>
          <span>Delivered</span>
        </div>
      </div>

      <div className={`line ${width}`}></div>
    </div>
  );
};

export default Timeline;
