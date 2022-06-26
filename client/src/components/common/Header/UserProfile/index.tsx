import style from './UserProfile.module.scss';
import userProfile from '../../../../assets/img/userProfile.svg';
import { useEffect, useRef, useState } from 'react';
import Menu from './Menu';
import { useSelector } from 'react-redux';
import { GetUserDataInfo } from '../../../../toolkit/auth/selectors';

const UserProfile = () => {
  const [menuOpen, setMenyOpen] = useState(false);
  const menuToogle = () => {
    setMenyOpen((v) => !v);
  };
  const user = useSelector(GetUserDataInfo);
  const scope = user.scope;
  const admin = scope === 'admin' ? true : false; // получаем флаг админ

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
