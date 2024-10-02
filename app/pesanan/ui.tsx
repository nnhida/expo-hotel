'use client';

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Ipesanan } from '../component/type/type';

import { IoDocument } from "react-icons/io5";

interface pesananProps {
  dataPesanan: Ipesanan[]
}

export default function Ui({dataPesanan}: pesananProps) {


  function bgStatus(status: string) {
    if(status == 'BARU'){
      return "bg-blue-500"
    } else if(status == 'CHECK_IN') {
      return "bg-green-500"
    } else if(status == 'CHECK_OUT') {
      return "bg-red-500"
    }
  }

  const router = useRouter()
  return (
    <div className='pt-28 p-10 flex flex-col space-y-5'>
      <p className='text-4xl font-bold text-center text-blue-500'>Pesanan</p>
      <div className='w-full flex justify-end'>
        <button onClick={() => router.push('pesanan/pesan')} className='p-2 rounded-xl bg-orange-500 font-semibold text-white text-xl'>Pesan</button>
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
            <td className=' text-xl font-bold p-2'>Action</td>
          </tr>
        </thead>

        <tbody>
          {dataPesanan?.map((item) => (
            <tr>
              <td className='text-xl font-bold p-2'>{item.nomor_pemesanan}</td>
              <td className='text-xl font-bold p-2'>{item.tgl_pemesanan.getDate()+ '-' +item.tgl_pemesanan.getMonth()+'-'+item.tgl_pemesanan.getFullYear()}</td>
              <td className='text-xl font-bold p-2'>{item.tgl_check_in.getDate()+ '-' +item.tgl_check_in.getMonth()+'-'+item.tgl_check_in.getFullYear()}</td>
              <td className='text-xl font-bold p-2'>{item.tgl_check_out.getDate()+ '-' +item.tgl_check_out.getMonth()+'-'+item.tgl_check_out.getFullYear()}</td>
              <td className='text-xl font-bold p-2'>{item.jumlah_kamar}</td>
              <td className={` text-xl font-bold p-2`}>
                <p className={`${bgStatus(item.status_pemesanan)} w-max p-2 rounded-xl text-white`}>{item.status_pemesanan}</p>
              </td>
              <td className='p-2 '>
                <button onClick={() => router.push(`/pesanan/detail/${item.id_pemesanan}`)} className='bg-orange-500 hover:bg-orange-700 flex items-center p-2 rounded-xl'>
                  <IoDocument className='fill-white'/>
                  <p className='text-xl font-bold text-white'>Detail</p>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
