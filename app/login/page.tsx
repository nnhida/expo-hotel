'use client';


import React, { useEffect, useState } from "react";
import {login, register } from "../api/user/route";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

import { IoArrowBack } from "react-icons/io5";
import {Toaster, toast } from "sonner";


export default function Page() {
  const [form, setForm] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const changeFrom = () => {
    if (form == 'login') {
      setForm('regis')
    } else {
      setForm('login')
    }
  }

  async function formAction(e: React.FormEvent) {
    e.preventDefault()
    const formdata = new FormData()

    if(name) formdata.append("nama_user", name)
    if(email) formdata.append("email", email)
    if(password) formdata.append("password", password)

      if (form === "login") {
        const data = await login(formdata)
        if(data?.error) {
          toast.error(data?.error)
        } else {
          toast.success(data?.message)
          router.push(String(data?.redirect))
        }
      } else if (form === "regis") {
        const data = await register(formdata)
        if(data?.error) {
          toast.error(data?.error)
        }else {
          toast.success(data?.message)
          router.push(String(data?.redirect))
        }
      }
  }

  useEffect(() => {
    // checkSession
  },[])


  return (
    <div className="flex items-center justify-center h-screen bg-blue-300">
      <Toaster richColors/>
      <div className="flex justify-end bg-slate-100 rounded-3xl w-1/2 shadow-xl overflow-hidde ">
        <div className=" w-2/5  bg-center  bg-cover  " style={{ backgroundImage: "url('./hotelRegis.jpg')" }} />
        
        <div className="flex flex-col items-center w-3/5 space-y-5 p-10">
          <div className="flex w-full justify-end">
            <button onClick={() => router.push("/home")} className="bg-red-400 p-2 rounded-lg active:scale-75 transition-all">
              <IoArrowBack className="size-5"/>
            </button>
          </div>

          <p>Hotel Wikusama</p>
          <div className="flex space-x-5 bg-white p-1 rounded-full">
            <button onClick={changeFrom} className={`${form == 'login' ? 'bg-blue-500 text-white' : ''} p-2 rounded-full font-semibold transition-all`}>Login</button>
            <button onClick={changeFrom} className={`${form == 'regis' ? 'bg-blue-500 text-white' : ''} p-2 rounded-full font-semibold transition-all`}>Register</button>
          </div>
          {form == 'regis' ?
            <form onSubmit={formAction} className="flex justify-between w-full ">
              <div className=" flex flex-col space-y-5">
                <p className="p-1">Name:</p>
                <p className="p-1">Email:</p>
                <p className="p-1">Password:</p>
              </div>
              <div className="flex flex-col space-y-5">
                <input
                  type="text"
                  name="nama_user"
                  onChange={(e) => setName(e.target.value)}
                  className="focus:outline-blue-500  rounded-lg py-1 pl-3"
                  required
                />
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:outline-blue-500  rounded-lg py-1 pl-3"
                  required
                />
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:outline-blue-500  rounded-lg py-1 pl-3"
                  required
                />
              <button type="submit" className="bg-blue-500 p-2 rounded-xl text-white font-bold active:scale-75 transition-all">Register</button>
              </div>
            </form>
            :
            <form onSubmit={formAction} className="flex justify-between w-full">
              <div className=" flex flex-col space-y-5">
                <p className="p-1">Email:</p>
                <p className="p-1">Password:</p>
              </div>
              <div className="flex flex-col space-y-5">
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className=" focus:outline-blue-500  rounded-lg py-1 pl-3"
                  required
                />
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className=" focus:outline-blue-500  rounded-lg py-1 pl-3"
                  required
                />
              <button type="submit" className="bg-blue-500 p-2 rounded-xl text-white font-bold active:scale-75 transition-all">Login</button>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  );
}
