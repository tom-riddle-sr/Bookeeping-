import React from 'react'
import { useEffect, useState } from 'react';
import Plus from "../../media/Plus.svg"
import Minus from "../../media/Minus.svg"
import Minusbox from './component/minusbox';
import Plusbox from './component/plusbox';


const Head = (props) => {
  // plusbox的開關
  const [plusbox_switch, set_plusbox_switch] = useState(false)
  // minusbox的開關
  const [minusbox_switch, set_minusbox_switch] = useState(false)

  return (
    <div className='headbox'>
      <div className='d-flex justify-content-between mx-5 mt-3'>
        <h1>記帳本</h1>
        <div>
          <img src={Plus} onClick={() => { set_plusbox_switch(true) }} alt="" />
          <Plusbox plusbox_switch={plusbox_switch} set_plusbox_switch={set_plusbox_switch} get_data_function={props.get_data_function} />
          <img src={Minus} onClick={() => { set_minusbox_switch(true)  }} alt="" />
          <Minusbox minusbox_switch={minusbox_switch} set_minusbox_switch={set_minusbox_switch} get_data_function={props.get_data_function} />
        </div>
      </div>




    </div>
  )
}

export default Head