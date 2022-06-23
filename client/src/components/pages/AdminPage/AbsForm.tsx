import style from './AbsForm.module.scss';
import { Form, Input, InputNumber, Button, Select, Upload, UploadProps, message } from 'antd';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { ValidateMessages } from 'rc-field-form/es/interface';
import { UploadFile } from 'antd/lib/upload/interface';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosRequestConfig } from 'axios';
import PostRequest from '../../../network';
import { GetUserToken } from '../../../toolkit/auth/selectors';
import Spinner from '../../common/Spinner';

const tegs = [
  { id: '1', name: 'Автомобили' },
  { id: '2', name: 'Аксессуары' },
  { id: '3', name: 'Мебель' },
  { id: '4', name: 'Одежда' },
  { id: '5', name: 'Спорт' },
  { id: '6', name: 'Техника' },
  { id: '7', name: 'Товары для дома' },
];

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
  // e.preventDefault();
  // console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const onSearch = (value: string) => {
  console.log('search:', value);
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages: ValidateMessages = {
  required: '${label} обязательно!',
  pattern: { mismatch: 'В поле ${label} должно быть число!' },
  // types: {
  //   // email: '${label} is not a valid email!',
  //   number: 'В поле ${label} должно быть число!',
  // },
  //   number: {
  //     range: '${label} must be between ${min} and ${max}',
  //   },
};
/* eslint-enable no-template-curly-in-string */

const AbsForm = ({
  // title,
  // funcRequest,
  defaultValue,
}: {
  //   title: string;
  //   funcRequest?: Function;
  defaultValue?: UuidProductType;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const userId = useParams();
  const [titleValue, setTitleValue] = useState('');
  const token = useSelector(GetUserToken);
  console.log(token);

  if (!token) {
    setTimeout(() => navigate('/auth'), 3000);
    return <Spinner />;
  }
  console.log(userId);

  const user: string = String(userId.id);

  const initialValues = {
    title: defaultValue?.title || 'Новое объявление',
    tel: defaultValue?.tel || null,
    teg: defaultValue?.teg || null,
    price: defaultValue?.price || null,
    about: defaultValue?.about || null,
    address: defaultValue?.address || null,
    mapXY: defaultValue?.mapXY || { x: null, y: null },
    pathUrl: defaultValue?.pathUrl || null,
  };
  // let defaultFileList: Array<UploadFile<any>>;
  // if (initialValues.pathUrl) {
  //   defaultFileList = initialValues.pathUrl.map((v, i) => ({
  //     uid: `${i}`,
  //     name: [...v.split('/')].pop() || '',
  //     status: 'done',
  //     url: document.location.host + '/' + v,
  //   }));
  // } else {
  //   defaultFileList = [
  //     {
  //       uid: '1',
  //       name: 'Картинка',
  //       status: 'done',
  //       url: '/api/photo/223c2c50-328b-41e8-91b2-b8f7e9cbe0e5/1a9e595b-6bf9-4bb9-955b-3333c57a15dc.jpg',
  //     },
  //   ];
  // }

  // const [currentImage, setCurrentImage] = useState({});
  // const addOrganizationImage = async ({ file }: any) => {
  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => {
  //     setCurrentImage({ imgVue: reader.result, imgBinary: file });
  //   });
  // };
  const onFinish = async (values: any) => {
    // console.log(values);

    const { product } = values;

    const url =
      user === 'new' ? `${process.env.PUBLIC_URL}/api/newproduct` : `${process.env.PUBLIC_URL}/api/product/${user}`;
    const method = user === 'new' ? 'POST' : 'PUT';
    const formData = new FormData();
    formData.set('title', product.title);
    formData.set('tel', product.tel);
    formData.set('teg', (JSON.parse(product.tegs) as typeof tegs[number]).id);
    formData.set('price', product.price);
    formData.set('about', product.about);
    formData.set('address', product.locality);
    if (product.upload) formData.append('file', product.upload);
    const options = {
      url: url,
      method: method,
      data: formData,
      headers: { ...axios.defaults.headers, Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    };
    console.log(product.upload);

    try {
      // const createOrChangeProductDB = await PostRequest(options);
      const response = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': `multipart/form-data` },
      });
      const createOrChangeProductDB = response.data;
      console.log(response);

      if (!createOrChangeProductDB.e) {
        console.log('создан: ', createOrChangeProductDB);
        message.success(createOrChangeProductDB.message);
        // navigate(`/cardproduct/${createOrChangeProductDB.product.uuid}`);
      } else {
        message.warning('Проблемы с отправкой формы... \n', createOrChangeProductDB.message);
      }
    } catch (e) {
      console.log('Ошибка', e);
      message.warning('Неведомая беда');
      // navigate('/404');
    }
  };

  console.log(userId);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(`selected ${e}`);
    setTitleValue(e.target.value);
  };

  return (
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
            <h1>{titleValue || initialValues.title}</h1>
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
            initialValue={initialValues.title}>
            <Input defaultValue={'товар'} value={'товар'} onChange={onChange} />
          </Form.Item>
          <div className={style.form_group}>
            <Form.Item
              className={style.form_group_item}
              name={['product', 'tegs']}
              label="Категории"
              initialValue={initialValues.teg}
              rules={[{ required: true }]}>
              <Select
                // onChange={onChange}
                filterOption={(input, option) =>
                  (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                }>
                {tegs.map((v) => {
                  return (
                    <Option key={v.id} value={JSON.stringify(v)}>
                      {v.name}
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
              initialValue={initialValues.price}
              rules={[{ pattern: new RegExp(/^[0-9]+$/), required: true }]}>
              <Input />
            </Form.Item>
          </div>
          <Form.Item
            name={['product', 'tel']}
            label="Телефон"
            initialValue={initialValues.tel}
            rules={[{ pattern: new RegExp(/^[0-9]+$/), required: true }]}
            className={style.form_tel}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['product', 'about']}
            label="Описание"
            initialValue={initialValues.about}
            rules={[{ required: true }]}>
            <Input.TextArea
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
              // action="/upload.do"
              multiple
              // defaultFileList={defaultFileList}
              beforeUpload={(file, fileList) => {
                // Access file content here and do something with it
                console.log('before', file);

                // Prevent upload
                return false;
              }}
              // defaultFileList={}
              onDownload={(file) => {
                console.log(file);
              }}
              customRequest={({ file, onSuccess, data }) => {
                setTimeout(() => {
                  console.log(onSuccess);
                }, 1000);
              }}
              // customRequest={addOrganizationImage}
            >
              <Button>Выбрать файл</Button>
            </Upload>
            {/* <Input type="file" multiple accept="image/*,image/jpeg" className={style.form_file_input} /> */}
          </Form.Item>
          <Form.Item
            name={['product', 'locality']}
            label="Местоположение"
            rules={[{ required: true }]}
            className={style.form_locality}>
            <Input />
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
  );
};

export default AbsForm;
