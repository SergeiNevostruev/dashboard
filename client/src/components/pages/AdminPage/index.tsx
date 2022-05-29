import { Link, Navigate, useHref, useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import style from './AdminPage.module.scss';
import { Pagination } from 'antd'; // стили для пангинации из ант библиотеки импортированы в main.css
import { useDispatch, useSelector } from 'react-redux';
import GetUserName from '../../../store/auth/selectors';
import { ClearUserNameAction } from '../../../store/auth/actions';
import { AdsIcon, PlusIcon } from '../../common/Icons';
import Button from '../../common/Button';
import { useEffect } from 'react';
import { Input, Space } from 'antd';
import Filter from './Filter';
import TableAds, { TablePropType } from './TableAbs';
import AdminAllAbs from './AdminAllAbs';
import Abs from './Abs';

const { Search } = Input;

type OneSearchProduct = {
  id: string;
  title: string;
  about: string;
  date: string;
};

type SearchPagePropType = {
  data: OneSearchProduct[];
  count: number;
};

const AdminPage = ({
  admin,
  count,
  data,
}: {
  admin: boolean;
  count: number;
  data: TablePropType;
}) => {
  // const { state } = useLocation();
  // const location = useLocation();
  // location.pathname = `/cardprod
  const param = useParams();
  console.log('params: ', !!param.id);

  const href = useHref('/admin/edit/new');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector(GetUserName);

  // useEffect(() => {
  //   if (!name) navigate('/');
  // }, []);
  const exit = () => {
    // dispatch(ClearUserNameAction());
    navigate('/');
  };

  const onSearch = (value: any) => console.log(value);

  return !name ? (
    <Navigate to={'/'} />
  ) : (
    <div className={style.container}>
      <aside className={style.left_menu}>
        <Link to="/admin" className={`${style.profile} ${style.border}`}>
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
      {!param.id ? <AdminAllAbs count={count} data={data} /> : <Abs id={param.id} />}
    </div>
  );
};

export default AdminPage;
export { type OneSearchProduct, type SearchPagePropType };