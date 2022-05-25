import { Link, Navigate, useHref, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import style from './AdminPage.module.scss';
import { Pagination } from 'antd'; // стили для пангинации из ант библиотеки импортированы в main.css
import { useDispatch, useSelector } from 'react-redux';
import GetUserName from '../../../store/auth/selectors';
import { ClearUserNameAction } from '../../../store/auth/actions';
import { AdsIcon, BackIcon, PlusIcon } from '../../common/Icons';
import Button from '../../common/Button';
import { useEffect } from 'react';
import { Input, Space } from 'antd';
import Filter from './Filter';
import TableAds, { TablePropType } from './TableAbs';
import AbsForm from './AbsForm';

const { Search } = Input;

type AbsPropType = {
  id: string;
  title?: string;
};

const Abs = ({ id, title }: AbsPropType) =>
  // { count, data }: { count: number; data: TablePropType }
  {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
      <section className={style.main_section}>
        <div className={style.back_button} role="button" onClick={() => navigate(-1)}>
          <BackIcon />
          <span>Вернуться назад</span>
        </div>
        {/* {id === 'new' ? <h1>Новое объявление</h1> : <h1>Объявление №{id}</h1>} */}
        <AbsForm title={title || 'Новое объявление'} />
      </section>
    );
  };

export default Abs;
