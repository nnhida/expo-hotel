import React from 'react'
import Ui from './ui'
import { getPesanan, getPesananId, getPesananUser } from '../api/pesan/route'
import { getSession } from '@/lib/auth'

export default async function page() {
  const data = await getPesananUser()

  return (
    <Ui dataPesanan={data}/>
  )
}
