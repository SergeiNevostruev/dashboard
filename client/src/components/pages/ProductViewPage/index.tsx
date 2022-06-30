import { useState } from 'react';
import { ReactImageGalleryItem } from 'react-image-gallery';
import Button from '../../common/Button';
import Eye from '../../common/Eye';
import style from './ProductViewPage.module.scss';
import RecProduct, { RecProductPropsType } from './RecProduct';
import Slider from './Slider';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

type ProductViewPagePropType = {
  page: string | undefined;
  images: ReactImageGalleryItem[];
  productInfo?: {
    title: string;
    about: string;
    price: number | string;
    date: string;
    viewscount: number | string;
    tegs: string;
    tel: number | string;
    idProduct: string;
    location?: string;
  };
  searchProduct: RecProductPropsType['searchProduct'][];
};

const ProductViewPage = ({ page, images, productInfo, searchProduct }: ProductViewPagePropType) => {
  console.log('страница товара');
  const [viewTel, SetViewTel] = useState(false);
  return (
    <div className={style.container}>
      <p className={style.date}>{productInfo?.date}</p>
      <p className={style.price}>{productInfo?.price} Р</p>
      <h1 className={style.title}>{productInfo?.title}</h1>
      {!viewTel ? (
        <Button onClick={() => SetViewTel(true)} title="Показать номер" size="m" />
      ) : (
        <p className={style.tel}>{productInfo?.tel}</p>
      )}
      <p className={style.idProduct}>{/* {`id: ${page}, productInfo:`} {productInfo?.idProduct} */}</p>
      <div></div>
      <Eye viewscount={productInfo?.viewscount || 0} />
      <p className={style.viewtoo}>Смотрите также:</p>
      <section>
        {/* <h1>Cтраница товара {page}</h1> */}
        <Slider images={images} />
        <div className={style.description}>
          <h3>Описание:</h3>
          <p>{productInfo?.about}</p>
        </div>
        <div className={style.location}>
          <h3>
            Местоположения: <span>{productInfo?.location}</span>
          </h3>
        </div>
        <YMaps query={{ lang: 'ru_RU' }}>
          <div>
            <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} className={style.map}>
              <Placemark defaultGeometry={[55.751574, 37.573856]} />
            </Map>
          </div>
        </YMaps>
      </section>
      <aside>
        <RecProduct searchProduct={searchProduct[0]} />
        <RecProduct searchProduct={searchProduct[1]} />
      </aside>
    </div>
  );
};

export default ProductViewPage;
export type { ProductViewPagePropType };
