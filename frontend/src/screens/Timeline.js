import React from 'react';
import '../index.css';

const Timeline = () => {
  return (
    <div className="horizontal timeline">
      <div className="steps">
        <div className="step">
          <span>To be prepared</span>
        </div>
        <div className="step">
          <span>Sent to logistics</span>
        </div>
        <div className="step current">
          <span>In preparation</span>
        </div>
        <div className="step">
          <span>Shipped</span>
        </div>
        <div className="step">
          <span>Delivered</span>
        </div>
      </div>

      <div className="line"></div>
    </div>
  );
};

export default Timeline;
