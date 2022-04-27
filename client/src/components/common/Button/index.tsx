import React, { ReactChild, useEffect, useState } from 'react';
import style from './Button.module.scss';

type ButtonPropsType = {
  title?: string;
  onClick: () => void;
  type?: 'orange' | 'blue' | 'white-blue' | undefined;
  size?: 'm' | 'l' | 'x' | undefined;
  className?: string;
  changeValue?: boolean;
  changeClass?: string;
  children?: React.ReactNode;
};

const Button = ({
  title,
  onClick,
  type,
  size,
  className,
  changeValue = false,
  changeClass,
  children,
}: ButtonPropsType) => {
  console.log('Button return');
  const [change, SetChange] = useState(changeValue);

  const switchColor = (type: 'orange' | 'blue' | 'white-blue' | undefined) => {
    switch (type) {
      case 'orange':
        return style.orange;
      case 'blue':
        return style.blue;
      case 'white-blue':
        return style.whiteblue;
      default:
        return style.blue;
    }
  };

  const switchSize = (type: 'm' | 'l' | 'x' | undefined) => {
    switch (type) {
      case 'm':
        return style.m;
      case 'l':
        return style.l;
      case 'x':
        return style.x;
      default:
        return style.l;
    }
  };

  const Click = () => {
    onClick();
    SetChange((v) => !v);
    // console.log(change);
    // console.log(changeValue);
  };

  return (
    <button
      className={`${style.wrapper} ${switchColor(type)} ${switchSize(size)} ${
        change && changeClass
      } ${className}`}
      onClick={Click}
      type="button">
      {children}
      {title}
    </button>
  );
};

export default React.memo(Button);
