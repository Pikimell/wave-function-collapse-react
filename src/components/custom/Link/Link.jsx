import { NavLink } from 'react-router-dom';
import style from './Link.module.css';
import { useState } from 'react';

const Link = ({ className = '', children, ...props }) => {
  const getClass = ({ isActive }) => {
    let baseClassName = className + ' ' + style.link;
    baseClassName += isActive ? ` ${style.active}` : '';
    return baseClassName;
  };

  return (
    <NavLink className={getClass} {...props}>
      {children}
    </NavLink>
  );
};

export default Link;
