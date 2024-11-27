import clsx from 'clsx';
import style from './Input.module.css';
import { useId, useState } from 'react';

const Input = ({ className, disabled = false, label, ...props }) => {
  const inputId = useId();

  const resultClass = clsx(style.input, className, disabled && style.disabled);

  return (
    <div className={resultClass}>
      <label className={style.label} htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={style.value}
        {...props}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
