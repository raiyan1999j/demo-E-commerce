import React,{useState,useRef} from 'react';
import SubCreateAlert from './SubCreateAlert';


function SubCreateInput({serverSubmit,serverVerify}){
    const [verifyMessage,setVerify]=useState(null);
    const gmail = useRef();
    const userName= useRef();
    const userPass= useRef();
    const verificaion= useRef();
    const [secretNum,setSecret] = useState();
    const [send,setSend] = useState(false);

    const sendMessage=async()=>{
        setSend(true)
        await submit();
    }

    const bird=(value)=>{
        setSend(value)
    }

    const submit=async()=>{
      let mail ={
        email: gmail.current.value
    };
      let createNum= Date.now().toString();
      let cutNum = createNum.slice(5,10);
      let convert= Number(cutNum) * 2;

    setSecret(convert);
    await serverSubmit(convert,mail)
    }

    const verify=async ()=>{
      let info={
          name:userName.current.value,
          pass:userPass.current.value,
          mail:gmail.current.value
      }

      let verifyNum = verificaion.current.value;
      let convertNum= Number(verifyNum);

      if(convertNum === secretNum){
          await serverVerify(info)
          setSend(true)
          setVerify(true)
      }
      else{
          console.log('not matched')
          setSend(true)
          setVerify(false)
      }
  }
    return(
        <>
            <div className="isolate bg-white px-6 py-0 sm:py-10 lg:px-8 w-[40%] rounded-lg mx-auto ">
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
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create Account</h2>
      </div>
      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              User name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ref={userName}
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ref={userPass}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Gmail
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-[70%] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 float-left "
                ref={gmail}
              />
              <span className="isolate inline-flex rounded-md shadow-sm">
      <button
        className="relative inline-flex items-center rounded-md bg-white px-3.5 py-2  font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        onClick={sendMessage}
      >
        Send Message
      </button>
    </span>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              Verification Number
            </label>
            <div className="mt-2.5">
              <input
                type="company"
                name="company"
                id="company"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ref={verificaion}

              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={verify}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
    <SubCreateAlert messageSend={send} bird={(value)=>{bird(value)}} confarmation={verifyMessage} />
        </>
    )
}
export default SubCreateInput;