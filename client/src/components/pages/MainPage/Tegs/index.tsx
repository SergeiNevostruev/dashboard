import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TegsReducerType, TegType } from '../../../../toolkit/tegs/types';
import Button from '../../../common/Button';
import style from './Tegs.module.scss';

type TegsPropType = {
  tegs: TegsReducerType;
  // tegs: Teg[];
  onClick?: any;
};

const Tegs = ({ tegs, onClick }: TegsPropType) => {
  const handleClick = (id: TegType['id'] | 'all') => () => {
    onClick(id);
  };

  return (
    <div className={style.tegs}>
      <Button title={'Вся доска'} onClick={handleClick('all')} className={`${style.button} ${style.button_orange}`} />
      {tegs.map((v, i) => (
        <Button
          title={v.teg}
          onClick={handleClick(v.id)}
          className={!!v.change ? `${style.button_active} ${style.button}` : `${style.button}`}
          key={v.id}
        />
      ))}
    </div>
  );
};

export default Tegs;
export { type TegsPropType };
