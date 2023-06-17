import React,{useState,useEffect,createContext} from 'react';
import {PowerIcon} from '@heroicons/react/24/solid';
import { useParams,useLocation,useNavigate } from 'react-router-dom';
import Admin from './FrontEnd/Admin';
import Craft from './FrontEnd/Craft';
import Store from './FrontEnd/Store';
import AdminLogin from './FrontEnd/AdminLogin';
import './App.css'

export const MyContext = createContext();

function App(){
  const docs ={
    info:{},
    orders:{}
  }
  const [state,setState] = useState(docs);
  const location = useLocation();
  const navigate = useNavigate();
  const {passId} = useParams();

  const retrieveAll=async ()=>{
    if(location.state == null || location.state.track !== true){
      navigate('/')
    }
    try{
    let retrieveAdmin= await fetch('http://localhost:5000/retrieveAdmin');
    let adminData = await retrieveAdmin.json();
    let retrieveOrder= await fetch(`http://localhost:5000/retrieveOrder/${passId}`);
    let orderData = await retrieveOrder.json();
    
    let convertAdmin = adminData.reduce((acc,initial)=>{
      let {fishReg,name,amount,stocks,opinion,image} = initial;
      let imgConvert = atob(image);
      
      acc[fishReg] = {name,amount,stocks,opinion,image:imgConvert};

      return acc;
    },{})
    
    let convertOrder = orderData.reduce((acc,initial)=>{
      let {fishReg,revolve} = initial;
      acc[fishReg] = revolve;

      return acc;
    },{})

    setState({info:convertAdmin,orders:convertOrder})
    }
    catch(error){
      console.log(error);
    }
    console.log('called')
  }


  useEffect(()=>{
    retrieveAll();
  },[])

  const addItem=(value)=>{
    let copy = {...state.info};
    copy[`fish${Date.now()}`]= value;

    
    const group={
      fishReg :`fish${Date.now()}`,
      val : value
    }
    addItemServer(group);
    setState({...state,info:copy});
  }

  const addItemServer=(value)=>{
    const formData = new FormData();
    formData.append('fishReg',value.fishReg);
    formData.append('name',value.val.name);
    formData.append('amount',value.val.amount);
    formData.append('stocks',value.val.stocks);
    formData.append('opinion',value.val.opinion);
    formData.append('image',value.val.image);

    fetch('http://localhost:5000/addServer',{
      method:'POST',
      headers:{
        'Accept':'multipart/form-data'
      },
      body:formData
    })
  }
  
  const editItem=(id,value)=>{
    let copy = {...state.info}
    copy[id] = value;

    let group={
      fishReg:id,
      val:value
    }
    setState({...state,info:copy});
    editItemServer(group);
  }

  const editItemServer=(value)=>{
    const data = new FormData();
    data.append('name',value.val.name);
    data.append('amount',value.val.amount);
    data.append('stocks',value.val.stocks);
    data.append('opinion',value.val.opinion);
    data.append('image',value.val.image);
    data.append('fishReg',value.fishReg);
    
    fetch(`http://localhost:5000/updateItem/${passId}`,{
      method:'PUT',
      headers:{
        'Accept':'multipart/form-data'
      },
      body:data
    })
  }
  const removeItem= (value)=>{
    let copy = {...state};
    let group={
      fishReg:value
    }
    let supportGroup={
      refNum:passId,
      fishReg:value
    }
    delete copy.info[value];
    delete copy.orders[value];

    setState(copy);
    removeItemServer(group);
    removeOrderServer(supportGroup);
  }
  const removeItemServer=(value)=>{
    fetch('http://localhost:5000/removeItem',{
      method:'DELETE',
      headers:{'content-type':'application/json'},
      body:JSON.stringify(value)
    })
  }

  const addOrder=(value)=>{
    let copy = {...state.orders}
    copy[value] = copy[value] + 1 || 1;

    setState({...state,orders:copy});  

    if(state.orders.hasOwnProperty(value)){
      let group={
        fishReg:value,
        count: state.orders[value]
      }
      updateOrderServer(group);
    }else{
      let group={
        fishReg:value
      }
      addOrderServer(group);
    }
  }

  const addOrderServer=(value)=>{
    fetch(`http://localhost:5000/addOrder/${passId}`,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify(value)
    })
  }

  const updateOrderServer=(value)=>{
    fetch(`http://localhost:5000/updateOrder/${passId}`,{
      method:'PUT',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(value)
    })
  }
  const removeOrder=async (value)=>{
    let copy = {...state.orders};
    delete copy[value];

    setState({...state,orders:copy});

    let group={
      refNum: passId,
      fishReg: value
    }
    removeOrderServer(group);
  }

  const removeOrderServer=(value)=>{
    fetch('http://localhost:5000/removeOrder',{
      method:'DELETE',
      headers:{'content-type':'application/json'},
      body:JSON.stringify(value)
    })
  }

  const logout=()=>{
    navigate('/');
  }
  window.onpopstate=()=>{
    navigate(1)
  }

  const contextDocs = {
    itemAdd : (value)=>{addItem(value)},
    itemEdit: (id,value)=>{editItem(id,value)},
    itemRemove:(value)=>{removeItem(value)},
    data: state.info,
    id: passId
  }
  return(
    <>
      
      <div className="bg-white py-24 sm:py-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          
            <div className='ring-1 ring-gray-200 rounded-3xl p-8 xl:p-10'>
              {Object.keys(state.info).map((value,index)=>{
                return(
                  <Store key={index}
                  keys={value}
                  data={state.info[value]} 
                  orderAdd={(value)=>{addOrder(value)}}
                  />
                )
              })}
            </div>
            <div className='ring-1 ring-gray-200 rounded-3xl p-8 xl:p-10'>
              <Craft info={state.info} orders={state.orders}
              orderRemove={(value)=>{removeOrder(value)}}
               />
            </div>
            <div className='ring-1 ring-gray-200 rounded-3xl p-8 xl:px-2 xl:py-8'>
            {/* <Admin
                itemAdd={(value)=>{addItem(value)}}
                itemEdit={(id,value)=>{editItem(id,value)}}
                itemRemove={(value)=>{removeItem(value)}}
                data={state.info}
              /> */}
              <MyContext.Provider value={contextDocs}>
              <AdminLogin />
              </MyContext.Provider>
            </div>
            
        </div>
      </div>
    </div>

    <div className='flex justify-end w-[90%] mx-auto py-4'>
      <button
        type="button"
        onClick={logout}
        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
       
      >
        <PowerIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Log Out
      </button>
      </div>
    </>
  )
}
export default App;