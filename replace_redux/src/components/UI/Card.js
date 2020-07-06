import React from 'react';

import './Card.css';

const Card = ({ style, children }) => {
  return (
    <div className="card" style={style}>
      {children}
    </div>
  );
};

export default Card;
