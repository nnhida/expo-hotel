import { findUser } from '@/app/api/user/user'
import EditUser from '@/app/component/editUser'
import { getSession } from '@/lib/auth'
import React from 'react'

export default async function page() {

  const session = await getSession()
  const data = session?.data.id_user
  const user = await findUser(data!)
  return (
    <EditUser data={user}/>
  )
}
