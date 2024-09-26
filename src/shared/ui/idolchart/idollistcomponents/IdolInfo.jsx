import React from 'react';
import './IdolInfo.scss';

const IdolInfo = ({ rank, name, group }) => {
  return (
    <div className="idolInfo">
      <div className="idolRank">{rank}</div>
      <div className="idolGroup">{group}</div>
      <div className="idolName">{name}</div>
    </div>
  );
};

export default IdolInfo;
