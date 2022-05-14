import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import style from './SearchPage.module.scss';
import { Pagination } from 'antd'; // стили для пангинации из ант библиотеки импортированы в main.css

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
  const { state } = useLocation();
  const location = useLocation();
  location.pathname = `/cardproduct/`;
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
        <Pagination
          defaultCurrent={1}
          defaultPageSize={6}
          total={+count}
          onChange={(page, pageSize) => console.log(`page: ${page}, pageSize: ${pageSize}`)}
        />
      </div>
    </div>
  );
};

export default SearchPage;
export { type OneSearchProduct, type SearchPagePropType };
