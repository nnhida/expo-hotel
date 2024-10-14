
import React from 'react'
import Ui from './ui'
import { getAll } from '@/app/api/user/route'
import { revalidatePath } from 'next/cache';

export default async function page() {

    const dataUser = await getAll()

  return (
    <Ui user={dataUser}/>
  )
}

