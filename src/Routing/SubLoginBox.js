import React,{useState,useRef,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import SubLoginInputBox from './SubLoginIputBox';

function SubLoginBox(){
    const [condition,setCondition] = useState(null);
    const [serverInfo,setServer] = useState(false);
    const navigate = useNavigate();
    const [infoHolder,setInfo] = useState({});
    
    const support=(value)=>{
      setInfo(value)
    }

    const logInInfo=async ()=>{
      let docs={
        mail:infoHolder.mail,
        pass:infoHolder.pass
      }
      let res = await fetch('http://localhost:5000/logInInfo');
      let data= await res.json();
      
      await crossMatch(docs,data);
    }

    
    const crossMatch=async (docs,data)=>{
      let idNumber = Object.keys(data).findIndex((value)=>{
          return data[value].mail === docs.mail && Number(data[value].pass) === Number(docs.pass);
      }) 
      
      let passId = data[idNumber].id;
      console.log(passId);

      if(typeof idNumber === 'number'){
          navigate(`/app/${passId}`,{state:{track:true}})
      }
      else{
          console.log('sorry to fetch data')
      }
  }
    return(
        <>
        <div>
        <div className="relative isolate overflow-hidden w-[40%] bg-white rounded-lg border mx-auto ">
      <div className="px-6 py-14 sm:px-6 sm:py-20 lg:px-8">
      
      <SubLoginInputBox support={(value)=>{support(value)}} />

        <div className="mx-auto max-w-2xl text-center">
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to={condition}
              type='submit'
              className="rounded-md bg-[#3498db] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={logInInfo}
            >
              Log In
            </Link>
            <Link to='/create' className="text-sm font-semibold leading-6 text-[#34495e]">
              Create Account <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle cx={512} cy={512} r={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" />
        <defs>
          <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
            <stop stopColor="#7775D6" />
            <stop offset={1} stopColor="#E935C1" />
          </radialGradient>
        </defs>
      </svg>
    </div>
        </div>
        
        </>
    )
}
export default SubLoginBox;