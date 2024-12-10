'use server';

import { redirect } from 'next/navigation';
import Ui from './ui'
import { prisma } from '@/lib/prisma';
import { countKamar } from '../api/kamar/kamar';
import { countUser } from '../api/user/user';

export default async function Page() {

  const dataKamar = await countKamar()
  const dataUser = await countUser()

  
  return (
    <Ui userData={dataUser} kamarData={dataKamar}/>
  )
}

