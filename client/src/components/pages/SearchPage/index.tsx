import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import style from './SearchPage.module.scss';
import { Pagination } from 'antd'; // стили для пангинации из ант библиотеки импортированы в main.css
import { useDispatch } from 'react-redux';
import { getDataSearchProductHeader } from '../../../toolkit/searchHeader/searchHeader';

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

const SearchPage = ({ data, count }: SearchPagePropType) => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const location = useLocation();
  location.pathname = `/cardproduct/`;
  const pageSizeD = 5;
  if (typeof state !== 'string')
    return (
      <div className={style.container}>
        <h1>
          Найдено: {count} <span>по запросу "{state}"</span>
        </h1>
      </div>
    );
  const changePage = (page: number, pageSize: number) => {
    dispatch(getDataSearchProductHeader({ search: state, page, count: pageSize }));
  };
  return (
    <div className={style.container}>
      <h1>
        Найдено: {count} <span>по запросу "{state}"</span>
      </h1>
      {data.map((product) => (
        <div className={style.product} key={product.id}>
          <Link to={location.pathname + product.id}>
            <h3>{product.title}</h3>
          </Link>

          <p>{product.about}</p>
          <span>{product.date}</span>
        </div>
      ))}
      <div className={style.pangination_section}>
        <Pagination pageSize={pageSizeD} total={+count} onChange={changePage} />
      </div>
    </div>
  );
};

export default SearchPage;
export { type OneSearchProduct, type SearchPagePropType };
