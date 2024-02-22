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
          <span tkey='status1'>To be prepared</span>
        </div>
        <div className={`step ${current === 2 && 'current'}`}>
          <span tkey='status2'>Sent to logistics</span>
        </div>
        <div className={`step ${current === 3 && 'current'}`}>
          <span tkey='status3'>In preparation</span>
        </div>
        <div className={`step ${current === 4 && 'current'}`}>
          <span tkey='status4'>Shipped</span>
        </div>
        <div className={`step ${current === 5 && 'current'}`}>
          <span tkey='status5'>Delivered</span>
        </div>
      </div>

      <div className={`line ${width}`}></div>
    </div>
  );
};

export default Timeline;
