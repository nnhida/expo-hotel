import React from 'react'
import Ui from './ui'
import { getKamar } from '@/app/api/kamar/routes'
import { getTipeKamar } from '@/app/api/kamar/tipe_kamar/route'

export default async function page() {

    const kamar = await getKamar()
    const tipeKamar = await getTipeKamar()
  return (
    <Ui dataKamar={kamar} dataTipekamar={tipeKamar}/>
  )
}
