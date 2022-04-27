import { Link } from 'react-router-dom';
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
          <p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                stroke="#2C2D2E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                stroke="#2C2D2E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{viewscount}</span>
          </p>
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
