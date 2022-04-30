import React from 'react';
import { useParams } from 'react-router-dom';
import ProductViewPage, { ProductViewPagePropType } from '../../components/pages/ProductViewPage';
import { ReactImageGalleryItem } from 'react-image-gallery';
import test_card from '../../assets/img/test_card.jpg';
import test_card2 from '../../assets/img/test_card2.png';

const fakeImages: ReactImageGalleryItem[] = [
  { original: test_card, thumbnail: test_card, sizes: '300px' },
  { original: test_card2, thumbnail: test_card2, sizes: '300px' },
  { original: test_card, thumbnail: test_card, sizes: '300px' },
  { original: test_card2, thumbnail: test_card2, sizes: '300px' },
];

const searchProduct: ProductViewPagePropType['searchProduct'] = [
  { id: '1', linkImg: test_card, name: 'Стиральная машина', firm: 'Indesit' },
  { id: '2', linkImg: test_card2, name: 'Стиральная машина', firm: 'Samsung' },
];

const fakedaata = {
  title: 'Стиралка',
  about: 'Очень хорошая стиралка',
  price: 10000,
  date: '1 сентября 2022',
  viewscount: '1000000',
  tegs: 'Для дома',
  tel: '8999999999',
  idProduct: 'whfajw43884843',
  location: 'г. Кстово',
};

const ProductViewContainer = () => {
  const { id } = useParams();

  return (
    <ProductViewPage
      page={id}
      images={fakeImages}
      productInfo={fakedaata}
      searchProduct={searchProduct}
    />
  );
};

export default ProductViewContainer;
