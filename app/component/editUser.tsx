'use client';

import React, { useEffect, useState } from 'react'
import { Iuser } from './type/type'

import { MdCancel } from "react-icons/md";
import { FaUserLarge } from 'react-icons/fa6'
import { editUser } from '../api/user/route';

interface editProps {
  data:  any
}

export default function EditUser({ data }: editProps) {

  const [user, setUser] = useState<Iuser>()

  const [open, setOpen] = useState(false)

  const [id_user, setId_user] = useState()
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [foto, setFoto] = useState<File>()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const formData = new FormData()

    if (id_user) {
      formData.append('id_user',id_user)
    }
    if (nama) {
      formData.append('nama_user',nama)
    }
    if (email) {
      formData.append('email',email)
    }
    if (password) {
      formData.append('password',password)
    }
    if (foto) {
      formData.append('foto',foto)
    }

    await editUser(formData)

    setOpen((prevstate) => !prevstate)

  }

  function HandleEdit() {
    setId_user(data?.id_user)
    setNama(data?.nama_user)
    setEmail(data?.email)
    setPassword(data?.password)

    setOpen((prevstate) => !prevstate)
  }

  useEffect(() => {
    function fetch() {
      setUser(data)
    } 

    fetch()


  },[])


  return (
    <div>
      <div className='pt-28 p-10 flex flex-col space-y-10 justify-center items-center'>
        <p className='font-bold text-3xl text-blue-500'>Profile</p>
        <div className='flex space-x-10'>
          {data?.foto === null ?
              <FaUserLarge className="size-60 p-10 rounded-full bg-slate-200" />
            :
            <div className=' h-72 w-72 bg-black rounded-full bg-center bg-cover' style={{
              backgroundImage: `url('./upload/user/${data?.foto}')`
            }} />
          }

          <div className='flex flex-col space-y-5'>
            <div className='flex flex-col space-y-2 border-b-2 border-slate-200'>
              <p className='text-xl font-bold'>Nama User</p>
              <p>{data?.nama_user}</p>
            </div>
            <div className='flex flex-col space-y-2 border-b-2 border-slate-200'>
              <p className='text-xl font-bold'>Email User</p>
              <p>{data?.email}</p>
            </div>
            <div className='flex flex-col space-y-2 border-b-2 border-slate-200'>
              <p className='text-xl font-bold'>Password User</p>
              <p>{data?.password}</p>
            </div>
            <button onClick={HandleEdit} className='p-2 bg-orange-500 rounded-lg hover:bg-orange-700'>
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
                <p className='p-1 hidden'>ID User:</p>
                <p className='p-1'>Nama User:</p>
                <p className='p-1'>Email User:</p>
                <p className='p-1'>Password User:</p>
                <p className='p-1'>Foto User (optional):</p>
              </div>
              <div className='flex flex-col space-y-4'>
                <input type='number' name='id_user' value={id_user} readOnly className='hidden'/>
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
