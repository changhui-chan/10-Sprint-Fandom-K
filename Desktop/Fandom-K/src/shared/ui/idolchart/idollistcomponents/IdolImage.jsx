import React from 'react';

const IdolImage = ({ profilePicture, name }) => {
  return <img src={profilePicture} alt={name} className="idolProfile" />;
};

export default IdolImage;
