import React from 'react'
import Ui from './ui'
import { getTipeKamar } from '../api/kamar/tipe_kamar/tipe_kamar'
import { getSession } from '@/lib/auth'

export default async function Page() {

  const data = await getTipeKamar()
  const auth = await getSession()

  return (
    <Ui dataTipeKamar={data} auth={auth}/>
  )
}
