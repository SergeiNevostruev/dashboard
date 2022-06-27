import style from './AbsForm.module.scss';
import { Form, Input, Button, Select, Upload, message } from 'antd';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';
import { ValidateMessages } from 'rc-field-form/es/interface';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import PostRequest from '../../../network';
import { GetUserToken } from '../../../toolkit/auth/selectors';
import Spinner from '../../common/Spinner';
import { getTegsData } from '../../../toolkit/tegs/tegs';
import selectorTegStore from '../../../toolkit/tegs/selectors';
import { CardPropsType } from '../MainPage/ProductCards';

export interface NewProductType {
  title: string;
  tel: number;
  teg: number;
  price: number;
  about: string;
  address: string;
  mapXY?: { x: number; y: number };
}

interface UuidProductType extends NewProductType {
  pathUrl?: string[];
}

const { Option } = Select;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages: ValidateMessages = {
  required: '${label} обязательно!',
  pattern: { mismatch: 'В поле ${label} должно быть число!' },
};
/* eslint-enable no-template-curly-in-string */

const AbsForm = ({ defaultValue }: { defaultValue?: UuidProductType }) => {
  const tegsInStore = useSelector(selectorTegStore.GetTegsArray);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const productId = useParams();
  const [titleValue, setTitleValue] = useState('');
  const token = useSelector(GetUserToken);
  const [data, SetData] = useState({} as CardPropsType);
  const [changeData, SetchangeData] = useState(false);
  const location = useLocation();
  useLayoutEffect(() => {
    if (tegsInStore) {
      dispatch(getTegsData());
    }
  }, []);

  if (!token) {
    setTimeout(() => navigate('/auth'), 3000);
    return <Spinner />;
  }

  const product: string = String(productId.id);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const getData = async () => {
      location.pathname = '';
      const dataDB: CardPropsType = await PostRequest({ url: `/api/product/${product}`, method: 'GET' });
      return dataDB;
    };

    getData()
      .then((d) => {
        SetData(d);
        SetchangeData(true);
        setTitleValue(data?.title);
      })
      .catch();
  }, []);

  const onFinish = async (values: any) => {
    const filds = values.product;
    const url =
      product === 'new'
        ? `${process.env.PUBLIC_URL}/api/newproduct`
        : `${process.env.PUBLIC_URL}/api/product/${product}`;
    const formData = new FormData();
    formData.set('title', filds.title);
    formData.set('tel', filds.tel);
    formData.set('teg', JSON.parse(filds.tegs).id);
    formData.set('price', filds.price);
    formData.set('about', filds.about);
    formData.set('address', filds.locality);
    if (filds.upload) {
      for (let file of filds.upload) formData.append('file', file.originFileObj);
    }

    try {
      let response;

      if (product === 'new') {
        response = await axios.post(url, formData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': `multipart/form-data` },
        });
      } else {
        response = await axios.put(url, formData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': `multipart/form-data` },
        });
      }
      const createOrChangeProductDB = response.data;

      if (!createOrChangeProductDB.e) {
        message.success(createOrChangeProductDB.message);
        navigate(`/cardproduct/${createOrChangeProductDB.product.uuid}`);
      } else {
        message.warning('Проблемы с отправкой формы... \n', createOrChangeProductDB.message);
      }
    } catch (e) {
      message.warning('Неведомая беда');
      // navigate('/404');
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  return product === 'new' || changeData ? (
    <>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        layout="vertical"
        form={form}
        // className={style.main_form}
      >
        <Form.Item className={style.name_save_block_bgn}>
          <div className={style.name_save_block}>
            <h1>{titleValue || data?.title || 'Новое объявление'}</h1>
            <Button type="primary" htmlType="submit" size="middle">
              Сохранить
            </Button>
          </div>
        </Form.Item>
        <div className={style.main_form}>
          <Form.Item
            name={['product', 'title']}
            label="Название товара"
            rules={[{ required: true }]}
            initialValue={data?.title}>
            <Input value={data?.title} onChange={onChange} />
          </Form.Item>
          <div className={style.form_group}>
            <Form.Item
              className={style.form_group_item}
              name={['product', 'tegs']}
              label="Категории"
              initialValue={JSON.stringify(tegsInStore.find((v) => v.id === data?.teg))}
              rules={[{ required: true }]}>
              <Select
                value={JSON.stringify(tegsInStore.find((v) => v.id === data?.teg))}
                onChange={(value, option) => {
                  if (!value) {
                    option = {
                      label: tegsInStore.find((v) => v.id === data?.teg)?.teg,
                      value: JSON.stringify(tegsInStore.find((v) => v.id === data?.teg)),
                    };
                    value = JSON.stringify(tegsInStore.find((v) => v.id === data?.teg));
                  }
                }}
                filterOption={(input, option) =>
                  (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                }>
                {tegsInStore.map((v) => {
                  return (
                    <Option key={v.id} value={JSON.stringify(v)}>
                      {v.teg}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <div className={style.form_group_item_empty}></div>
            <Form.Item
              className={style.form_group_item}
              name={['product', 'price']}
              label="Стоимость"
              initialValue={data?.price}
              rules={[{ pattern: new RegExp(/^[0-9]+$/), required: true }]}>
              <Input value={data?.price} />
            </Form.Item>
          </div>
          <Form.Item
            name={['product', 'tel']}
            label="Телефон"
            initialValue={data?.tel}
            rules={[{ pattern: new RegExp(/^[0-9]+$/), required: true }]}
            className={style.form_tel}>
            <Input value={data?.tel} />
          </Form.Item>
          <Form.Item
            name={['product', 'about']}
            label="Описание"
            initialValue={data?.about}
            rules={[{ required: true }]}>
            <Input.TextArea
              value={data?.about}
              // showCount
              autoSize={{ minRows: 3, maxRows: 30 }}
              maxLength={3000}
              className={style.form_about}
            />
          </Form.Item>
          <Form.Item
            name={['product', 'upload']}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            className={style.form_file_input_wrap}>
            <Upload
              name="upload"
              multiple
              // defaultFileList={defaultFileList}
              beforeUpload={(file, fileList) => {
                // Access file content here and do something with it

                // Prevent upload
                return false;
              }}
              customRequest={({ file, onSuccess, data }) => {
                setTimeout(() => {
                  console.log(onSuccess);
                }, 1000);
              }}>
              <Button>Выбрать файл</Button>
            </Upload>
            {/* <Input type="file" multiple accept="image/*,image/jpeg" className={style.form_file_input} /> */}
          </Form.Item>
          <Form.Item
            name={['product', 'locality']}
            label="Местоположение"
            rules={[{ required: true }]}
            initialValue={data?.address}
            className={style.form_locality}>
            <Input value={data?.address} />
          </Form.Item>
        </div>
      </Form>
      <YMaps query={{ lang: 'ru_RU' }}>
        <div>
          <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} className={style.map}>
            <Placemark defaultGeometry={[55.751574, 37.573856]} />
          </Map>
        </div>
      </YMaps>
    </>
  ) : (
    <Spinner />
  );
};

export default AbsForm;
