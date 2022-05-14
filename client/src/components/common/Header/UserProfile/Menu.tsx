import { Link } from 'react-router-dom';
import style from './UserProfile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import GetUserName from '../../../../store/auth/selectors';
import { ClearUserNameAction } from '../../../../store/auth/actions';
import { AdminPanelIcon, AdsIcon, ExitlIcon } from '../../Icons';

const Menu = ({ admin }: { admin: boolean }) => {
  const dispatch = useDispatch();
  const name = useSelector(GetUserName);

  return (
    <div className={style.menu}>
      <Link to="/profile" className={`${style.profile} ${style.border}`}>
        <div className={style.icon}>
          <h2>{name[0].toUpperCase()}</h2>
        </div>
        <p>{name}</p>
      </Link>
      <Link to="/ads" className={`${style.profile} ${style.border}`}>
        <AdsIcon />
        <p>Мои объявления</p>
      </Link>
      {admin && (
        <Link to="/admin" className={`${style.profile} ${style.border}`}>
          <AdminPanelIcon />
          <p>Админ Панель</p>
        </Link>
      )}
      <div className={style.profile} onClick={() => dispatch(ClearUserNameAction())}>
        <ExitlIcon />
        <p>Выход</p>
      </div>
    </div>
  );
};

export default Menu;
