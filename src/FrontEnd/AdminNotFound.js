import React from 'react';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';

function AdminNotFound({conditionAdmin}){

    const goBack=()=>{
      conditionAdmin(false)
    }
    return(
        <>
            <main className="relative isolate min-h-full">
        <img
          src="https://images.unsplash.com/photo-1625597838610-0d28183d9855?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGVycm9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-top rounded-md"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <p className="text-base font-semibold leading-8 text-white">OOPS!!</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Sorry! Not match</h1>
          <p className="mt-4 text-base text-white/70 sm:mt-6">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex justify-center">
          <button
        type="button"
        onClick={goBack}
        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <ArrowLongLeftIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Go back
      </button>
          </div>
        </div>
      </main>
        </>
    )
}
export default AdminNotFound;