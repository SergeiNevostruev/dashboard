import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductViewPage, { ProductViewPagePropType } from '../../components/pages/ProductViewPage';
import { ReactImageGalleryItem } from 'react-image-gallery';
import test_card from '../../assets/img/test_card.jpg';
import test_card2 from '../../assets/img/test_card2.png';
import defaultPhoto from '../../assets/img/default.jpg';
import PostRequest from '../../network';
import Spinner from '../../components/common/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import selectorTegStore from '../../toolkit/tegs/selectors';
import { CardPropsType } from '../../components/pages/MainPage/ProductCards';
import { getProductData, getTegsData, SetSearchPage } from '../../toolkit/tegs/tegs';

// const searchProduct: ProductViewPagePropType['searchProduct'] = [
//   { id: '1', linkImg: test_card, name: 'Стиральная машина', firm: 'Indesit' },
//   { id: '2', linkImg: test_card2, name: 'Стиральная машина', firm: 'Samsung' },
// ];

const ProductViewContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tegsInStore = useSelector(selectorTegStore.GetTegsArray);
  const dataProductInStore = useSelector(selectorTegStore.GetMainProductArray);
  const searchPage = useSelector(selectorTegStore.GetSearchProduct);
  const dataProductDB = dataProductInStore.data as CardPropsType[];
  const location = useLocation();
  location.pathname = '';
  console.log(location.pathname);
  if (!localStorage.getItem('searchPage')) localStorage.setItem('searchPage', JSON.stringify(['', '']));

  const { id } = useParams();
  const [data, SetData] = useState({});
  // if (id) localStorage.setItem('searchProduct', '');

  useEffect(() => {
    dispatch(getTegsData());
    if (!dataProductInStore) {
      dispatch(getProductData());
    }

    const getData = async () => {
      location.pathname = '';
      const dataDB: CardPropsType = await PostRequest({ url: `/api/product/${id}`, method: 'GET' });
      return dataDB;
    };
    getData()
      .then((d) => {
        SetData(d);
      })
      .catch();

    // console.log(data);
  }, [id]);

  if (data) {
    const pageOneSearch = (JSON.parse(localStorage.getItem('searchPage') || '') as string[])[0];
    if (pageOneSearch !== id) {
      dispatch(
        SetSearchPage({
          searchPage: {
            1: id || '',
            2: pageOneSearch,
          },
        })
      );
      localStorage.setItem('searchPage', JSON.stringify([id || '', pageOneSearch]) || '');
    }
    let images = [
      {
        original: ``,
        thumbnail: ``,
        sizes: '300px',
      },
    ];
    if ((data as CardPropsType).photoUrl) {
      const imagesURL: Array<string> = JSON.parse((data as CardPropsType).photoUrl);
      images = imagesURL.map((v) => ({
        original: `${process.env.PUBLIC_URL}/${v}`,
        thumbnail: `${process.env.PUBLIC_URL}/${v}`,
        sizes: '300px',
      }));
    }

    const dataProduct = {
      title: (data as CardPropsType).title,
      about: (data as CardPropsType).about,
      price: (data as CardPropsType).price || 0,
      date: (data as CardPropsType).createDate?.toString().slice(0, 10) || '',
      viewscount: (data as CardPropsType).views,
      tegs: tegsInStore.find((v) => (data as CardPropsType).teg === v.id)?.teg || 'Все товары',
      tel: (data as CardPropsType).tel || 0,
      idProduct: (data as CardPropsType).uuid,
      location: (data as CardPropsType).address || '',
    };
    const pageSearchlocalStore = JSON.parse(localStorage.getItem('searchPage') || '') as string[];
    return <ProductViewPage page={id} images={images} productInfo={dataProduct} searchProduct={pageSearchlocalStore} />;
  } else {
    setTimeout(() => navigate('404'), 5000);
    return <Spinner />;
  }
};

export default ProductViewContainer;
