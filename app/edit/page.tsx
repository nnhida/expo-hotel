'use server';

import React from 'react'
import EditUser from '../component/editUser'
import { getSession } from '@/lib/auth'
import { findUser } from '../api/user/user'

export default async function page() {

  const session = await getSession()
  const data = session?.data
  return (
    <EditUser data={data}/>
  )
}
