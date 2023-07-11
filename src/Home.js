import './Home.css';
import { useEffect, useState } from 'react';
import Head from './component/head/head';
import Main from './component/main/main';
import Total from './component/total/total';
import "bootstrap/dist/css/bootstrap.css"
import axios from 'axios';

function App() {
  const fakedata=[{
    id: 2,
    name: '撿到錢',
    shop: null,
    price: '31',
    today_date: '2023-06-25',
    note: '',
    symbol: '+'
  },
 
  {
    id: 4,
    name: '早餐',
    shop: '小覓蔬',
    price: '100',
    today_date: '2023-06-21',
    note: '',
    symbol: '-'
  },
  
  {
    id: 4,
    name: '7月股票股利',
    shop: null,
    price: '2100',
    today_date: '2023-06-14',
    note: '大立光',
    symbol: '+'
  }]
  // 一開始就取得input資料
  const [database_data, set_database_data] = useState([]);
  const [account_plus_data, set_account_plus_data] = useState([]);
  const [account_minus_data, set_account_minus_data] = useState([]);
  // 輸入的日期
  const [start_date, set_start_date] = useState("");
  const [end_date, set_end_date] = useState("");
  // 拆選過日期的資料
  const [select_database_data, set_select_database_data] = useState([]);
  const [select_account_plus_data, set_select_account_plus_data] = useState([]);
  const [select_account_minus_data, set_select_account_minus_data] = useState([]);
  // 要渲染的資料
  const [render_data, set_render_data] = useState([]);
  // 計算price的資料
  const [database_data_price, set_database_data_price] = useState([]);
  const [account_plus_data_price, set_account_plus_data_price] = useState([]);
  const [account_minus_data_price, set_account_minus_data_price] = useState([]);
  // 要渲染的price資料
  const [render_price, set_render_price] = useState([]);
  // 告訴做完
  const [finish_button, set_finish_button] = useState(false);

  // 一開始就取得資料庫資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getData");
        set_database_data(response.data);
        set_select_database_data(response.data);
        set_render_data(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [finish_button]);

  useEffect(() => {
    const fetchAccountPlusData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getDataplus");
        set_account_plus_data(response.data);
        set_select_account_plus_data(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAccountPlusData();
  }, [finish_button]);

  useEffect(() => {
    const fetchAccountMinusData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getDataminus");
        set_account_minus_data(response.data);
        set_select_account_minus_data(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAccountMinusData();
  }, [finish_button]);

  // 初始的price計算
  useEffect(() => {
    // 計算收入price
    const origin_plus_price = account_plus_data.reduce((acc, obj) => {
      const price = parseFloat(obj.price);
      return acc + price;
    }, 0);

    // 計算支出price
    const origin_minus_price = account_minus_data.reduce((acc, obj) => {
      const price = parseFloat(obj.price);
      return acc + price;
    }, 0);

    // 計算總和price
    const origin_total_price = origin_plus_price - origin_minus_price;

    set_render_price(origin_total_price);
    set_account_plus_data_price(origin_plus_price);
    set_account_minus_data_price(origin_minus_price);
    set_database_data_price(origin_total_price);
  }, [database_data, account_plus_data, account_minus_data]);

  return (
    <div>
      <Head set_database_data={set_database_data} />
      <Total
        set_render_data={set_render_data}
        database_data={database_data}
        set_database_data={set_database_data}
        account_plus_data={account_plus_data}
        set_account_plus_data={set_account_plus_data}
        account_minus_data={account_minus_data}
        set_account_minus_data={set_account_minus_data}
        select_database_data={select_database_data}
        set_select_database_data={set_select_database_data}
        select_account_plus_data={select_account_plus_data}
        set_select_account_plus_data={set_select_account_plus_data}
        select_account_minus_data={select_account_minus_data}
        set_select_account_minus_data={set_select_account_minus_data}
        render_price={render_price}
        set_render_price={set_render_price}
        database_data_price={database_data_price}
        set_database_data_price={set_database_data_price}
        account_plus_data_price={account_plus_data_price}
        set_account_plus_data_price={set_account_plus_data_price}
        account_minus_data_price={account_minus_data_price}
        set_account_minus_data_price={set_account_minus_data_price}
        start_date={start_date}
        set_start_date={set_start_date}
        end_date={end_date}
        set_end_date={set_end_date}
      />

      {fakedata.map(({ id, name, shop, price, today_date, note, symbol }) => (
        <Main
          key={id}
          id={id}
          name={name}
          shop={shop}
          price={price}
          today_date={today_date}
          note={note}
          symbol={symbol}
          set_finish_button={set_finish_button}
        />
      ))}
    </div>
  );
}

export default App;
