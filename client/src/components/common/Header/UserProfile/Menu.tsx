import { Link } from 'react-router-dom';
import style from './UserProfile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import GetUserName from '../../../../store/auth/selectors';
import { ClearUserNameAction } from '../../../../store/auth/actions';

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
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.66669 2.5H6.66669C7.55074 2.5 8.39859 2.85119 9.02371 3.47631C9.64883 4.10143 10 4.94928 10 5.83333V17.5C10 16.837 9.73663 16.2011 9.26779 15.7322C8.79895 15.2634 8.16306 15 7.50002 15H1.66669V2.5Z"
            stroke="#2C2D2E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.3333 2.5H13.3333C12.4493 2.5 11.6014 2.85119 10.9763 3.47631C10.3512 4.10143 10 4.94928 10 5.83333V17.5C10 16.837 10.2634 16.2011 10.7322 15.7322C11.2011 15.2634 11.837 15 12.5 15H18.3333V2.5Z"
            stroke="#2C2D2E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>Мои объявления</p>
      </Link>
      {admin && (
        <Link to="/admin" className={`${style.profile} ${style.border}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.33333 2.5H2.5V8.33333H8.33333V2.5Z"
              stroke="#2A2F37"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.5001 2.5H11.6667V8.33333H17.5001V2.5Z"
              stroke="#2A2F37"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.5001 11.667H11.6667V17.5003H17.5001V11.667Z"
              stroke="#2A2F37"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.33333 11.667H2.5V17.5003H8.33333V11.667Z"
              stroke="#2A2F37"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>Админ Панель</p>
        </Link>
      )}
      <div className={style.profile} onClick={() => dispatch(ClearUserNameAction())}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 10.8333V15.8333C15 16.2754 14.8244 16.6993 14.5118 17.0118C14.1993 17.3244 13.7754 17.5 13.3333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V6.66667C2.5 6.22464 2.67559 5.80072 2.98816 5.48816C3.30072 5.17559 3.72464 5 4.16667 5H9.16667"
            stroke="#2C2D2E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.5 2.5H17.5V7.5"
            stroke="#2C2D2E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.33331 11.6667L17.5 2.5"
            stroke="#2C2D2E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>Выход</p>
      </div>
    </div>
  );
};

export default Menu;