import { Link } from 'react-router-dom';
import Eye from '../../../common/Eye';
import style from './ProductCards.module.scss';

type CardPropsType = {
  id: string;
  title: string;
  about: string;
  photourl?: string;
  price: number | string;
  date: string;
  viewscount: number | string;
  tegs: string;
};

type DataPropsType = { data: CardPropsType[] };

const Card = ({ id, title, about, photourl, price, date, viewscount, tegs }: CardPropsType) => (
  <Link to={`/cardproduct/${id}`} className={style.one_product_card}>
    <div className={style.one_product_card}>
      <div className={style.image}>
        <img src={photourl} alt="Фото товара" />
        <span className={style.card_tegs}>{tegs}</span>
      </div>
      <div className={style.card_container}>
        <h3 className={style.card_title}>{title}</h3>
        <p className={style.card_about}>{about}</p>
        <p className={style.card_price}>{price} P</p>
        <div className={style.card_bottom}>
          <p>{date}</p>
          <Eye viewscount={viewscount} />
        </div>
      </div>
    </div>
  </Link>
);

const ProductCards = ({ data }: DataPropsType) => {
  // console.log('a');

  return (
    <div className={style.product_cards}>
      {data.map((v) => {
        return (
          <Card
            id={v.id}
            title={v.title}
            about={v.about}
            photourl={v.photourl}
            price={v.price}
            date={v.date}
            viewscount={v.viewscount}
            tegs={v.tegs}
            key={v.id}
          />
        );
      })}
    </div>
  );
};

export default ProductCards;
