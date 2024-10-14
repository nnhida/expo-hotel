'use server';

import React from 'react'
import EditUser from '../component/editUser'
import { getSession } from '@/lib/auth'
import { findUser } from '../api/user/route'

export default async function page() {

  const session = await getSession()
  const data = session?.data.id_user
  const id = Number(data)
  const user = await findUser(id)
  return (
    <EditUser data={user}/>
  )
}
