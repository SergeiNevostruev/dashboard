import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import PostRequest from '../../../network';
import { CardPropsType } from '../MainPage/ProductCards';
import style from './ProductViewPage.module.scss';
import defaultPhoto from './../../../assets/img/default.png';

type RecProductPropsType = {
  searchProduct: string;
  // {
  //   id: string;
  //   linkImg: string;
  //   name: string;
  //   firm: string;
  // };
  className?: string;
};

const RecProduct = ({ searchProduct, className }: RecProductPropsType) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, SetData] = useState({});

  location.pathname = `/cardproduct/${searchProduct}`;
  useEffect(() => {
    if (searchProduct) {
      const getData = async () => {
        location.pathname = '';
        const dataDB: CardPropsType = await PostRequest({ url: `/api/product/${searchProduct}`, method: 'GET' });
        return dataDB;
      };
      getData()
        .then((d) => {
          SetData(d);
        })
        .catch();
    }
  }, [searchProduct]);

  if (data) {
    let foto = defaultPhoto;

    if (!!(data as CardPropsType).photoUrl && (data as CardPropsType).photoUrl !== '[]') {
      foto = `${process.env.PUBLIC_URL}/${JSON.parse((data as CardPropsType).photoUrl)[0]}`;
      console.log(!![]);
    }
    const searchProductDB = {
      id: (data as CardPropsType).uuid,
      linkImg: foto,
      name: (data as CardPropsType).title,
      firm: (data as CardPropsType).price,
    };
    return (
      <Link
        to={`${process.env.PUBLIC_URL}/cardproduct/${searchProduct}`}
        className={`${className} ${style.rec_product}`}>
        <img src={searchProductDB.linkImg} alt={searchProductDB.name} />
        <p>{searchProductDB.firm}P</p>
        <h4>{searchProductDB.name}</h4>
      </Link>
    );
  } else {
    return <div className={`${className} ${style.rec_product}`}></div>;
  }
};

export type { RecProductPropsType };

export default RecProduct;
