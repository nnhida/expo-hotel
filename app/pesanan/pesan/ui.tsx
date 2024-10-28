'use client';

import { kamarAvailable } from '@/app/api/kamar/routes';
import { addPesanan } from '@/app/api/pesan/route';
import { IKamar, ITipekamar } from '@/app/component/type/type'
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation'; 
import React, { useEffect, useState } from 'react'

import { IoArrowBack } from "react-icons/io5";
import { toast, Toaster } from 'sonner';

interface pesanProps {
    dataTipeKamar: any
    dataKamar: any
    namaUser: any
}

export default function Ui({ dataTipeKamar, dataKamar, namaUser }: pesanProps) {

    const [tipekamar, setTipeKamar] = useState<ITipekamar[]>()

    const [id_tipe_kamar, setId_tipe_kamar] = useState('')
    const [nama_tamu, setNama_tamu] = useState('')
    const [tgl_check_in, setTgl_check_in] = useState<string>('')
    const [Tgl_check_out, setTgl_check_out] = useState<string>('')
    const [kamarPesan, setKamarPesan] = useState<Array<number> | undefined>()



    const [kamar, setKamar] = useState<IKamar[]>()
    const [kamarAvail, setKamarAvail] = useState<number[]>([])

    const router = useRouter()

    function submitKamar(id: any) {
        if (kamarPesan?.includes(id)) {
            // If id already exists, remove it
            setKamarPesan(kamarPesan?.filter((item) => item !== id));
            
        } else {
            // If id doesn't exist, add it
            setKamarPesan([...kamarPesan || [], id]);
            
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('id_tipe_kamar', id_tipe_kamar)
        formData.append('tgl_check_in', tgl_check_in)
        formData.append('tgl_check_out', Tgl_check_out)
        formData.append('nama_tamu', nama_tamu)
        {kamarPesan?.forEach((item) => {
            formData.append('id_kamar', String(item)) // Convert item to string
            
        })}

        // if (id_tipe_kamar) {
            
        // }
        //  if (tgl_check_in) {
        // }
        //  if (Tgl_check_out) {
        // }
        // if (kamarPesan) {
           
        // }

       const result = await addPesanan(formData)
       if (result.error) {
        toast.error(result.error)
       } else {
        toast.success(result.message)
        router.push(String(result.redirect))
       }
    }

    useEffect(() => {
        function fetch() {
            setTipeKamar(dataTipeKamar)
            setKamar(dataKamar)
            setNama_tamu(namaUser)
        }
        fetch()

    }, [])

    useEffect(() => {
        const fetchKamarAvail = async () => {
            setKamarPesan([])
          if (tgl_check_in && Tgl_check_out) {
            const available = await kamarAvailable(id_tipe_kamar, tgl_check_in, Tgl_check_out);
            setKamarAvail(available);
          }
        };
        fetchKamarAvail();
      }, [tgl_check_in, Tgl_check_out, id_tipe_kamar]);

    return (
        <div className='pt-28 p-10 flex flex-col items-center space-y-5'>
            <Toaster richColors/>
            <div className='w-1/2'>
                <button onClick={() => router.push('/pesanan')} className='p-2 bg-orange-500 rounded-xl active:scale-75 transition-all'>
                    <IoArrowBack className='size-10 stroke-white'/>
                </button>
            </div>
            <p className='text-3xl text-center font-bold text-blue-500'>Pesan Kamar</p>
            <form onSubmit={handleSubmit} className='flex space-x-5'>
                <div className='flex flex-col space-y-5'>
                    <p>Tipe Kamar</p>
                    <p>Nama Tamu: </p>
                    <p>Tanggal Check in: </p>
                    <p>Tanggal Check out: </p>
                    <p>kamar yang tersedia: </p>
                </div>

                <div className='flex flex-col space-y-5'>
                    <select name='id_tipe_kamar' value={id_tipe_kamar} onChange={async (e) => {
                        setId_tipe_kamar(e.target.value);
                    }} required>
                        <option>Pilih Tipe Kamar</option>
                        {tipekamar?.map((item) => (
                            <option value={item.id_tipe_kamar}>{item.nama_tipe_kamar}</option>
                        ))}
                    </select>
                    <input type='text' name='nama_tamu' value={nama_tamu} onChange={async (e) => {
                        setNama_tamu(e.target.value)
                    }} required/>
                    <input type='date' name='tgl_check_in' value={tgl_check_in} onChange={async (e) => {
                        setTgl_check_in(e.target.value)
                    }} required/>
                    <input type='date' name='tgl_check_out' value={Tgl_check_out} onChange={async (e) => {
                        setTgl_check_out(e.target.value)
                    }} required/>

                    <div className='grid gap-5 grid-cols-5'>
                        {kamar?.map((item) => (
                            <div>
                                <input id={JSON.stringify(item.id_kamar)} name='id_kamar' type='checkbox' onChange={() => submitKamar(item.id_kamar)} className='hidden peer' checked={kamarPesan?.includes(Number(item.id_kamar))} disabled={kamarAvail?.includes(item.id_kamar!) || item.id_tipe_kamar !== Number(id_tipe_kamar)} />
                                <label htmlFor={JSON.stringify(item.id_kamar)} className={` py-2 px-3 rounded-lg peer-disabled:opacity-50 peer-checked:bg-green-400 peer-checked:shadow-2xl peer-checked:text-white bg-white font-semibold hover:cursor-pointer transition-all`}>{item.nomor_kamar}</label>
                            </div>
                        ))}
                    </div>

                    <button 
                        
                        type='submit' 
                        className='p-2 rounded-xl bg-orange-500 font-semibold text-white hover:bg-orange-600 active:scale-75 transition-all'>
                            Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
