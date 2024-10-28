
import React from 'react'
import Ui from './ui'
import { getAll } from '@/app/api/user/route'
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';

export default async function page() {

    const dataUser = await getAll()
    const session = await getSession()

  return (
    <Ui user={dataUser} session ={session}/>
  )
}

