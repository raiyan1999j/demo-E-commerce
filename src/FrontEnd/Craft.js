import React from 'react'
import RenderList from './RenderList';

function Craft({info,orders,orderRemove}) {

  const orderId = Object.keys(orders);

  const total = orderId.reduce((accu,current)=>{
    if(info[current]){
      let price = info[current].amount;
    let order = orders[current];
    let stocks= info[current].stocks == 'Stocks';

    if(stocks){
      return accu + (order*price)
    }
    }
    
    return accu;
  },0)
  return(
    <>
      {orderId.map((value,index)=>{
        return(
          <RenderList info={info} order={orders} value={value} key={index}
          removeOrder={(value)=>{orderRemove(value)}} />
        )
      })}
      <div>
        <span className='float-left'>total</span>
        <span className='float-right'>{total}</span>
      </div>
    </>
  )
}

export default Craft