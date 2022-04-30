import { Link, useLocation } from 'react-router-dom';
import style from './ProductViewPage.module.scss';

type RecProductPropsType = {
  searchProduct: {
    id: string;
    linkImg: string;
    name: string;
    firm: string;
  };
  className?: string;
};

const RecProduct = ({ searchProduct, className }: RecProductPropsType) => {
  const location = useLocation();
  location.pathname = `/cardproduct/${searchProduct.id}`;
  // console.log(location);

  return (
    <Link to={location.pathname} className={`${className} ${style.rec_product}`}>
      <img src={searchProduct.linkImg} alt={searchProduct.name} />
      <p>{searchProduct.name}</p>
      <h4>{searchProduct.firm}</h4>
    </Link>
  );
};

export type { RecProductPropsType };

export default RecProduct;
