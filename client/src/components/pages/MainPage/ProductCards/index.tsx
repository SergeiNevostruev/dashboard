import { Link } from 'react-router-dom';
import Eye from '../../../common/Eye';
import style from './ProductCards.module.scss';
import defaultPhoto from '../../../../assets/img/default.jpg';
import { useSelector } from 'react-redux';
import { SetTegsAction } from '../../../../toolkit/tegs/tegs';
import selectorTegStore from '../../../../toolkit/tegs/selectors';

export type CardPropsType = {
  // id: string;
  uuid: string;
  title: string;
  about: string;
  tel?: number;
  photoUrl: string;
  price: number;
  date: string;
  // viewscount: number | string;
  // mapXY?: { x: number; y: number };
  address?: string;
  // tegs: string;
  teg: number;
  views: number;
  createDate?: Date;
};

type DataPropsType = { data: CardPropsType[] };

const Card = ({ uuid, title, about, photoUrl, price, date, views, teg }: CardPropsType) => {
  const tegs = useSelector(selectorTegStore.GetTegsArray);
  return (
    <Link to={`/cardproduct/${uuid}`} className={style.one_product_card}>
      <div className={style.one_product_card}>
        <div className={style.image}>
          <img src={photoUrl} alt="Фото товара" />
          <span className={style.card_tegs}>{tegs[teg - 1].teg}</span>
        </div>
        <div className={style.card_container}>
          <h3 className={style.card_title}>{title}</h3>
          <p className={style.card_about}>{about}</p>
          <p className={style.card_price}>{price} P</p>
          <div className={style.card_bottom}>
            <p>{date}</p>
            <Eye viewscount={views} />
          </div>
        </div>
      </div>
    </Link>
  );
};

const ProductCards = ({ data }: DataPropsType) => {
  // console.log('a');

  return !data ? (
    <svg className={style.spinner} viewBox="0 0 50 50">
      <circle className={style.path} cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>
  ) : (
    <div className={style.product_cards}>
      {data.map((v) => {
        // console.log(JSON.parse(v.photoUrl));

        return (
          <Card
            uuid={v.uuid}
            title={v.title}
            about={v.about}
            photoUrl={JSON.parse(v.photoUrl)[0] || defaultPhoto}
            price={v.price}
            date={v.date}
            views={v.views}
            teg={v.teg}
            key={v.uuid}
          />
        );
      })}
    </div>
  );
};

export default ProductCards;
