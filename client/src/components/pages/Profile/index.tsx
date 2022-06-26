import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { GetUserDataInfo } from '../../../toolkit/auth/selectors';
import style from './Profile.module.scss';

const Profile = () => {
  const user: any = useSelector(GetUserDataInfo);
  const navigate = useNavigate();
  const scope = user.scope;
  const admin = scope === 'admin' ? true : false;
  if (user) navigate('/');

  return !admin ? (
    <div className={style.page}>
      <div>
        <h1>Привет{', ' + (user.firstName + ' ' + user.lastName)}!</h1>
        <p>
          Смотри свои объявления в разделе <Link to="/admin">"Мои объявления"</Link>{' '}
        </p>
      </div>
    </div>
  ) : (
    <div className={style.page}>
      <div>
        <h1>Здраствуй владыка сайта{', ' + (user.firstName + ' ' + user.lastName)}!</h1>
        <p>
          Смотри сколько новых объявлений <Link to="/admin">"Мои объявления"</Link>{' '}
        </p>
        <p>Давай удалим их!</p>
      </div>
    </div>
  );
};

export default Profile;
