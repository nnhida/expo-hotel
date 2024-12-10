import React from 'react'
import Ui from './ui'
import { getPesanan } from '@/app/api/pesan/pesan'

export default async function page() {

  const data = await getPesanan()

  return (
    <Ui data={data}/>
  )
}
