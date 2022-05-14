import { FilterIcon } from '../../common/Icons';
import style from './AdminPage.module.scss';

const Filter = () => (
  <div className={style.filter} onClick={() => console.log('фильтр')} role="button">
    <span>Фильтровать </span>
    <FilterIcon />
  </div>
);

export default Filter;
