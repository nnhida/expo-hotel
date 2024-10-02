import React from 'react'
import Ui from './ui'
import { getPesanan } from '../api/pesan/route'

export default async function page() {

  const data = await getPesanan()

  return (
    <Ui dataPesanan={data}/>
  )
}
