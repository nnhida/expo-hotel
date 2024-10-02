import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'
import React from 'react'

interface cardRoomProps{
    nama_tipe_kamar: string,
    harga: number,
    foto: string,
    deskripsi: string,

}

export default function CardRoom({nama_tipe_kamar,harga,foto,deskripsi}:cardRoomProps) {

  const router = useRouter()
  return (
    <div className='group relative w-max'>
        <div className='w-60 h-96 relative overflow-hidden shadow-xl rounded-3xl bg-slate-400 bg-center bg-cover' style={{backgroundImage: `url("/upload/tipe_kamar/${foto}")`}}>
            <div className=' absolute -bottom-80 group-hover:bottom-0 p-5 flex flex-col space-y-2 h-max bg-white bg-opacity-50 transition-all'>
                <p className='text-2xl font-bold'>{nama_tipe_kamar}</p>
                <p className='text-lg text-white w-max p-1 rounded-xl bg-green-400 font-bold'>Rp. {harga}</p>
                <p className='line-clamp-3'>{deskripsi}</p>
                <div className='flex justify-around'>
                <button onClick={() => router.push('/pesanan/pesan')} className='bg-orange-500 p-2 rounded-lg hover:bg-orange-700 text-white font-semibold'>Pesan</button>
                <button onClick={() => router.push('/tipe_kamar')} className='bg-blue-500 p-2 rounded-lg hover:bg-blue-700 text-white font-semibold'>Detail</button>
                </div>
            </div>
            
        </div>
        <p className='group-hover:bottom-10 bottom-0  relative -z-10 transition-all text-center font-bold text-2xl'>{nama_tipe_kamar}</p>
    </div>
  )
}
