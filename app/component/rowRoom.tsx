import {useRouter} from 'next/navigation'
import React from 'react'
import { Toaster, toast } from 'sonner'

interface rowRoomProps{
  nama_tipe_kamar: string,
  harga: number,
  foto: string,
  deskripsi: string,
  auth: any

}

export default function RowRoom({nama_tipe_kamar, harga, deskripsi, foto, auth}:rowRoomProps) {

  function coba() {
    if (!auth) {
        toast.error("you must login first")
    } else {
        router.push('/pesanan/pesan')
    }
}
  const router = useRouter()
  return (
    <div className='p-4 flex space-x-10 bg-white w-full rounded-2xl'>
      <Toaster richColors/>
        <div className='w-[500px] h-56 bg-slate-200 rounded-xl bg-center bg-cover' style={{backgroundImage:`url("/upload/tipe_kamar/${foto}")`}}/>
        <div className='flex flex-col space-y-2 w-2/3'>
            <p className='text-2xl font-bold'>{nama_tipe_kamar}</p>
            <p className='text-xl font-bold p-2 bg-green-500 w-max text-white rounded-xl'>Rp.{harga}</p>
            <p className=''>{deskripsi}</p>
            <button onClick={coba} className='p-2 bg-orange-500 hover:bg-orange-600 font-bold text-white rounded-lg'>Pesan</button>
        </div>
    </div>
  )
}
