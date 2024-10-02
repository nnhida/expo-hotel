'use client';


import { useEffect, useState } from "react";
import { addUser, login } from "../api/user/route";
import { redirect } from "next/navigation";


export default function Page() {
  const [form, setForm] = useState('login')

  const changeFrom = () => {
    if (form == 'login') {
      setForm('regis')
    } else {
      setForm('login')
    }
  }

  useEffect(() => {
    // checkSession
  },[])


  return (
    <div className="flex items-center justify-center h-screen bg-blue-300">
      <div className="flex justify-end bg-slate-100 rounded-3xl h-2/3 w-1/2 overflow-hidden shadow-xl ">
        <div className=" w-2/5  bg-center  bg-cover  " style={{ backgroundImage: "url('./hotelRegis.jpg')" }} />
        
        <div className="flex flex-col items-center w-3/5 space-y-5 p-10">
          <p>Hotel Wikusama</p>
          <div className="flex space-x-5 bg-white p-1 rounded-full">
            <button onClick={changeFrom} className={`${form == 'login' ? 'bg-blue-500 text-white' : ''} p-2 rounded-full font-semibold transition-all`}>Login</button>
            <button onClick={changeFrom} className={`${form == 'regis' ? 'bg-blue-500 text-white' : ''} p-2 rounded-full font-semibold transition-all`}>Register</button>
          </div>
          {form == 'regis' ?
            <form action={addUser} className="flex justify-between w-full ">
              <div className=" flex flex-col space-y-5">
                <p className="p-1">Name:</p>
                <p className="p-1">Email:</p>
                <p className="p-1">Password:</p>
              </div>
              <div className="flex flex-col space-y-5">
                <input
                  type="text"
                  name="nama_user"
                  className="focus:outline-blue-500  rounded-lg py-1 pl-3"
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="focus:outline-blue-500  rounded-lg py-1 pl-3"
                  required
                />
                <input
                  type="password"
                  name="password"
                  className="focus:outline-blue-500  rounded-lg py-1 pl-3"
                  required
                />
              <button type="submit" className="bg-blue-500 p-2 rounded-xl text-white font-bold">Register</button>
              </div>
            </form>
            :
            <form action={login} className="flex justify-between w-full">
              <div className=" flex flex-col space-y-5">
                <p className="p-1">Email:</p>
                <p className="p-1">Password:</p>
              </div>
              <div className="flex flex-col space-y-5">
                <input
                  type="email"
                  name="email"
                  className=" focus:outline-blue-500  rounded-lg py-1 pl-3"
                  required
                />
                <input
                  type="password"
                  name="password"
                  className=" focus:outline-blue-500  rounded-lg py-1 pl-3"
                  required
                />
              <button type="submit" className="bg-blue-500 p-2 rounded-xl text-white font-bold">Login</button>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  );
}
