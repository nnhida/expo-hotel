'use client';

import React, { useEffect, useState } from 'react'
import { Iuser } from './type/type'

import { MdCancel } from "react-icons/md";
import { FaUserLarge } from 'react-icons/fa6'
import { editUser } from '../api/user/[id]/route';

interface editProps {
  user: Iuser | undefined
}

export default function EditUser({ user }: editProps) {

  const [open, setOpen] = useState(false)

  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [foto, setFoto] = useState<File>()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const formData = new FormData()

    if (nama) {
      formData.append('nama_user',nama)
    }
    if (email) {
      formData.append('email',nama)
    }
    if (password) {
      formData.append('password',password)
    }
    if (foto) {
      formData.append('foto',foto)
    }

    const data = await editUser(formData)

    if(data.ok) {
        alert(data?.message)
    } else {
      alert(data?.message)
    }
  }

  useEffect(() => {
    setNama(String(user?.nama_user))
    setEmail(String(user?.email))
    setPassword(String(user?.password))


  },[])


  return (
    <div>
      <div className='pt-28 p-10 flex flex-col space-y-10 justify-center items-center'>
        <p className='font-bold text-3xl text-blue-500'>Profile</p>
        <div className='flex space-x-10'>
          {user?.foto === null ?
              <FaUserLarge className="size-60 p-10 rounded-full bg-slate-200" />
            :
            <div className=' h-72 w-72 bg-black rounded-full bg-center bg-cover' style={{
              backgroundImage: `url('./upload/user/${user?.foto}')`
            }} />
          }

          <div className='flex flex-col space-y-5'>
            <div className='flex flex-col space-y-2 border-b-2 border-slate-200'>
              <p className='text-xl font-bold'>Nama User</p>
              <p>{user?.nama_user}</p>
            </div>
            <div className='flex flex-col space-y-2 border-b-2 border-slate-200'>
              <p className='text-xl font-bold'>Email User</p>
              <p>{user?.email}</p>
            </div>
            <div className='flex flex-col space-y-2 border-b-2 border-slate-200'>
              <p className='text-xl font-bold'>Password User</p>
              <p>{user?.password}</p>
            </div>
            <button onClick={() => setOpen((prevstate) => !prevstate)} className='p-2 bg-orange-500 rounded-lg hover:bg-orange-700'>
              <p className='text-xl font-semibold text-white'>Edit</p>
            </button>
          </div>
        </div>
      </div>



      <div className={`${open? 'scale-100 opacity-100': 'scale-0 opacity-0'} fixed z-[99] top-0 bg-black bg-opacity-40 h-screen w-screen flex justify-center items-center transition-all`}>
        <div className='flex flex-col space-y-5 items-center bg-white p-5 w-max rounded-xl'>

          <button onClick={() => setOpen((prevstate) => !prevstate)} className='flex justify-end w-full '>
            <MdCancel className='size-14 fill-red-500'/>
          </button>
            <p className='text-3xl font-bold text-blue-500'>Edit Profile</p>

            <form onSubmit={handleSubmit} className='flex space-x-5'>
              <div className='flex flex-col space-y-4'>
                <p className='p-1'>Nama User:</p>
                <p className='p-1'>Email User:</p>
                <p className='p-1'>Password User:</p>
                <p className='p-1'>Foto User (optional):</p>
              </div>
              <div className='flex flex-col space-y-4'>
                <input type='text' name='nama_user' value={nama} onChange={(e) => setNama(e.target.value)} className='border-2 border-blue-200 focus:outline-blue-500 p-1 rounded-lg'/>
                <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='border-2 border-blue-200 focus:outline-blue-500 p-1 rounded-lg'/>
                <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} className='border-2 border-blue-200 focus:outline-blue-500 p-1 rounded-lg'/>
                <input type='file' name='foto' onChange={(e) => setFoto(e.target.files?.[0])} className='p-1'/>

                <button type='submit' className='p-2 bg-blue-500 rounded-xl'> 
                  <p className='text-xl font-semibold text-white'>Edit Profile</p>
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}
