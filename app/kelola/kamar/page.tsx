import React from 'react'
import Ui from './ui'
import { getKamar } from '@/app/api/kamar/routes'
import { getTipeKamar } from '@/app/api/kamar/tipe_kamar/route'
import { getSession } from '@/lib/auth'

export default async function page() {

    const kamar = await getKamar()
    const tipeKamar = await getTipeKamar()
    const session = await getSession()
  return (
    <Ui kamar={kamar} tipekamar={tipeKamar} session={session}/>
  )
}
