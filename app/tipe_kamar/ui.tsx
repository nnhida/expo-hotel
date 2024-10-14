"use client";

import React, { useEffect, useState } from 'react'
import RowRoom from '../component/rowRoom'
import { ITipekamar } from '../component/type/type'

interface tipekamarprops{
  dataTipeKamar: any
}

export default function Ui({dataTipeKamar}:tipekamarprops) {

  const [tipeKamar, setTipeKamar] = useState<ITipekamar[]>()


  useEffect(() => {

      async function fetch() {
          try {
              const data = dataTipeKamar
              setTipeKamar(data)
          } catch (err) {
              console.log(err)
          }
      }



      fetch()

  }, [])
  return (
    <div className='pt-28 p-10 flex flex-col space-y-5'>
        <p className='text-4xl font-bold text-center text-blue-500'>Tipe Kamar</p>
        {tipeKamar?.map((item) => (
          <RowRoom nama_tipe_kamar={item.nama_tipe_kamar} harga={item.harga} deskripsi={item.deskripsi} foto={item.foto} />
        ))}
    </div>
  )
}
