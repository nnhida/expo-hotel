import React from 'react'
import EditUser from '../component/editUser'
import { getSession } from '@/lib/auth'

export default async function page() {

    const session = await getSession()
    const data = session?.data

  return (
    <EditUser user={data}/>
  )
}
