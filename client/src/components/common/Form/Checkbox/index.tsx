import style from './Checkbox.module.scss';
import React, { ChangeEvent } from 'react';

type CheckboxPropType = {
  id?: string;
  name?: string;
  className?: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
};

const Checkbox: React.FC<CheckboxPropType> = ({
  children,
  className,
  value,
  setValue,
  id = 'checkbox',
  name = 'checkbox',
}) => {
  const handler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked);
  };
  return (
    <div className={className}>
      <input
        type="checkbox"
        className={style.custom}
        id={id}
        name={name}
        checked={value}
        onChange={handler}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export default Checkbox;
