'use server';

import React from 'react'
import Ui from './ui'
import { getTipeKamar } from '@/app/api/kamar/tipe_kamar/tipe_kamar'
import { getKamar, kamarAvailable } from '@/app/api/kamar/kamar'
import { getSession } from '@/lib/auth';

export default async function page() {

    const tipekamar = await getTipeKamar()
    const kamar = await getKamar()
    const user = await getSession()
    const data = user?.data.nama_user
  return (
    <Ui dataTipeKamar={tipekamar} dataKamar={kamar} namaUser={data}/>
  )
}
