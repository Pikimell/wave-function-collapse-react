import { useNavigate } from 'react-router-dom';
import style from './Logo.module.css';
import React, { useState } from 'react';
import { GiRollingEnergy } from 'react-icons/gi';

const Logo = ({}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <div onClick={handleClick} className={style.logo}>
      <GiRollingEnergy className={style.icon} />
      <h1>MapGenerator</h1>
    </div>
  );
};

export default Logo;
