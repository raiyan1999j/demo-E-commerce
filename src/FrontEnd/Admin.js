import React,{useRef,useState,useContext} from 'react';
import {MyContext} from '../App';
import { useNavigate } from 'react-router-dom';
import EditStore from './EditStore';

import { PlusIcon , PowerIcon} from '@heroicons/react/24/solid'

const Admin =()=>{
   const docs = useContext(MyContext);
   const navigate = useNavigate();
   const name = useRef();
   const amount= useRef();
   const stocks= useRef();
   const opinion= useRef();
   const image = useRef();

   const addItems=()=>{
     const step1= image.current.files[0];
      // const imgURL= step1 ? URL.createObjectURL(step1):'';
     const details={
       name:name.current.value,
       amount:amount.current.value,
       stocks:stocks.current.value,
       opinion:opinion.current.value,
       image:step1
     }
     console.log(step1);
     docs.itemAdd(details);
     
     name.current.value=null;
     amount.current.value=null;
     opinion.current.value=null;
     image.current.value=null;
   }

   const logout=()=>{
    navigate('..',{state:{track:true}})
   }
  return(
     <>
       <div className='w-full text-right pb-4'>
       <button
         type="button"
         onClick={logout}
         className="inline-flex items-center gap-x-2 rounded-md bg-red-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
       >
         <PowerIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
         Log out
       </button>
       </div>
        {Object.keys(docs.data).map((value,index)=>{
         return(
           <EditStore key={value} keys={value} data={docs.data[value]}
           editItem={(id,val)=>{docs.itemEdit(id,val)}}
           removeItem={(val)=>{docs.itemRemove(val)}}
            />
         )
       })} 
       <div className='flex flex-row w-full'>
           <div className="w-[35%]">
             <div className="mt-2">
               <input
                 type="text"
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                 placeholder="fish-name"
                 ref={name}
                 />
             </div>
           </div>
           <div className="w-[35%]">
       <div className="relative mt-2 rounded-md shadow-sm">
         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
           <span className="text-gray-500 sm:text-sm">$</span>
         </div>
         <input
           type="number"
           className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
           placeholder="0.00"
           aria-describedby="price-currency"
           ref={amount}
         />
         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
           <span className="text-gray-500 sm:text-sm" id="price-currency">
             USD
           </span>
         </div>
       </div>
           </div>
           <div className="w-[30%]">
           <select
             className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
             ref={stocks}
           >
             <option value='Stocks'>In Stock</option>
             <option value='Sold'>Sold</option>
           </select>
           </div>
         </div>
        
         <div className='my-1'>
         <div>
       <div className="mt-2">
         <textarea
           rows={4}
           placeholder='description'
           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
           ref={opinion}
         />
       </div>
     </div>
         </div>
         <div>
         <div>
               <input
                 type="file"
                 name='image'
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                 placeholder="image url"
                 ref={image}
                 accept='image/*'
                 />
             </div>
         </div>
         <div className='my-1 text-center'>
         <button
         type="button"
         className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
         onClick={addItems}
       >
         <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
         Add Item
       </button>
         </div>
     </>
  )
}
export default Admin;