'use client';

import { addUser } from '@/app/api/user/route';
import { Iuser } from '@/app/component/type/type';
import Image from 'next/image';
import React, { MouseEventHandler, useEffect, useState } from 'react'

import { FaTrash, FaPenAlt, FaPlus } from "react-icons/fa";
import { revalidatePath } from 'next/cache';
import { MdCancel } from 'react-icons/md';
import { useRouter } from 'next/router';
import { deleteUser, editUser } from '@/app/api/user/[id]/route';

interface userProps {
    dataUser: any
}

export default function Ui({ dataUser }: userProps) {

    const [user, setUser] = useState<Iuser[]>()
    const [open, setOpen] = useState(false)

    const [Id_user, setId_user] = useState('')
    const [nama_user, setNama_user] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    const [submit, setSubmit] = useState('')


    function handleEditForm ({id_user, nama_user, email, password, role} : any) {
        setId_user(id_user)
        setNama_user(nama_user)
        setEmail(email)
        setPassword(password)
        setRole(role)

        setSubmit('edit')
    }
    
    function handleAdd () {
        setId_user('')
        setNama_user('')
        setEmail('')
        setPassword('')
        setRole('')

        setSubmit('add')
    }


    function fetch() {
        setUser(dataUser)
    }
    useEffect(() => {

        fetch()
    }, [user])
    return (
        <div>
            <div className='pt-28 p-10 flex flex-col space-y-5'>
                <p className='text-blue-500 text-center font-bold text-3xl'>Daftar User</p>

                <div className='flex w-full justify-end'>
                    <button onClick={() => {
                        handleAdd()
                        setOpen((prevstate) => !prevstate)
                        }}
                        className='flex space-x-2 items-center bg-orange-500 hover:bg-orange-700 rounded-xl p-2'>
                        <FaPlus className='fill-white' />
                        <p className='font-semibold text-white'>Tambah</p>
                    </button>
                </div>

                <table className='rounded-lg overflow-hidden'>
                    <thead className=''>
                        <tr className=' bg-slate-300'>
                            <td className=' text-xl p-2'>Id User</td>
                            <td className=' text-xl p-2'>Nama</td>
                            <td className=' text-xl p-2'>Email</td>
                            <td className=' text-xl p-2'>Foto</td>
                            <td className=' text-xl p-2'>Role</td>
                            <td className=' text-xl p-2'>Action</td>
                        </tr>
                    </thead>

                    <tbody className=''>
                        {user?.map((item) => (
                            <tr className=' border-b-2 '>
                                <td className=' p-2'>{item.id_user}</td>
                                <td className=' p-2'>
                                    <p>{item.nama_user}</p>
                                </td>
                                <td className=' p-2'>{item.email}</td>
                                <td className=' p-2'>
                                    {item.foto === null? 
                                    <p>foto tidak tersedia</p> 
                                    : 
                                    <Image src={`/upload/user/${item.foto}`} alt={`nama file = ` + item.foto} width={50} height={20} />
                                    }
                                </td>
                                <td className=' p-2'>{item.role}</td>
                                <td className=' flex space-x-5 p-2'>
                                    <button onClick={() => {
                                        handleEditForm(item)
                                        setOpen((prevstate) => !prevstate)
                                    }} className='p-2 bg-green-500 flex space-x-2 items-center hover:bg-green-700 rounded-xl'>
                                        <FaPenAlt className='fill-white' />
                                        <p className='font-semibold text-white'>Edit</p>
                                    </button>
                                    <button onClick={async () => {
                                         if (confirm('Yakin ingin menghapus user ini?')) {
                                            await deleteUser(Number(item.id_user));
                                            revalidatePath('/', 'layout')
                                        }
                                    }}
                                        className='p-2 bg-red-500 flex space-x-2 items-center hover:bg-red-700  rounded-xl'>
                                        <FaTrash className='fill-white' />
                                        <p className='font-semibold text-white'>Delete</p>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={`${open ? '' : 'hidden'} fixed z-[99] top-0 w-screen h-screen bg-black bg-opacity-40 flex items-center justify-center`}>
                <div className=' flex flex-col space-y-5  p-5 rounded-xl bg-slate-200 '>
                    <div className='flex justify-end w-full'>
                        <button onClick={() => setOpen((prevstate) => !prevstate)}> <MdCancel className='fill-red-500 size-10' /></button>
                    </div>
                    <p className='text-center font-bold text-blue-500 text-3xl'>{submit === 'add'? "Tambah User":"Edit User" }</p>
                    <form action={submit === 'add' ? addUser : editUser} className="flex  ">
                        <div className=" flex flex-col space-y-5">
                            <p className='hidden'>id</p>
                            <p className="p-1">Name:</p>
                            <p className="p-1">Email:</p>
                            <p className="p-1">Password:</p>
                            <p className="p-1">Role:</p>
                            <p className="p-1">Foto(optional):</p>
                        </div>
                        <div className="flex flex-col space-y-5">
                            <input 
                                type='number'
                                name='id_user'
                                value={Id_user}
                                readOnly
                                className='hidden'/>
                            <input
                                type="text"
                                name="nama_user"
                                className="focus:outline-blue-500  rounded-lg py-1 pl-3"
                                value={nama_user}
                                onChange={(e) => setNama_user(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                className="focus:outline-blue-500  rounded-lg py-1 pl-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                className="focus:outline-blue-500  rounded-lg py-1 pl-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <select
                                name="role"
                                className="focus:outline-blue-500  rounded-lg py-1 pl-3"
                                required
                            >
                                <option value={role}>{role}</option>
                                <option value='ADMIN'>Admin</option>
                                <option value='RESEPSIONIS'>Resepsionis</option>
                                <option value='TAMU'>Tamu</option>
                            </select>
                            <input
                                type="file"
                                name="foto"
                                className="focus:outline-blue-500  rounded-lg py-1 pl-3"
                            />
                            <button type="submit" onClick={() => {
                                setOpen((prevstate) => !prevstate)
                                }} 
                                className="bg-blue-500 p-2 rounded-xl text-white font-bold">{submit === 'add'? "Tambah":"Edit" }</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
