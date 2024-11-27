import clsx from 'clsx';
import style from './Button.module.css';
import { useState } from 'react';

const Button = ({
  className,
  children,
  primary = false,
  disabled = false,
  ...props
}) => {
  const resultClass = clsx(
    style.button,
    className,
    primary && style.primary,
    disabled && style.disabled,
  );

  return (
    <button className={resultClass} {...props} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
