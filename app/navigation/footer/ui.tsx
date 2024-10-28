'use client';

import Image from 'next/image'
import Link from 'next/link';
import { IoLocationOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation';


interface footProps {
    session: any
}
export default function Ui({session}:footProps) {

    const urlString = usePathname()
    return (
        <div className={`${urlString === '/login'? 'hidden' : ''} w-full flex flex-col space-y-5 bg-blue-700 p-10`}>
            <div className='flex justify-between text-white'>
                <div className='flex flex-col space-y-5'>
                    <Image src={'/logo-white.png'} alt='logo' width={150} height={50} />
                    <div className='flex items-center space-x-2'>
                        <IoLocationOutline className='size-5 fill-white' />
                        <p className=''>Jl.cobaBuatHotel no.02, Kec.Ukk, Kab.SMK </p>
                    </div>
                </div>
                <div className={`${session?.data.role === 'ADMIN' || session?.data.role === 'RESEPSIONIS'? 'hidden': ''} flex space-x-10`}>
                    <div className='flex flex-col space-y-2'>
                        <p className='font-bold'>Beranda</p>
                        <div className='flex flex-col'>
                            <Link href={'#fasilitas'} className='hover:underline'>Fasilitas</Link>
                            <Link href={'#tipeKamar'} className='hover:underline'>Tipe Kamar</Link>
                        </div>
                    </div>
                    
                    <div className='flex flex-col space-y-2'>
                        <p className='font-bold'>Tipe Kamar</p>
                        <div className='flex flex-col'>
                            <Link href={'/tipe_kamar'} className='hover:underline'>Standar Room</Link>
                            <Link href={'/tipe_kamar'} className='hover:underline'>Superior Room</Link>
                        </div>
                    </div>
                    
                    <div className='flex flex-col space-y-2'>
                        <p className='font-bold'>Pesanan</p>
                        <div className='flex flex-col'>
                            <Link href={'/pesanan'} className='hover:underline'>Pesanan</Link>
                        </div>
                    </div>
                </div>

            </div>
            <hr />
            <div className='flex justify-between text-white'>
                <p>&copy; 2024 @Yusuf | All right reserved </p>
                <p> created with love by @Yusuf</p>
            </div>
        </div>
    )
}
