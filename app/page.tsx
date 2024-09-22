"use client"

import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { RiCustomerService2Line } from "react-icons/ri";
// import { fetchTipeKamar } from "./route";

export default function Home() {

  const [tipeKamar, setTipeKamar] = useState <Array<any>>()


  // useEffect(() => {
  //   const prisma = new PrismaClient
    
  //   const fetch = async() => {
  //     try{
  //       const dataKamar = await fetchTipeKamar
  //       setTipeKamar(dataKamar)
  //       console.log(JSON.stringify(fetchTipeKamar))
  //     } catch(err) {

  //     }
  //   }


  //   fetch

  // }, [])
  return (
    <div className="">
      <div className="flex m-10 pl-20 pt-32 h-[85vh] bg-cover rounded-xl" style={{
        backgroundImage: "url('./hotelHome.jpg')"
      }}>
        <div className="flex flex-col space-y-10 w-2/5">
          <div className=" flex flex-col space-y-4">
            <p className="font-bold text-6xl">Wikusama Hotel</p>
            <p className="text-2xl w-3/5">Rasakan sensasi terbaik dari pelayanan hotel Wikusama Company yang dijamin tidak akan dilupakan</p>
            <button className="p-2 bg-orange-400 hover:bg-orange-500 w-max rounded-full font-bold text-white">Pesan Sekarang</button>
          </div>

          {/* <div className="flex flex-col space-y-3 bg-white bg-opacity-70 p-3 rounded-xl w-max">
            <p className="text-2xl font-bold">Pesan Sekarang</p>
            <form  className="flex bg-white rounded-md overflow-hidden">
              <div className="flex flex-col space-y-2 border-r-2 border-gray-200 p-2">
                <p>Tipe Hotel</p>
                <select className="focus:outline-none">
                  <option>Standar</option>
                  <option>Deluxe</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2 border-r-2 border-gray-200 p-2">
                <p>Check In</p>
                <input type="date" className="focus:outline-none"/>
              </div>
              <div className="flex flex-col space-y-2 p-2">
                <p>Check Out</p>
                <input type="date" className="focus:outline-none"/>
              </div>

              <button type="submit" className=" bg-blue-600 hover:bg-blue-800 p-2 transition-all">
                <IoMdSearch className="size-7 fill-white"/>
                </button>
            </form>
          </div> */}
        </div>
      </div>

      <div className=" absolute bottom-9 flex justify-center w-full">
        <form className="flex bg-white shadow-lg rounded-md overflow-hidden  ">
          <div className="border-r-2 px-4 my-4">
            <p className="font-bold">Tipe Hotel</p>
            <select className="focus:outline-none hover:cursor-pointer">
              <option>Standar</option>
              <option>Deluxe</option>
            </select>
          </div>
          <div className="border-r-2 px-4 my-4">
            <p className="font-bold">Check In</p>
            <input type="date" className="focus:outline-none " />
          </div>
          <div className="px-4 my-4">
            <p className="font-bold">Check Out</p>
            <input type="date" className="focus:outline-none " />
          </div>

          <button type="submit" className=" bg-blue-500 hover:bg-blue-800 py-2 px-4  transition-all">
            <IoMdSearch className="size-7 fill-white" />
          </button>
        </form>
      </div>

      <div className="h-max flex flex-col space-y-20 items-center p-10">
        <p className=" font-bold text-4xl text-center">Kenapa Memilih Kami</p>

        <div className="flex space-x-10">
          <div className="flex flex-col space-y-5 w-64 items-center">
            <div className="p-4 bg-slate-400 w-max rounded-full">
              <RiCustomerService2Line className="size-20"/>
            </div>

            <div className="flex flex-col space-y-2 text-center">
              <p className="text-2xl font-bold">Customer Service</p>
              <p>anda akan terhubung pada customer service kami seharian penuh untuk menjamin kualitas liburan anda</p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-5 w-64 items-center">
            <div className="p-4 bg-slate-400 w-max rounded-full">
              <RiCustomerService2Line className="size-20"/>
            </div>

            <div className="flex flex-col space-y-2 text-center">
              <p className="text-2xl font-bold">Customer Service</p>
              <p>anda akan terhubung pada customer service kami seharian penuh untuk menjamin kualitas liburan anda</p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-5 w-64 items-center">
            <div className="p-4 bg-slate-400 w-max rounded-full">
              <RiCustomerService2Line className="size-20"/>
            </div>

            <div className="flex flex-col space-y-2 text-center">
              <p className="text-2xl font-bold">Customer Service</p>
              <p>anda akan terhubung pada customer service kami seharian penuh untuk menjamin kualitas liburan anda</p>
            </div>
          </div>
          
        </div>

      </div>

      <div>

      </div>


    </div>
  );
}
