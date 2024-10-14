import { findUser } from '@/app/api/user/route'
import EditUser from '@/app/component/editUser'
import { getSession } from '@/lib/auth'
import React from 'react'

export default async function page() {

  const session = await getSession()
  const data = session?.data.id_user
  const id = Number(data)
  const user = await findUser(id)
  return (
    <EditUser data={user}/>
  )
}
