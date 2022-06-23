import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import { CardPropsType } from '../../components/pages/MainPage/ProductCards';
import SearchPage from '../../components/pages/SearchPage';
import { ClearSearchProductHeaderAction } from '../../toolkit/searchHeader/searchHeader';
import { GetSearchHeaderData, GetSearchHeaderLoadind } from '../../toolkit/searchHeader/selectors';
import fakeData from './fakedata';

const SearchContainer = () => {
  const data = useSelector(GetSearchHeaderData);
  const { state } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!state) dispatch(ClearSearchProductHeaderAction());
  }, [state]);

  if (data) {
    const countProduct: number = data.countProductReq;
    const dataAdapter = (data.data as CardPropsType[]).map((v) => ({
      id: v.uuid,
      title: v.title,
      about: v.about,
      date: v.createDate?.toString().slice(0, 10) || '',
    }));
    console.log(data);

    return <SearchPage data={dataAdapter} count={countProduct} />;
  }
  return <Spinner />;
};

export default SearchContainer;
