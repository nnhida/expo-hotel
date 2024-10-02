'use server';

import React from 'react'
import Ui from './ui'
import { getPesananId } from '@/app/api/pesan/route'
import { getDetailId } from '@/app/api/pesan/detail/route'
import { getKamar } from '@/app/api/kamar/routes'
import { getTipeKamar } from '@/app/api/kamar/tipe_kamar/route'

export default async function page({params} : {params: { id: string}}) {

  const {id} = params

  const pesanan = await getPesananId(Number(id))
  const detail = await getDetailId(Number(id));
  const kamar = await getKamar()
  const tipe_kamar = await getTipeKamar()
  return (
    <Ui pemesanan={pesanan} detail={detail} kamar={kamar} tipeKamar={tipe_kamar}/>
  )
}
