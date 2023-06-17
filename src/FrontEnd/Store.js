import React from 'react';
import {CheckCircleIcon,PlusCircleIcon} from '@heroicons/react/24/solid'

function Store({data,orderAdd,keys}) {
  const addToOrder=()=>{
    orderAdd(keys)
  }
  return (
    <>
      <div className="flex my-4">
      <div className="mr-4 flex-shrink-0 self-center">
        <img
          className="h-16 w-16 border border-gray-300 bg-white text-gray-300"
          preserveAspectRatio="none"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 200 200"
          aria-hidden="true"
          src={`/uploads/${data.image}`}
          />
      </div>
      <div className='w-full'>
        <h4 className="text-lg font-bold">
          {data.name}
        </h4>
        <p className="mt-1">
          <span className='block mb-2'>
            {data.opinion}
          </span>
          <span className='block mb-2 font-bold'>
            {data.amount} $
          </span>
          
            {data.stocks=='Stocks'?
            (
            <>
            <span className='float-left font-bold text-lime-600'>
            <CheckCircleIcon className="-ml-0.5 h-5 w-5 float-left font-bold" aria-hidden="true" /> In-Stocks
            </span>
            <span className='float-right' onClick={addToOrder}>
            <PlusCircleIcon className="-ml-0.5 h-7 w-7 text-blue-600" aria-hidden="true" />
            </span>
            </>
            ):
            <span className='float-left font-bold text-red-600'>
              Sold-Out
            </span>}
        </p>
      </div>
    </div>
    </>
  )
}

export default Store