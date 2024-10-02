'use server';

import React from 'react'
import Ui from './ui'
import { getTipeKamar } from '@/app/api/kamar/tipe_kamar/route'
import { getKamar, kamarAvailable } from '@/app/api/kamar/routes'

export default async function page() {

    const tipekamar = await getTipeKamar()
    const kamar = await getKamar()
  return (
    <Ui dataTipeKamar={tipekamar} dataKamar={kamar}/>
  )
}
