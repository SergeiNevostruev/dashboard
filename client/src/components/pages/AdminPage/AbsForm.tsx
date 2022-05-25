import style from './AbsForm.module.scss';
import { Form, Input, InputNumber, Button, Select, Upload, UploadProps, message } from 'antd';
import { Map, Placemark, YMaps } from 'react-yandex-maps';

const tegs = [
  { id: '1', name: 'Автомобили' },
  { id: '2', name: 'Аксессуары' },
  { id: '3', name: 'Мебель' },
  { id: '4', name: 'Одежда' },
  { id: '5', name: 'Спорт' },
  { id: '6', name: 'Техника' },
  { id: '7', name: 'Товары для дома' },
];

const { Option } = Select;

const normFile = (e: any) => {
  // e.preventDefault();
  console.log('Upload event:', e);
  // if (Array.isArray(e)) {
  //   return e;
  // }
  // return e?.fileList;
};

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log('search:', value);
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} обязательно!',
  types: {
    email: '${label} is not a valid email!',
    // number: '${label} число!',
  },
  //   number: {
  //     range: '${label} must be between ${min} and ${max}',
  //   },
};
/* eslint-enable no-template-curly-in-string */

const AbsForm = ({ title }: { title: string }) => {
  const onFinish = (values: any) => {
    console.log(values);
  };
  const [form] = Form.useForm();

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
            <h1>{title}</h1>
            {/* <Button title="Сохранить" size="l" onClick={() => console.log('сохранить')} /> */}
            <Button type="primary" htmlType="submit" size="middle">
              Сохранить
            </Button>
          </div>
        </Form.Item>
        <div className={style.main_form}>
          <Form.Item
            name={['product', 'title']}
            label="Название товара"
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <div className={style.form_group}>
            <Form.Item
              className={style.form_group_item}
              name={['product', 'tegs']}
              label="Категории"
              rules={[{ required: true }]}>
              <Select
                // onChange={onChange}
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
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
              rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </div>
          <Form.Item
            name={['product', 'tel']}
            label="Телефон"
            // rules={[{ type: 'number' }]}
            className={style.form_tel}>
            <Input />
          </Form.Item>
          <Form.Item name={['product', 'about']} label="Описание">
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
              action="/upload.do"
              multiple
              beforeUpload={(file, fileList) => {
                // Access file content here and do something with it
                console.log(file);

                // Prevent upload
                return false;
              }}
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  console.log(onSuccess);
                }, 0);
              }}>
              <Button>Выбрать файл</Button>
            </Upload>
            {/* <Input type="file" multiple accept="image/*,image/jpeg" className={style.form_file_input} /> */}
          </Form.Item>
          <Form.Item
            name={['product', 'locality']}
            label="Местоположение"
            // rules={[{ required: true }]}
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
