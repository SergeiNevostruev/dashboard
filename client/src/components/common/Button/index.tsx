import React from 'react';
import style from './Button.module.scss';

type ButtonPropsType = {
  title: string;
  onClick: () => void;
  type?: 'orange' | 'blue' | 'white-blue' | undefined;
  size?: 'm' | 'l' | 'x' | undefined;
};

const Button = ({ title, onClick, type, size }: ButtonPropsType) => {
  console.log('Button return');
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

  return (
    <button
      className={`${style.wrapper} ${switchColor(type)} ${switchSize(size)}`}
      onClick={onClick}
      type="button">
      {title}
    </button>
  );
};

export default React.memo(Button);
