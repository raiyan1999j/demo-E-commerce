import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function RenderList({info,order,value,removeOrder}) {
    let count = order[value];
    let price = info[value].amount;
    let name  = info[value].name;
    let stocks= info[value].stocks == 'Stocks';

    const remove=()=>{
        removeOrder(value)
    }

    if(stocks){
        return(
            <>
            <div className='block w-full after:content-"" after:table after:clear-both'>
            <span className='float-left pr-1'>{count}</span>
            <span className='float-left'>{name}</span>
            <span className='float-right pr-1 pt-1' onClick={remove}>
            <XMarkIcon className="-ml-0.8s h-4 w-4 bg-red-400 text-white" aria-hidden="true" />
            </span>
            <span className='float-right pr-1'>{count*price}</span>
          </div> 
            </>
        )
    }
    else{
        return <p>Out of Stocks</p>
    }
}

export default RenderList;