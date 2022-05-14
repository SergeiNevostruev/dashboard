import style from './UserProfile.module.scss';
import userProfile from '../../../../assets/img/userProfile.svg';
import { useEffect, useRef, useState } from 'react';
import Menu from './Menu';

const UserProfile = () => {
  const [menuOpen, setMenyOpen] = useState(false);
  const menuToogle = () => {
    setMenyOpen((v) => !v);
  };

  // useEffect(() => {
  //   const click = (e: any) => {
  //     setMenyOpen((v) => !v);
  //     // console.log('click');
  //   };
  //   if (menuOpen) {
  //     document.addEventListener('click', click, true);
  //   }
  //   return () => document.removeEventListener('click', click, true);
  // });

  const admin = true; // получаем флаг админ

  return (
    <div className={style.link}>
      <div role="button" onClick={menuToogle} className={style.link}>
        <img src={userProfile} alt="Profile" />
        <span>Профиль</span>
      </div>
      {menuOpen && (
        <>
          <div className={style.background_click} onClick={menuToogle}></div>
          <Menu admin={admin} />
        </>
      )}
    </div>
  );
};

export default UserProfile;
