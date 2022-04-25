import React from 'react';
import Logo from '../Logo';
import style from './Footer.module.scss';
import SocialIcons from './SocialIcons';

const Footer = () => (
  <footer className={style.footer}>
    <div className={`${style.footer} ${style.container}`}>
      <div className={style.logo}>
        <Logo />
        <div className={style.border}></div>
        <p>Доска объявлений</p>
      </div>
      <p>© ООО «Доска диджитал», 2022</p>
      <SocialIcons />
    </div>
  </footer>
);

export default Footer;
