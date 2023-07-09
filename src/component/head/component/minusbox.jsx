import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Minusbox = (props) => {

  // minusbox的開關
  const minusbox_disappear = props.minusbox_switch ? "" : "disappear"

  // 傳資料到後端
  const [minusbox_name, set_minusbox_name] = useState("")
  const [minusbox_shop, set_minusbox_shop] = useState("")
  const [minusbox_price, set_minusbox_price] = useState("")
  const [minusbox_today_date, set_minusbox_today_date] = useState("")
  const [minusbox_note, set_minusbox_note] = useState("")

  const [minusbox_data, set_minusbox_data] = useState({})

  useEffect(() => {
    set_minusbox_data({
      name: minusbox_name,
      shop: minusbox_shop,
      price:minusbox_price,
      today_date: minusbox_today_date,
      note: minusbox_note,
    symbol:"-"
    })
  }, [minusbox_name, minusbox_price, minusbox_price,minusbox_today_date, minusbox_note])

  //按確定後post資料清除input
  const post_minusbox_data_function = async () => {
    props.set_minusbox_switch(false)

    const post_minusbox_data = await axios.post("http://localhost:8080/postDataminus", minusbox_data)
    props.set_minusbox_switch(false)
    set_minusbox_name("")
    set_minusbox_shop("")
    set_minusbox_price("")
    set_minusbox_today_date("")
    set_minusbox_note("")



  }

    // 取消清空資料
    const cancel_minusbox = () => {
      props.set_minusbox_switch(false)
      set_minusbox_name("")
      set_minusbox_shop("")
      set_minusbox_price("")
      set_minusbox_today_date("")
      set_minusbox_note("")
  }


  return (
    <div className={`minusbox ${minusbox_disappear}`}>
      <div className='d-flex flex-column p-3'>
        <h3>新增支出</h3>
        <div>
          <h5>名稱:</h5>
          <input type="text" value={minusbox_name} onChange={(e) => { set_minusbox_name(e.target.value) }} />
          <h5 className='mt-2'>店名:</h5>
          <input type="text" value={minusbox_shop} onChange={(e) => { set_minusbox_shop(e.target.value) }} />
          <h5 className='mt-2'>價格:</h5>
          <input type="text" value={minusbox_price} onChange={(e) => { set_minusbox_price(e.target.value) }} />
          <h5 className='mt-2'>日期:</h5>
          <input type="date" value={minusbox_today_date} onChange={(e) => { set_minusbox_today_date(e.target.value) }} />
          <h5 className='mt-2'>備註:</h5>
          <input type="text" value={minusbox_note} onChange={(e) => { set_minusbox_note(e.target.value) }} />
        </div>
        <div className='d-flex justify-content-end mt-3'>
          <button className='' onClick={() => { post_minusbox_data_function() }}>確定</button>
          <button className='ms-3' onClick={() => { cancel_minusbox() }}>取消</button>
        </div>

      </div>


    </div>
  )
}

export default Minusbox