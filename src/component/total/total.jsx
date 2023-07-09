import React from 'react'
import { useEffect, useState } from 'react';

const Total = (props) => {

  // 篩選日期

  useEffect(() => {
    const startDate = props.start_date !== "" ? new Date(props.start_date) : null;
    const endDate = props.end_date !== "" ? new Date(props.end_date) : null;

    //總收支日期
    const newDate = props.database_data.filter(item => {
      const date = new Date(item.today_date);
      return (!startDate || date >= startDate) && (!endDate || date <= endDate);

    })
    props.set_select_database_data(newDate)
    props.set_render_data(newDate)

    //總收入日期
    const new_plus_Date = props.account_plus_data.filter(item => {
      const date = new Date(item.today_date);
      return (!startDate || date >= startDate) && (!endDate || date <= endDate);

    })
    props.set_select_account_plus_data(new_plus_Date)

    //總支出日期
    const new_minus_Date = props.account_minus_data.filter(item => {
      const date = new Date(item.today_date);
      return (!startDate || date >= startDate) && (!endDate || date <= endDate);
    })
    props.set_select_account_minus_data(new_minus_Date)
  }, [props.start_date, props.end_date]);

  //篩選日期後的價格計算

  useEffect(() => {
    // 計算收入price
    const plus_price = props.select_account_plus_data.reduce((acc, obj) => {
      const price = parseFloat(obj.price);
      return acc + price;
    }, 0);


    // 計算支出price
    const minus_price = props.select_account_minus_data.reduce((acc, obj) => {
      const price = parseFloat(obj.price);
      return acc + price;
    }, 0);


    // 計算總和price
    const total_price = plus_price - minus_price

    props.set_account_plus_data_price(plus_price)
    props.set_account_minus_data_price(minus_price)
    props.set_database_data_price(total_price)
  }, [props.select_database_data, props.select_account_plus_data, props.select_account_minus_data])

  // 不同button被click後換顏色跟字體跟價錢和模式
  const [button_state, set_button_state] = useState(1)
  const change_bg_color = button_state == 1 ? "bg_gray" : button_state == 2 ? "bg_green" : "bg_yellow"
  const change_text_color = button_state == 1 ? "text_gray" : button_state == 2 ? "text_green" : "text_yellow"
  const change_text=button_state == 1 ? "收支" : button_state == 2 ? "收入" : "支出"

  const change_button_state1 = () => {

    set_button_state(1)
    props.set_render_data(props.select_database_data)
    props.set_render_price(props.database_data_price)


  }

  const change_button_state2 = () => {

    set_button_state(2)
    props.set_render_data(props.select_account_plus_data)
    props.set_render_price(props.account_plus_data_price)



  }

  const change_button_state3 = () => {
    set_button_state(3)
    props.set_render_data(props.select_account_minus_data)
    props.set_render_price(props.account_minus_data_price)




  }


  return <div className='mt-5'>
    <div className='border shadow-lg row mx-5'>
      <div className={`col-3 p-3   ${change_bg_color}`}>
        <div className='main_button_box'>
          <button onClick={() => { change_button_state1() }}></button>
          <button onClick={() => { change_button_state2() }}></button>
          <button onClick={() => { change_button_state3() }}></button>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <h1 className='text-light'>總</h1>
          <h3 className='text-light'>{change_text}</h3>
        </div>
      </div>
      <div className='col-9 row p-5 d-flex flex-column '>
        <div className=' text-center'>
          <h1 className={`${change_text_color}`}>${props.render_price}</h1>
        </div>
        <div className=' d-flex justify-content-center text-center '>
          <h5>開始日期:</h5>
          <input type="date" value={props.start_date} onChange={(e) => { props.set_start_date(e.target.value) }} className='mx-5' />
          <h5>結束日期:</h5>
          <input type="date" value={props.end_date} onChange={(e) => { props.set_end_date(e.target.value) }} className='mx-5' />
        </div>

      </div>
    </div>



  </div>
}

export default Total;
