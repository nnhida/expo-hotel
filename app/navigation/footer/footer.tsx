'use server';
import React from 'react'
import Ui from './ui'
import { getSession } from '@/lib/auth'

export default async function Footer() {

  const session = await getSession()
  return (
    <div>
        <Ui session={session}/>
    </div>
  )
}
