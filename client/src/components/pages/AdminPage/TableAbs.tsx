import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PostRequest from '../../../network';
import { GetUserDataInfo, GetUserToken } from '../../../toolkit/auth/selectors';
import style from './AdminPage.module.scss';
import EditingMenu from './EditingMenu';
import selectorTegStore from '../../../toolkit/tegs/selectors';
import { useState, useLayoutEffect, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTegsData, getProductData, SetPageCountAction, getUserProductData } from '../../../toolkit/tegs/tegs';
import { CardPropsType } from '../MainPage/ProductCards';
import Spinner from '../../common/Spinner';

type CardType = {
  id: number;
  title: string;
  category: string;
  date: string;
  published: string;
};

type TablePropType = { data: CardType[] };

const TableAds = () =>
  // { data }: TablePropType
  {
    const dispatch = useDispatch();
    // let location = useLocation();
    // const [spinner, setSpinner] = useState(false);

    const token = useSelector(GetUserToken);
    const tegs = useSelector(selectorTegStore.GetUserTegsArray);
    const tegsInStore = useSelector(selectorTegStore.GetTegsArray);
    const countInStore = useSelector(selectorTegStore.GetProductCountOnMaimPage);
    const dataInStore = useSelector(selectorTegStore.GetMainUserProductArray);
    const dataDB = dataInStore.data as CardPropsType[];
    const user = useSelector(GetUserDataInfo);
    const scope = user.scope;
    const admin = scope === 'admin' ? true : false;
    // const countInStore = useSelector(selectorTegStore.GetProductCountOnMaimPage);
    // useEffect(() => console.log(dataInStore), [dataInStore]);
    useEffect(() => {
      if (token) {
        console.log(token);

        dispatch(getTegsData());
        dispatch(getUserProductData({ token, tegs }));
        // dispatch(SetPageCountAction({ count: dataInStore.countProductReq }));
      }
    }, [tegs]);

    const Clicker = (id: string, token: string) => async () => {
      const url = admin ? `/api/admin/product/${id}` : `api/product/${id}`;
      try {
        const delResult = await PostRequest({
          url,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }).catch((e) => {
          console.log('не удалилось');
          message.warning(e.message);
        });
        console.log('delResult --->', delResult);
        dispatch(getUserProductData({ token, tegs }));
        if (delResult && !delResult.e) message.success(delResult.message);
      } catch (e) {
        message.warning('Неведомая беда');
      }
    };

    if (dataDB) {
      const data = dataDB.map((v) => ({
        id: v.uuid,
        title: v.title,
        category: tegsInStore.find((t) => t.id === v.teg)?.teg || 'Все товары',
        date: (v as CardPropsType).createDate?.toString().slice(0, 10) || '',
        published: 'Да',
      }));

      return (
        <div className={style.tableabs}>
          <div className={style.header_tableabs}>
            <div className={style.header_tableabs_1}>Название объявления</div>
            <div className={style.header_tableabs_2}>Категория</div>
            <div className={style.header_tableabs_3}>Дата публикации</div>
            <div className={style.header_tableabs_4}>Публикация</div>
            <div className={style.header_tableabs_5}>{''}</div>
          </div>
          {data.map((i) => (
            <div key={i.id} className={style.card_tableabs}>
              <h3 className={style.header_tableabs_1}>{i.title}</h3>
              <p className={style.header_tableabs_2}>{i.category}</p>
              <p className={style.header_tableabs_3}>{i.date}</p>
              <p className={style.header_tableabs_4}>{i.published}</p>
              {/* <div className={style.header_tableabs_5}> */}
              <EditingMenu id={i.id} Clicker={Clicker} />
              {/* </div> */}
            </div>
          ))}
        </div>
      );
    } else {
      return <Spinner />;
    }
  };

export default TableAds;
export type { TablePropType };
