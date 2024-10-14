'use client';

import { filterPesanan } from '@/app/api/pesan/route';
import { Ipesanan } from '@/app/component/type/type';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { IoDocument } from "react-icons/io5";

interface pesananProps {
  data: any
}

export default function Ui({data}: pesananProps) {

  const  [pesanan, setPesanan] = useState<Ipesanan[]>()

  const [check_in, setCheck_in] = useState<string>('')
  const [check_out, setCheck_out] = useState<string>('')


  function bgStatus(status: string) {
    if(status == 'BARU'){
      return "bg-blue-500"
    } else if(status == 'CHECK_IN') {
      return "bg-green-500"
    } else if(status == 'CHECK_OUT') {
      return "bg-red-500"
    }
  }


  async function handleFilter(e: React.FormEvent) {

    console.log(check_in)
    e.preventDefault()

    if (check_in && check_out) {
      const formData = new FormData()

    formData.append('check_in',check_in)
    formData.append('check_out',check_out)

    const filter = await filterPesanan(formData)
   
    setPesanan(filter)
    } else {
      setPesanan(data)
    }
  }

  useEffect(() => {
      function fetch() {
        setPesanan(data)
      }
      fetch()
  },[])

  return (
    <div className='pt-28 p-10 flex flex-col space-y-5'>
      <p className='text-4xl font-bold text-center text-blue-500'>Pesanan</p>
      <div className='flex flex-col space-y-2 p-2 w-max rounded-xl bg-blue-500'>
        <p className='text-xl text-white font-semibold'>Filter</p>
        <form onSubmit={handleFilter} className='flex space-x-5'>
          <input type='date' onChange={(e) => setCheck_in(e.target.value)} name='check_out'  className='rounded-md'/>
          <input type='date' onChange={(e) => setCheck_out(e.target.value)} name='check_out' className='rounded-md'/>
          <button type='submit' className='p-2 bg-blue-200'>cari</button>
        </form>

      </div>
      <table className='  rounded-2xl overflow-hidden'>
        <thead className=' bg-slate-500'>
          <tr className=''>
            <td className=' text-xl font-bold p-2'>Nomor Pemesanan</td>
            <td className=' text-xl font-bold p-2'>Tanggal Pemesanan</td>
            <td className=' text-xl font-bold p-2'>Tanggal Check In</td>
            <td className=' text-xl font-bold p-2'>Tanggal Check out</td>
            <td className=' text-xl font-bold p-2'>Jumlah Kamar</td>
            <td className=' text-xl font-bold p-2'>Status Pemesanan</td>
          </tr>
        </thead>

        <tbody>
          {pesanan?.map((item) => (
            <tr>
              <td className='text-xl font-bold p-2'>{item.nomor_pemesanan}</td>
              <td className='text-xl font-bold p-2'>{String(item.tgl_pemesanan)}</td>
              <td className='text-xl font-bold p-2'>{String(item.tgl_check_in)}</td>
              <td className='text-xl font-bold p-2'>{String(item.tgl_check_out)}</td>
              <td className='text-xl font-bold p-2'>{item.jumlah_kamar}</td>
              <td className={` text-xl font-bold p-2`}>
                <p className={`${bgStatus(item.status_pemesanan)} w-max p-2 rounded-xl text-white`}>{item.status_pemesanan}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
