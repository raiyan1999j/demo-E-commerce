import react,{useState,useRef} from 'react';
import { useNavigate,useParams,Outlet,useOutlet } from 'react-router-dom';
import AdminNotFound from './AdminNotFound';
import { LockOpenIcon } from '@heroicons/react/24/solid';

function AdminLogin(){
    const info = {
        user:'adminPanel',
        pass:'alphaBravo'
    }
      const [adminLogin,setAdminLogin] = useState(false);
      const navigate = useNavigate();
      const {passId} = useParams();
      const outlet = useOutlet();
      const name = useRef();
      const security = useRef();


      const login=()=>{
          let user = name.current.value;
          let pass = security.current.value;

          if(user===info.user && pass === info.pass){
              navigate(`/app/${passId}/admin`,{state:{track:true}})
               setAdminLogin(false)
              console.log('match')
          }else{
               setAdminLogin(true)
              console.log('not match')
          }
      }

    const adminCondition=(value)=>{
      setAdminLogin(value)
    }

    if(adminLogin === false){
      return(
        <>
        {!outlet?
        (
          <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Admin Login</h2>
      </div>
      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              User Name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="company"
                ref={name}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                name="password"
                ref={security}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
        <button
        type="button"
        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full justify-center"
        onClick={login}
      >
        <LockOpenIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Log in
      </button>
        </div>
      </div>
    </div>
        ):null
        }
    <Outlet/>
        </>
    )
    }else{
      return(
        <>
          <AdminNotFound conditionAdmin={(value)=>{adminCondition(value)}}/>
        </>
      )
    }
    
}
export default AdminLogin;