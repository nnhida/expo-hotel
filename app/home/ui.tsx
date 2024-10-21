"use client"

import { prisma } from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoPricetagsOutline, IoCameraOutline, IoWifi, IoFastFoodOutline, IoFlashOutline, IoBarbellSharp} from "react-icons/io5";
import { RiCustomerService2Line } from "react-icons/ri";
import CardRoom from "../component/cardRoom";
import { ITipekamar } from "../component/type/type";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
// import { fetchTipeKamar } from "./route";

interface homeProps {
    dataTipeKamar: any
    auth: any
}

export default function Ui({ dataTipeKamar, auth }: homeProps) {

    const [tipeKamar, setTipeKamar] = useState<any>()

    const router = useRouter()


    function coba() {
        if (!auth) {
            toast.error("you must login first")
        } else {
            router.push('/pesanan/pesan')
        }
    }

    useEffect(() => {

        async function fetch() {
            try {
                const data = dataTipeKamar
                setTipeKamar(data)
            } catch (err) {
                console.log(err)
            }
        }



        fetch()

    }, [])
    return (
        <div className="pt-12">
            <Toaster richColors/>
            <div className="flex m-10 pl-20 pt-32 h-[85vh] bg-cover rounded-xl" style={{
                backgroundImage: "url('./hotelHome.jpg')"
            }}>
                <div className="flex flex-col space-y-10 w-2/5">
                    <div className=" flex flex-col space-y-4">
                        <p className="font-bold text-6xl">Wikusama Hotel</p>
                        <p className="text-2xl w-3/5">Rasakan sensasi terbaik dari pelayanan hotel Wikusama Company yang dijamin tidak akan dilupakan</p>
                        <button onClick={coba} className="p-2 bg-orange-500 hover:bg-orange-600 w-max rounded-full font-bold text-white">Pesan Sekarang</button>
                    </div>

                    {/* <div className="flex flex-col space-y-3 bg-white bg-opacity-70 p-3 rounded-xl w-max">
            <p className="text-2xl font-bold">Pesan Sekarang</p>
            <form  className="flex bg-white rounded-md overflow-hidden">
              <div className="flex flex-col space-y-2 border-r-2 border-gray-200 p-2">
                <p>Tipe Hotel</p>
                <select className="focus:outline-none">
                  <option>Standar</option>
                  <option>Deluxe</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2 border-r-2 border-gray-200 p-2">
                <p>Check In</p>
                <input type="date" className="focus:outline-none"/>
              </div>
              <div className="flex flex-col space-y-2 p-2">
                <p>Check Out</p>
                <input type="date" className="focus:outline-none"/>
              </div>

              <button type="submit" className=" bg-blue-600 hover:bg-blue-800 p-2 transition-all">
                <IoMdSearch className="size-7 fill-white"/>
                </button>
            </form>
          </div> */}
                </div>
            </div>

            <div className="h-max flex flex-col space-y-20 items-center p-10">
                <p className=" font-bold text-4xl text-center text-orange-500">Kenapa Memilih Kami</p>

                <div className="flex space-x-10">
                    <div className="flex flex-col space-y-5 w-64 items-center">
                        <div className="p-4 bg-blue-500 w-max rounded-full">
                            <RiCustomerService2Line className="size-20 fill-white" />
                        </div>

                        <div className="flex flex-col space-y-2 text-center">
                            <p className="text-2xl font-bold text-orange-500">Customer Service</p>
                            <p className="">anda akan terhubung pada customer service kami seharian penuh untuk menjamin kualitas liburan anda</p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-5 w-64 items-center">
                        <div className="p-4 bg-blue-500 w-max rounded-full">
                            <IoPricetagsOutline className="size-20 stroke-white fill-white" />
                        </div>

                        <div className="flex flex-col space-y-2 text-center">
                            <p className="text-2xl font-bold text-orange-500">Harga Terjangkau</p>
                            <p className="">Kami menyediakan pelayan kualitas kelas atas dengan harga yang dapat dijangkau</p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-5 w-64 items-center">
                        <div className="p-4 bg-blue-500 w-max rounded-full">
                            <IoCameraOutline className="size-20 stroke-white" />
                        </div>

                        <div className="flex flex-col space-y-2 text-center">
                            <p className="text-2xl font-bold text-orange-500">Spot Foto</p>
                            <p className="">Tempat kami memiliki banyak spot foto yang indah dan dapat dijadikan diupload di sosmed</p>
                        </div>
                    </div>

                </div>

            </div>
            
            <div id="fasilitas" className="h-max flex flex-col space-y-20 items-center p-10">
                <p className=" font-bold text-4xl text-center text-orange-500">Fasilitas yang tersedia</p>

                <div className="flex justify-between w-1/2">
                    <div className="flex items-center flex-col space-y-2">
                        <IoWifi className="size-14 fill-blue-500"/>
                        <p className="font-semibold text-xl text-orange-500">detail</p>
                    </div>
                    <div className="flex items-center flex-col space-y-2">
                        <IoFastFoodOutline className="size-14 stroke-blue-500"/>
                        <p className="font-semibold text-xl text-orange-500">detail</p>
                    </div>
                    <div className="flex items-center flex-col space-y-2">
                        <IoFlashOutline className="size-14 stroke-blue-500"/>
                        <p className="font-semibold text-xl text-orange-500">detail</p>
                    </div>
                    <div className="flex items-center flex-col space-y-2">
                        <IoBarbellSharp className="size-14 fill-blue-500"/>
                        <p className="font-semibold text-xl text-orange-500">detail</p>
                    </div>
                    

                </div>

            </div>

            

            

            <div id="tipeKamar" className="h-screen flex flex-col space-y-10 px-10">
                <p className="font-bold text-4xl text-center text-orange-500">Tipe Kamar Yang Tersedia</p>

                <div className="flex space-x-5">
                    {tipeKamar?.map((item: ITipekamar) => (
                        <CardRoom nama_tipe_kamar={item.nama_tipe_kamar} harga={item.harga} deskripsi={item.deskripsi} foto={item.foto} auth={auth} />
                    ))}
                </div>

            </div>


        </div>
    );
}
