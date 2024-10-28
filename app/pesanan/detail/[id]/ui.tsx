'use client';

import { Idetail, IKamar, Ipesanan, ITipekamar } from '@/app/component/type/type';
import Image from 'next/image'
import React from 'react'
import { IoMdDownload } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


interface detailProps {
    pemesanan: Ipesanan,
    detail: Idetail[],
    kamar: IKamar[] | undefined,
    tipeKamar: ITipekamar[],
}

export default function Ui({ pemesanan, detail, kamar, tipeKamar }: detailProps) {


    const { id } = useParams()
    const router = useRouter()

    const totalHarga = () => {
        let harga = 0
        {
            detail.forEach((item) => {
                harga += item.harga
            })
        }

        return harga
    }

    const nomorKamar = () => {
        let nomor: number[] = [];

        detail.forEach((item) => {
            let noKamar = kamar?.find((k) => k.id_kamar === item.id_kamar);
            if (noKamar?.nomor_kamar) {
                nomor.push(noKamar.nomor_kamar);
            }
        });

        return nomor.join(', '); // Join with a comma and space
    };




    const namaTipe = (id: any) => {
        if (id != null) {
            const tipe = tipeKamar.find((item) => item.id_tipe_kamar === id)

            return tipe?.nama_tipe_kamar
        }
    }

    async function download() {
        const html2pdf = await require('html2pdf.js')
        const elemet = document.querySelector('#download')
        html2pdf(elemet, {
            margin: 20
        });
    }

    // const nomorKamar = () => {
    //     return detail.map((item) => {
    //         const noKamar = kamar.find((k) => k.id_kamar === item.id_kamar);
    //         return noKamar?.nomor_kamar; // Use optional chaining to avoid errors
    //     }).filter(Boolean); // Filter out any undefined values
    // };

    return (
        <div className='pt-28 p-10 flex items-center flex-col space-y-5'>
            <div className='w-full'>
                <button onClick={() => router.push('/pesanan')}>
                    <MdCancel className='size-16 fill-red-500 active:scale-75 transition-all' />
                </button>
            </div>
            <p className='text-center text-blue-500 font-bold text-3xl'>Detail pemesanan</p>
            <div id='download' className=' w-2/3 border-2 rounded-xl border-black shadow-2xl'>
                <div className='p-5 flex flex-col space-y-10'>
                    <div className='flex justify-between'>
                        <Image src={'/logo.png'} width={150} height={40} alt="logo" />
                        <button onClick={download} data-html2canvas-ignore className='p-2 bg-white flex space-x-2 items-center rounded-xl active:scale-75 transition-all'>
                            <IoMdDownload />
                            <p>Download</p>
                        </button>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className=' font-bold text-2xl'>Hotel Wikusama</p>
                        <p>No. {pemesanan?.nomor_pemesanan}</p>
                    </div>

                    <p className='text-3xl'>RP.{totalHarga().toLocaleString("id-ID", { currency: "IDR" })}</p>

                    <div className='flex space-x-5'>
                        <div className='flex flex-col space-y-2'>
                            <p>Nama Hotel:</p>
                            <p>Nama Pemesan:</p>
                            <p>tanggal pemesanan:</p>
                            <p>tanggal check in:</p>
                            <p>tanggal check out:</p>
                            <p>nama tamu:</p>
                            <p>nomor kamar:</p>
                            <p>tipe kamar:</p>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <p>Hotel Wikusama</p>
                            <p>{pemesanan?.nama_pemesanan}</p>
                            <p>{new Date(pemesanan?.tgl_pemesanan).toLocaleDateString()}</p>
                            <p>{new Date(pemesanan?.tgl_check_in).toLocaleDateString()}</p>
                            <p>{new Date(pemesanan?.tgl_check_out).toLocaleDateString()}</p>
                            <p>{pemesanan?.nama_tamu}</p>
                            <p>{nomorKamar()}</p>
                            <p>{namaTipe(pemesanan?.id_tipe_kamar)}</p>
                        </div>
                    </div>

                    <p className='text-center font-bold text-3xl'>
                        Terima Kasih Telah memilih Hotel Wikusama
                    </p>
                </div>
            </div>
        </div>
    )
}
