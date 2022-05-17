import style from './AdminPage.module.scss';
import EditingMenu from './EditingMenu';

// import { Table } from 'antd';

// const columns = [
//   {
//     title: 'Название объявления',
//     dataIndex: 'title',
//     // filterMode: 'tree',
//     // filterSearch: true,
//     // onFilter: (value, record) => record.address.startsWith(value),
//     width: '30%',
//   },
//   {
//     title: 'Категория',
//     dataIndex: 'category',
//     // sorter: (a, b) => a.age - b.age,
//   },
//   {
//     title: 'Дата публикации',
//     dataIndex: 'date',
//     // sorter: (a, b) => a.age - b.age,
//     // onFilter: (value, record) => record.address.startsWith(value),
//     // filterSearch: (input, record) => record.value.indexOf(input) > -1,
//     // width: '40%',
//   },
//   {
//     title: 'Публикация',
//     dataIndex: 'published',
//     // sorter: (a, b) => a.age - b.age,
//   },
// ];

// const data = [
//   {
//     key: '1',
//     title: 'John Brown',
//     category: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     title: 'Jim Green',
//     category: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     title: 'Joe Black',
//     category: 32,
//     address: 'Sidney No. 1 Lake Park',
//   },
//   {
//     key: '4',
//     title: 'Jim Red',
//     category: 32,
//     address: 'London No. 2 Lake Park',
//   },
// ];

// function onChange(pagination, filters, sorter, extra) {
//   console.log('params', pagination, filters, sorter, extra);
// }

// export default () => <Table columns={columns} dataSource={data} onChange={onChange} />;

type CardType = {
  id: number;
  title: string;
  category: string;
  date: string;
  published: string;
};

type TablePropType = { data: CardType[] };

const TableAds = ({ data }: TablePropType) => {
  return (
    <div className={style.tableabs}>
      <div className={style.header_tableabs}>
        <div className={style.header_tableabs_1}>Название объявления</div>
        <div className={style.header_tableabs_2}>Категория</div>
        <div className={style.header_tableabs_3}>Дата публикации</div>
        <div className={style.header_tableabs_4}>Публикация</div>
        <div className={style.header_tableabs_5}>{''}</div>
      </div>
      {data.map((i) => (
        <div key={i.id} className={style.card_tableabs}>
          <h3 className={style.header_tableabs_1}>{i.title}</h3>
          <p className={style.header_tableabs_2}>{i.category}</p>
          <p className={style.header_tableabs_3}>{i.date}</p>
          <p className={style.header_tableabs_4}>{i.published}</p>
          {/* <div className={style.header_tableabs_5}> */}
          <EditingMenu />
          {/* </div> */}
        </div>
      ))}
    </div>
  );
};

export default TableAds;
export type { TablePropType };
