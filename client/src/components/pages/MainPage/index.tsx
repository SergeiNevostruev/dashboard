import Tegs from './Tegs';
import TopBlock from './TopBlock';
import style from './MainPage.module.scss';
import ProductCards, { CardPropsType } from './ProductCards';
import Button from '../../common/Button';
import testcard from '../../../assets/img/test_card.jpg';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import selectorTegStore from '../../../toolkit/tegs/selectors';
import { TegType } from '../../../toolkit/tegs/types';
import { getProductData, getTegsData, SetPageCountAction, SetTegsAction } from '../../../toolkit/tegs/tegs';
import { useLocation } from 'react-router-dom';
import Spinner from '../../common/Spinner';

const data = [
  {
    id: '1',
    title: 'Продукт',
    about: 'Продукт',
    photourl: testcard,
    price: '1000',
    date: '12 сентября 2020',
    viewscount: '1',
    tegs: 'Аксессуары',
  },
  {
    id: '2',
    title: 'Продукт',
    about: 'Продукт',
    photourl: testcard,
    price: '1000',
    date: '12 сентября 2020',
    viewscount: '1',
    tegs: 'Аксессуары',
  },
  {
    id: '3',
    title: 'Продукт',
    about: 'Продукт',
    photourl: testcard,
    price: '1000',
    date: '12 сентября 2020',
    viewscount: '1',
    tegs: 'Аксессуары',
  },
  {
    id: '4',
    title: 'Продукт',
    about: 'Продукт',
    photourl: testcard,
    price: '1000',
    date: '12 сентября 2020',
    viewscount: '1',
    tegs: 'Аксессуары',
  },
  {
    id: '5',
    title: 'Продукт',
    about: 'Продукт',
    photourl: testcard,
    price: '1000',
    date: '12 сентября 2020',
    viewscount: '1',
    tegs: 'Аксессуары',
  },
  {
    id: '6',
    title: 'Продукт',
    about: 'Продукт',
    photourl: testcard,
    price: '1000',
    date: '12 сентября 2020',
    viewscount: '1',
    tegs: 'Аксессуары',
  },
  {
    id: '7',
    title: 'Продукт',
    about: 'Продукт',
    photourl: testcard,
    price: '1000',
    date: '12 сентября 2020',
    viewscount: '1',
    tegs: 'Аксессуары',
  },
];

const MainPage = () => {
  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();
  const tegsInStore = useSelector(selectorTegStore.GetTegsArray);
  const dataInStore = useSelector(selectorTegStore.GetMainProductArray);
  const countInStore = useSelector(selectorTegStore.GetProductCountOnMaimPage);
  const defaultCount = 6;

  useLayoutEffect(() => {
    if (tegsInStore) {
      dispatch(getTegsData());
      dispatch(getProductData());
      dispatch(SetPageCountAction({ count: defaultCount }));
    }
  }, []);

  let location = useLocation();

  useEffect(() => {
    dispatch(SetPageCountAction({ count: defaultCount }));
    dispatch(getProductData());
  }, [location]);

  const dataDB = dataInStore.data as CardPropsType[];
  if (!dataDB) return <Spinner />;

  const handleClick = () => {
    setSpinner(true);
    setTimeout(() => setSpinner(false), 3000);
    dispatch(SetPageCountAction({ count: countInStore + defaultCount }));
    dispatch(getProductData());
  };

  const clickButton = (id: TegType['id'] | 'all') => {
    if (tegsInStore) {
      if (id !== 'all') {
        const tegsChange = {
          tegs: tegsInStore.map((v) => (v.id === +id ? { id: v.id, teg: v.teg, change: !v.change } : v)),
        };
        dispatch(SetTegsAction(tegsChange));
        dispatch(getProductData());
      } else {
        const tegsChange = {
          tegs: tegsInStore.map((v) => ({ id: v.id, teg: v.teg, change: false })),
        };
        dispatch(SetTegsAction(tegsChange));
        dispatch(getProductData());
      }
    }
    dispatch(SetPageCountAction({ count: defaultCount }));
    dispatch(getProductData());
  };

  return (
    <>
      <TopBlock />
      <div className={style.tegs_block}>
        {spinner && (
          <svg className={style.spinner} viewBox="0 0 50 50">
            <circle className={style.path} cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
          </svg>
        )}
        <Tegs tegs={tegsInStore} onClick={clickButton} />
        <h2 className={style.tegs_block_title}>Вся лента</h2>
        <ProductCards data={dataDB} />
        <div className={style.tegs_block_button_center}>
          <Button onClick={handleClick} className={style.tegs_block_button}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.3333 0.666656L13.9999 3.33332L11.3333 5.99999"
                stroke="#4877F2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 7.33334V6.00001C2 5.29277 2.28095 4.61449 2.78105 4.11439C3.28115 3.61429 3.95942 3.33334 4.66667 3.33334H14"
                stroke="#4877F2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.66667 15.3333L2 12.6667L4.66667 10"
                stroke="#4877F2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 8.66666V9.99999C14 10.7072 13.719 11.3855 13.219 11.8856C12.7189 12.3857 12.0406 12.6667 11.3333 12.6667H2"
                stroke="#4877F2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Загрузить ещё</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default MainPage;
