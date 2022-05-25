import { useEffect, useState } from 'react';
import Button from '../../../common/Button';
import style from './Tegs.module.scss';

type Teg = {
  id: string;
  name: string;
  change?: boolean;
};

type TegsPropType = {
  tegs: Teg[];
  onClick?: (id: string) => void;
};

const Tegs = ({ tegs, onClick }: TegsPropType) => {
  const tegsToogle = tegs.map((v) => {
    return { ...v, change: false };
  });

  const [tegsStyle, setTegsStyle] = useState(() => tegsToogle);

  const isActive = (id: string) => {
    setTegsStyle((v) => {
      console.log(v);
      const number = v.findIndex((item) => item.id === id);
      v[number].change = !v[number].change;
      return [...v];
    });
  };

  //   useEffect(() => {
  //     console.log('рендер');
  //   }, [...tegsStyle]);

  const handleClick = (id: string) => () => {
    isActive(id);
    console.log(id);
  };

  return (
    <div className={style.tegs}>
      <Button
        title={'Вся доска'}
        onClick={handleClick('1')}
        className={`${style.button} ${style.button_orange}`}
      />
      {tegs.map((v, i) => (
        <Button
          title={v.name}
          onClick={handleClick(v.id)}
          className={`${style.button}`}
          key={v.id}
          changeClass={style.button_active}
          changeValue={tegsStyle[i].change}
        />
      ))}
    </div>
  );
};

export default Tegs;
export { type TegsPropType };
