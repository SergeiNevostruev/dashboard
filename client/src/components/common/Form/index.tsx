import React from 'react';
import style from './Form.module.scss';

type FormPropsType = {
  title: string;
};

const Form: React.FC<FormPropsType> = ({ title, children }) => (
  <div className={style.form}>
    {/* <h1 className={style.form__title}>{title}</h1> */}
    <form className={style.form__body}>{children}</form>
  </div>
);

export default Form;
