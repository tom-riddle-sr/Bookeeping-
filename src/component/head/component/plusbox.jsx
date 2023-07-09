import React, { useEffect, useState } from 'react'
import axios from 'axios';



const Plusbox = (props) => {

    // plusbox的開關
    const plusbox_disappear = props.plusbox_switch ? "" : "disappear"

    // 傳資料到後端
    const [plusbox_name, set_plusbox_name] = useState("")
    const [plusbox_price, set_plusbox_price] = useState("")
    const [plusbox_today_date, set_plusbox_today_date] = useState("")
    const [plusbox_note, set_plusbox_note] = useState("")

    const [plusbox_data, set_plusbox_data] = useState({})

    useEffect(() => {
        set_plusbox_data({
            name: plusbox_name,
            price: plusbox_price,
            today_date: plusbox_today_date,
            note: plusbox_note,
            symbol:"+"
        })
    }, [plusbox_name, plusbox_price, plusbox_today_date, plusbox_note])

    //按確定後post資料清除input
    const post_plusbox_data_function = async () => {
        props.set_plusbox_switch(false)
        const post_plusbox_data = await axios.post("http://localhost:8080/postDataplus", plusbox_data)
        props.set_plusbox_switch(false)
        set_plusbox_name("")
        set_plusbox_price("")
        set_plusbox_today_date("")
        set_plusbox_note("")

    

    }

    // 取消清空資料
    const cancel_plusbox = () => {
        props.set_plusbox_switch(false)
        set_plusbox_name("")
        set_plusbox_price("")
        set_plusbox_today_date("")
        set_plusbox_note("")
    }



    return (
        <div className={`plusbox ${plusbox_disappear}`}>
            <div className='d-flex flex-column p-3'>
                <h3>新增收入</h3>
                <div>
                    <h5>名稱:</h5>
                    <input type="text" value={plusbox_name} onChange={(e) => { set_plusbox_name(e.target.value) }} />
                    <h5 className='mt-2'>價格:</h5>
                    <input type="text" value={plusbox_price} onChange={(e) => { set_plusbox_price(e.target.value) }} />
                    <h5 className='mt-2'>日期:</h5>
                    <input type="date" value={plusbox_today_date} onChange={(e) => { set_plusbox_today_date(e.target.value) }} />
                    <h5 className='mt-2'>備註:</h5>
                    <input type="text" value={plusbox_note} onChange={(e) => { set_plusbox_note(e.target.value) }} />
                </div>
                <div className='d-flex justify-content-end mt-3'>
                    <button className='' onClick={() => { post_plusbox_data_function() }}>確定</button>
                    <button className='ms-3' onClick={() => { cancel_plusbox() }}>取消</button>
                </div>

            </div>


        </div>
    )
}
export default Plusbox