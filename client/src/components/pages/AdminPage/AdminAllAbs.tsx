import { useHref, useNavigate } from 'react-router-dom';
import style from './AdminPage.module.scss';
import { Pagination } from 'antd'; // стили для пангинации из ант библиотеки импортированы в main.css
import { useDispatch, useSelector } from 'react-redux';
import { PlusIcon } from '../../common/Icons';
import Button from '../../common/Button';
import { Input, Space } from 'antd';
import Filter from './Filter';
import TableAds from './TableAbs';
import { getUserProductData, SetDataUserProductPageAction, SetSearchUserProduct } from '../../../toolkit/tegs/tegs';
import { GetUserToken } from '../../../toolkit/auth/selectors';
import selectorTegStore from '../../../toolkit/tegs/selectors';
import Spinner from '../../common/Spinner';

const { Search } = Input;

const AdminAllAbs = ({ countProd }: { countProd: number }) => {
  const href = useHref('/admin/edit/new');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(GetUserToken);
  const tegs = useSelector(selectorTegStore.GetUserTegsArray);
  const dataUserDB = useSelector(selectorTegStore.GetMainUserProductArray);
  const count = dataUserDB.countProductReq;
  const countProductOnPage = dataUserDB.countProductOnPage || 6;
  const onSearch = (value: any) => {
    dispatch(SetSearchUserProduct({ searchProduct: value }));
    if (token) dispatch(getUserProductData({ token, tegs }));
  };

  const changePage: ((page: number, pageSize: number) => void) | undefined = (page, pageSize) => {
    dispatch(SetDataUserProductPageAction({ userdatapage: page }));
    if (token) dispatch(getUserProductData({ token, tegs }));
  };

  return dataUserDB ? (
    <section className={style.main_section}>
      <div className={style.main_section_header}>
        <div>
          <h1 className={style.main_section_title}>Объявления</h1>
          <p className={style.sub_text}>Всего: {count}</p>
        </div>
        <Button
          onClick={() => {
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
          <Pagination onChange={changePage} simple size="small" total={countProd + 1} pageSize={countProductOnPage} />
        </div>
      </div>
      <TableAds
      // data={data.data}
      />
    </section>
  ) : (
    <Spinner />
  );
};

export default AdminAllAbs;
