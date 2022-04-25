import { Link } from 'react-router-dom';
import style from './UserInput.module.scss';
import userProfile from '../../../../assets/img/userProfile.svg';

const UserInput = () => (
  <Link to="/auth" className={style.link}>
    <img src={userProfile} alt="Profile" />
    <span>Войти</span>
  </Link>
);

export default UserInput;
