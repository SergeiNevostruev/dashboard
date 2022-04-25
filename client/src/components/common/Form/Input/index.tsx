import React, { ChangeEvent } from 'react';
import style from './Input.module.scss';

type InputPropsType = {
  title: string;
  id: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type?: 'text' | 'password';
};

const Input = ({ title, id, placeholder, value, setValue, type = 'text' }: InputPropsType) => {
  const handler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <label className={style.wrapper} htmlFor={id}>
      <input id={id} placeholder=" " value={value} onChange={handler} type={type} />
      <span className={style.label}>{placeholder}</span>
    </label>
  );
};

export default Input;
