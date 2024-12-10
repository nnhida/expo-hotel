'use server';

import React from 'react'
import Ui from './ui'
import { getPesananId } from '@/app/api/pesan/pesan'
import { getDetailId } from '@/app/api/pesan/detail/detail'
import { getKamar } from '@/app/api/kamar/kamar'
import { getTipeKamar } from '@/app/api/kamar/tipe_kamar/tipe_kamar'

export default async function page({params} : {params: { id: string}}) {

  const {id} = params

  const pesanan = await getPesananId(String(id))
  const detail = await getDetailId(String(id));
  const kamar = await getKamar()
  const tipe_kamar = await getTipeKamar()
  return (
    <Ui pemesanan={pesanan} detail={detail} kamar={kamar} tipeKamar={tipe_kamar}/>
  )
}
