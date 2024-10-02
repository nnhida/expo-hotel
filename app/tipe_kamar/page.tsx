import React from 'react'
import Ui from './ui'
import { getTipeKamar } from '../api/kamar/tipe_kamar/route'

export default async function Page() {

  const data = await getTipeKamar()

  return (
    <Ui dataTipeKamar={data}/>
  )
}
