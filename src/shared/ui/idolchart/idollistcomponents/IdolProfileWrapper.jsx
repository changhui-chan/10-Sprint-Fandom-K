import React from 'react';
import './IdolProfileWrapper.scss';

const IdolProfileWrapper = ({ profilePicture, name }) => {
  return (
    <div className="idolProfileWrapper">
      <img src={profilePicture} alt={name} className="idolProfile" />
    </div>
  );
};

export default IdolProfileWrapper;
