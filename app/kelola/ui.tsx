'use client';

import { IoPeopleSharp, IoPerson } from "react-icons/io5";
import { ImUserTie } from "react-icons/im";
import { FaUserGear, FaBed } from "react-icons/fa6";

import React, { useEffect, useState } from 'react'

interface UserData {
  total: number;
  admin: number;
  staff: number;
  tamu: number;
}

interface KamarData {
  total: number;
  standar: number;
  superior: number;
}

interface KelolaProps {
  userData: UserData;
  kamarData: KamarData;
}


export default function Ui({ userData, kamarData }: KelolaProps) {
  const [user, setUser] = useState<UserData>()
  const [kamar, setKamar] = useState<KamarData>()

  useEffect(() => {

    async function fetch() {


      setUser(userData)
      setKamar(kamarData)
    }

    fetch()
  }, [])

  return (
    <div className='pt-28 p-10 flex flex-col space-y-5'>
      <p className="font-bold text-3xl text-blue-500 text-center">Dashboard</p>
      <div className="flex flex-col space-y-2">
        <p className="text-2xl font-bold text-orange-500">Data User</p>
        <div className="flex space-x-10">
          <div className="flex items-center space-x-5 bg-slate-300 w-60 rounded-xl p-2">
            <IoPeopleSharp className="size-20" />
            <div>
              <p className=" text-xl font-bold">User</p>
              <p className=" text-xl font-bold">{user?.total}</p>
            </div>
          </div>
          <div className="flex items-center space-x-5 bg-slate-300 w-60 rounded-xl p-2">
            <FaUserGear className="size-20" />
            <div>
              <p className=" text-xl font-bold">Admin</p>
              <p className=" text-xl font-bold">{user?.admin}</p>
            </div>
          </div>
          <div className="flex items-center space-x-5 bg-slate-300 w-60 rounded-xl p-2">
            <ImUserTie className="size-20" />
            <div>
              <p className=" text-xl font-bold">Resepsionis</p>
              <p className=" text-xl font-bold">{user?.staff}</p>
            </div>
          </div>
          <div className="flex items-center space-x-5 bg-slate-300 w-60 rounded-xl p-2">
            <IoPerson className="size-20" />
            <div>
              <p className=" text-xl font-bold">Tamu</p>
              <p className=" text-xl font-bold">{user?.tamu}</p>
            </div>
          </div>
        </div>
      </div>

      {/* data kamar */}
      <div className="flex flex-col space-y-2">
        <p className="text-2xl font-bold text-orange-500">Data Kamar</p>
        <div className="flex space-x-10">
          <div className="flex items-center space-x-5 bg-slate-300 w-60 rounded-xl p-2">
            <FaBed className="size-20" />
            <div>
              <p className=" text-xl font-bold">Total Kamar</p>
              <p className=" text-xl font-bold">{kamar?.total}</p>
            </div>
          </div>
          <div className="flex items-center space-x-5 bg-slate-300 w-60 rounded-xl p-2">
            <FaBed className="size-20" />
            <div>
              <p className=" text-xl font-bold">Standar</p>
              <p className=" text-xl font-bold">{kamar?.standar}</p>
            </div>
          </div>
          <div className="flex items-center space-x-5 bg-slate-300 w-60 rounded-xl p-2">
            <FaBed className="size-20" />
            <div>
              <p className=" text-xl font-bold">Superior</p>
              <p className=" text-xl font-bold">{kamar?.superior}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
