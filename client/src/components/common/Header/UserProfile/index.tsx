import style from './UserProfile.module.scss';
import userProfile from '../../../../assets/img/userProfile.svg';
import { useState } from 'react';
import Menu from './Menu';

const UserProfile = () => {
  const [menuOpen, setMenyOpen] = useState(false);
  const menuToogle = () => {
    setMenyOpen((v) => !v);
  };
  const admin = true; // получаем флаг админ

  return (
    <div className={style.link}>
      <div role="button" onClick={menuToogle} className={style.link}>
        <img src={userProfile} alt="Profile" />
        <span>Профиль</span>
      </div>
      {menuOpen && <Menu admin={admin} />}
    </div>
  );
};

export default UserProfile;
