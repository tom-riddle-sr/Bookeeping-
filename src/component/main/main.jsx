import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';



const Main = (props) => {
  const { id, name, shop, price, today_date, note, symbol } = props;

  //編輯的開關
  const [edit_switch, set_edit_switch] = useState(false)

  //要更改的input
  const [edit_name, set_edit_name] = useState("")
  const [edit_shop, set_edit_shop] = useState("")
  const [edit_price, set_edit_price] = useState("")
  const [edit_today_date, set_edit_today_date] = useState("")
  const [edit_note, set_edit_note] = useState("")

  const [edit_total_input, set_edit_total_input] = useState({})


  useEffect(() => {
    set_edit_name(name)
    set_edit_shop(shop)
    set_edit_price(price)
    set_edit_today_date(today_date)
    set_edit_note(note)
  }, [])

  useEffect(() => {
    set_edit_total_input({
      id: id,
      name: edit_name,
      shop: edit_shop,
      price: edit_price,
      today_date: edit_today_date,
      note: edit_note,
      symbol: symbol
    })
  }, [edit_name, edit_shop, edit_price, edit_today_date, edit_note])

  const change_input = () => {
    props.set_finish_button(false)

    if (symbol == "+") {
      const post_total_input_plus = axios.post("http://localhost:8080/postEditDataplus", edit_total_input)
    } else {
      const post_total_input_minus = axios.post("http://localhost:8080/postEditDataminus", edit_total_input)
    }
    set_edit_switch(false)
    props.set_finish_button(true)
  }

  const delete_function = () => {
    props.set_finish_button(false)

    if (symbol == "+") {
      const post_total_input_plus = axios.post("http://localhost:8080/deleteplus", edit_total_input)
    } else {
      const post_total_input_minus = axios.post("http://localhost:8080/deleteminus", edit_total_input)
    }
    props.set_finish_button(true)

  }

  const name_switch = edit_switch ? <input type="text" value={edit_name} onChange={(e) => { set_edit_name(e.target.value) }} placeholder='名稱' /> : <h1 className='ms-5 text_white'>{name}</h1>
  const shop_switch = symbol == "+" ? "" : edit_switch ? <input type="text" value={edit_shop} onChange={(e) => { set_edit_shop(e.target.value) }} placeholder='店名' /> : <h3 className='ms-5 text_white'>{shop}</h3>
  const price_switch = edit_switch ? <input type="text" value={edit_price} onChange={(e) => { set_edit_price(e.target.value) }} placeholder='價格' /> : <h1 className=''>${price}</h1>
  const today_date_switch = edit_switch ? <input type="date" value={edit_today_date} onChange={(e) => { set_edit_today_date(e.target.value) }} placeholder='日期' /> : <h3 className=''>{today_date}</h3>
  const note_switch = edit_switch ? <input type="text" value={edit_note} onChange={(e) => { set_edit_note(e.target.value) }} placeholder='備註' /> : <h3 className=''>{note}</h3>

  const edit_disappear_switch = edit_switch ? "disappear" : ""
  const ok_disappear_switch = edit_switch ? "" : "disappear"

  const color_change = symbol == "+" ? "bg_green" : "bg_yellow"

  return (
    <div className='my-5 '>
      <div className='row mx-5 border shadow-lg'>
        <div className={`col-3 p-3   ${color_change}`}>
          {name_switch}
          {shop_switch}
        </div>
        <div className='col-9 row p-3 d-flex '>
          <div className='col-4 '>
            {price_switch}
          </div>
          <div className='col-6  d-flex flex-column'>
            {today_date_switch}
            {note_switch}
          </div>
          <div className='col-2 d-flex flex-column '>
            <button className={`${edit_disappear_switch} ${color_change}`} onClick={() => { set_edit_switch(true) }}>編輯</button>
            <button className={`mt-3 ${edit_disappear_switch} ${color_change}`} onClick={() => { delete_function() }}>刪除</button>
            <button className={`${ok_disappear_switch} ${color_change}`} onClick={() => { change_input() }}>確定</button>
            <button className={`mt-3 ${ok_disappear_switch}  ${color_change}`} onClick={() => { set_edit_switch(false) }}>取消</button>
          </div>
        </div>
      </div>



    </div>
  )
}

export default Main