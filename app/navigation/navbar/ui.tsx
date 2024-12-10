'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { logout } from "../../api/user/user";
import { Iuser } from "../../component/type/type";

import { IoMdArrowDropdown } from "react-icons/io";
import { FaUserLarge } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { Toaster, toast } from 'sonner'

interface navProps {
    session: Iuser | undefined
}

export default function Ui({ session }: navProps) {

    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState<Iuser>()
    const [menu, setMenu] = useState(false)
    const urlString = usePathname()

    function handleMenu() {
        if (menu == false) {
            setMenu(true)

        } else {
            setMenu(false)

        }
    }

    const bgRole = (role: any) => {
        if (role === 'ADMIN') {
            return "bg-blue-500"
        } else {
            return "bg-orange-500"
        }
    }
    // const bgRole = (role: any) => {
    //     if (role === 'ADMIN') {
    //         return "bg-blue-500"
    //     } else {
    //         return "bg-orange-500"
    //     }
    // }


    // function handleNav() {

    //     console.log(urlString)

    //     if (urlString.includes('/tipe_kamar')) {
    //         setNav('tipeKamar')
    //     } else if (urlString.includes('/home')) {
    //         setNav('home')
    //     } else if (urlString.includes(('/pesanan' || '/kelola/pesanan'))) {
    //         setNav('pesanan')
    //     } else if (urlString.includes('/kelola')) {
    //         setNav('kelola')
    //     } else if (urlString.includes('/kelola/user')) {
    //         setNav('user')
    //     } else if (urlString.includes('/kelola/kamar')) {
    //         setNav('kamar')
    //     }
    //     console.log(nav)
    // }

    useEffect(() => {
        async function fetchdata() {
            const data = session;
            if (!data) {
                setAuth(false)
            } else {

                setAuth(true)
            }
        }
        fetchdata()
        // handleNav()
    }, [urlString])

    return (
        <div className={`${urlString === '/login'? 'hidden' : ''} fixed z-50 w-full top-0`}>
            <Toaster/>
            <div className='flex relative  z-20 items-center justify-between py-6 px-10 bg-white '>
                <Image src={'/logo.png'} width={100} height={40} alt="logo" />

                {urlString.includes( '/kelola') ?
                    <div className={`flex space-x-5 font-semibold text-xl`}>
                        <Link href={'/kelola'} className={`${urlString === '/kelola' ? 'border-b-2' : 'hover:border-b-2'} border-black transition-all`}>Beranda</Link>
                        <Link href={'/kelola/user'} className={`${urlString === '/kelola/user' ? 'border-b-2' : 'hover:border-b-2'} border-black transition-all`}>User</Link>
                        <Link href={'/kelola/kamar'} className={`${urlString === '/kelola/kamar' ? 'border-b-2' : 'hover:border-b-2'} border-black transition-all`}>Kamar</Link>
                        <Link href={'/kelola/pesanan'} className={`${urlString === '/kelola/pesanan' ? 'border-b-2' : 'hover:border-b-2'} border-black transition-all`}>Pesanan</Link>
                    </div>
                    :

                    <div className={`flex space-x-5 font-semibold text-xl`}>
                        <Link href={'/home'} className={`${urlString === '/home' ? 'border-b-2' : 'hover:border-b-2'} border-black transition-all`}>Beranda</Link>
                        <Link href={'/tipe_kamar'} className={`${urlString === '/tipeKamar' ? 'border-b-2' : 'hover:border-b-2'} border-black transition-all`}>Tipe Kamar</Link>
                        <Link href={auth ? '/pesanan' : '/login'} className={`${urlString === '/pesanan' ? 'border-b-2' : 'hover:border-b-2'} border-black transition-all`}>Pesanan</Link>
                    </div>}

                {auth ?
                    <div>
                        <button onClick={handleMenu} className="flex space-x-2 items-center">
                            <p className={`${session !== undefined && session?.role === 'TAMU'? 'hidden': ''} ${bgRole(session?.role)} px-1 rounded-md text-white `}>{(session?.role!).toLowerCase()}</p>
                            {session?.foto === null ? 
                                <div className="p-3 bg-slate-200 rounded-full">
                                    <FaUserLarge className="size-5" />
                                </div> 
                                : 
                                <img src={`/upload/user/${session?.foto}`} className="w-10 h-10 rounded-full" />}
                            <p className="font-semibold text-xl">{session?.nama_user}</p>
                            <IoMdArrowDropdown className="size-5" />
                        </button>
                    </div>
                    :
                    <Link href={'/login'}>
                        <button className="p-2 font-bold text-white bg-blue-500 rounded-xl">Sign In</button>
                    </Link>

                }
            </div>
            <div className={`${menu ? 'top-24' : 'top-0'} absolute z-10 right-12 bg-white shadow-2xl w-32 overflow-hidden rounded-lg transition-all `}>
                <Link onClick={handleMenu} href={urlString.includes('/kelola') ? '/kelola/edit' : '/edit'} className=''>
                    <p className="text-xl hover:bg-slate-100 w-ful p-2 font-semibold text-center">Edit Profile</p>
                </Link>
                <form action={logout} className="">
                    <button type="submit" onClick={async() => {
                        await handleMenu()
                        setAuth(false) 
                        }} className="text-xl hover:bg-slate-100 w-full p-2 font-semibold">Logout</button>
                </form>
            </div>
        </div>
    )
}
