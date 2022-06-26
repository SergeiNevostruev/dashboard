import { FilterIcon } from '../../common/Icons';
import style from './AdminPage.module.scss';
import { Checkbox, Col, Row } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { useLayoutEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTegsData, getUserProductData, SetTegsAction, SetTegsUserAction } from '../../../toolkit/tegs/tegs';
import selectorTegStore from '../../../toolkit/tegs/selectors';
import { GetUserToken } from '../../../toolkit/auth/selectors';

const Filter = () => {
  const tegsInStore = useSelector(selectorTegStore.GetTegsArray);
  const [chackTegs, SetCheckTegs] = useState(0);
  const dispatch = useDispatch();
  const token = useSelector(GetUserToken);
  const tegs = useSelector(selectorTegStore.GetUserTegsArray);
  useLayoutEffect(() => {
    if (tegsInStore) {
      dispatch(getTegsData());
    }
  }, []);
  const onChange = (checkedValues: CheckboxValueType[]) => {
    // console.log('checked = ', checkedValues);
    dispatch(SetTegsUserAction({ usertegs: String(checkedValues) }));
    // if (token) dispatch(getUserProductData({ token, tegs }));
    SetCheckTegs(checkedValues.length);
    console.log(checkedValues);
  };

  return (
    <div className={style.filter} onClick={() => console.log('фильтр')} role="button">
      {!chackTegs ? <span className={style.filtertitle}>Фильтровать </span> : <span>Выбрано {chackTegs}</span>}
      <FilterIcon />
      <div className={style.checkbox}>
        <h5>Категории</h5>
        <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
          <Row>
            {tegsInStore.map((v, i) => {
              return (
                <Col span={8} key={v.id}>
                  <Checkbox value={v.id}>{v.teg}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
      </div>
    </div>
  );
};

export default Filter;
