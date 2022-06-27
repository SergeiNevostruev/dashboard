import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import style from './AdminPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import GetUserName from '../../../toolkit/auth/selectors';
import { ClearUserNameAction } from '../../../toolkit/auth/auth';
import { AdsIcon } from '../../common/Icons';
import { useLayoutEffect, useState } from 'react';
import AdminAllAbs from './AdminAllAbs';
import Abs from './Abs';
import selectorTegStore from '../../../toolkit/tegs/selectors';
import { GetUserToken } from '../../../toolkit/auth/selectors';
import { getTegsData, getUserProductData } from '../../../toolkit/tegs/tegs';

const AdminPage = () => {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector(GetUserName);
  const dataUserDB = useSelector(selectorTegStore.GetMainUserProductArray);
  const count = dataUserDB.countProductReq;
  const token = useSelector(GetUserToken);
  const tegs = useSelector(selectorTegStore.GetUserTegsArray);
  const [countProd, SetCountProd] = useState(0);

  const exit = () => {
    dispatch(ClearUserNameAction());
    navigate('/');
  };

  useLayoutEffect(() => {
    if (token) {
      dispatch(getTegsData());
      dispatch(getUserProductData({ token, tegs }));
      SetCountProd(count);
    }
  }, [count]);

  return !name ? (
    <Navigate to={'/'} />
  ) : (
    <div className={style.container}>
      <aside className={style.left_menu}>
        <Link to="/profile" className={`${style.profile} ${style.border}`}>
          <div className={style.icon}>
            <h2>{name[0].toUpperCase()}</h2>
          </div>
          <div>
            <p>{name}</p>
            <p className={style.sub_text}>Админ-меню</p>
          </div>
        </Link>
        <Link to="/admin" className={`${style.profile} ${style.border}`}>
          <AdsIcon />
          <p>Объявления</p>
        </Link>
        <div className={style.profile} onClick={exit}>
          <p>Выход</p>
        </div>
      </aside>
      {!param.id ? <AdminAllAbs countProd={countProd} /> : <Abs id={param.id} />}
    </div>
  );
};

export default AdminPage;
