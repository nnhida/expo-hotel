'use server';

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma"
import { timeStamp } from "console";
import { redirect } from "next/navigation";


export async function getPesanan() {
    try{const data = await prisma.pemesanan.findMany()

    await prisma.$disconnect()
    return data
} catch(err) {
    console.log('this is error '+err)
    await prisma.$disconnect
    process.exit(1)
}
}

export async function getPesananId(id:number) {
    try{
        const data = await prisma.pemesanan.findUnique({
            where:{id_pemesanan : id}
        })

    await prisma.$disconnect()
    return data
} catch(err) {
    console.log('this is error '+err)
    await prisma.$disconnect
    process.exit(1)
}
}



export async function addPesanan(formData:FormData) {

        const id_tipe_kamar = Number(formData.get('id_tipe_kamar'))
        const tgl_check_in = new Date(String(formData.get('tgl_check_in')))
        const tgl_check_out = new Date(String(formData.get('tgl_check_out')))
        const id_kamar = formData.getAll('id_kamar')

        const session = await getSession()

        const pemesanan = await prisma.pemesanan.create({
            data:{
                nomor_pemesanan: Math.random() * 1000,
                nama_pemesanan: session?.data.nama_user!,
                email_pemesanan: session?.data.email!,
                tgl_pemesanan:  new Date().toISOString(),
                tgl_check_in: tgl_check_in,
                tgl_check_out: tgl_check_out,
                nama_tamu: session?.data.nama_user!,
                jumlah_kamar: id_kamar.length,
                id_tipe_kamar: id_tipe_kamar,
                status_pemesanan: 'BARU',
                id_user: session?.data.id_user!
            }
        })

        if (pemesanan) {

            const tipeKamar = await prisma.tipe_kamar.findUnique({ where: {id_tipe_kamar: id_tipe_kamar}})
            const waktu = (tgl_check_out.getTime() - tgl_check_in.getTime()) / (1000 * 60 * 60 * 24)
            const total =waktu * tipeKamar?.harga!

            for (let i = 0; i < id_kamar.length; i++) {
               await prisma.detail_pemesanan.create({
                data:{
                    id_pemesanan: pemesanan.id_pemesanan,
                    id_kamar: Number(id_kamar[i]),
                    tgl_akses: new Date().toISOString(),
                    harga: total
                }
               })
                
            }
        }

    redirect('/pesanan')
}