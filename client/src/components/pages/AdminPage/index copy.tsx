import { Link, Navigate, useHref, useNavigate } from 'react-router-dom';
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
      <section className={style.main_section}>
        <div className={style.main_section_header}>
          <div>
            <h1 className={style.main_section_title}>Объявления</h1>
            <p className={style.sub_text}>Всего: {count}</p>
          </div>
          <Button
            onClick={() => {
              console.log('добавить объявление');
              navigate(href);
            }}
            size="m"
            className={style.main_section_button}>
            <span>Добавить </span>
            <PlusIcon />
          </Button>
        </div>
        <div className={style.main_section_search_panel}>
          <div className={style.main_section_search_panel_filter}>
            <Space direction="vertical" className={style.main_section_search}>
              <Search
                placeholder="Найти объявление"
                allowClear
                onSearch={onSearch}
                style={{ maxWidth: 415, width: '100%', height: '40px' }}
              />
            </Space>
            <Filter />
          </div>
          <div className={style.main_section_search_panel_pang}>
            <Pagination simple size="small" total={50} />
          </div>
        </div>
        <TableAds data={data.data} />
      </section>
    </div>
  );
};

export default AdminPage;
export { type OneSearchProduct, type SearchPagePropType };
