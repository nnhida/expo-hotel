'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server";


export async function getKamar() {
    try {const data = await prisma.kamar.findMany()

    await prisma.$disconnect()
    return data
} catch(err) {
    console.log('this sis error '+err)
}
}
export async function countKamar() {
    const total = await prisma.kamar.count()
    const standar = await prisma.kamar.count({ where:{id_tipe_kamar: 1}})
    const superior = await prisma.kamar.count({ where:{id_tipe_kamar: 2}})

    return {total, standar, superior}
}

export async function kamarAvailable(data_tipe_kamar:any, data_check_in: any, data_check_out: any) {

    const tipe_kamar = data_tipe_kamar || 0
    const check_in = data_check_in ? new Date(data_check_in) : undefined; // Use current date if invalid
    const check_out = data_check_out ? new Date(data_check_in) : undefined;

    // console.log('tipekamar: '+tipe_kamar+',checkin :'+check_in+',checkout :'+check_out)


    const dataPesanan = await prisma.pemesanan.findMany({
        where:{ 
            id_tipe_kamar: Number(tipe_kamar), 
            tgl_check_in:{
                gte: check_in,
                lte: check_out
            },
            tgl_check_out: {
                gte: check_in,
                lte: check_out
            }
        }
    })

    const id_pemesanan = Number(dataPesanan.map((item) => item.id_pemesanan));

    const nomorKamar = await prisma.detail_pemesanan.findMany({
        where:{ id_pemesanan: id_pemesanan}
    })

    return nomorKamar.map((item) => item.id_kamar)
    
}

export async function deleteKamar(id_kamar:number) {
    try{
        await prisma.kamar.delete({
            where:{id_kamar:id_kamar}
        })
    } catch(err) {
        console.log('this is error '+err)
    }
}

export async function editKamar(formData: FormData) {
    
    const id_kamar = Number(formData.get('id_kamar'))
    const nomor_kamar = Number(formData.get('nomor_kamar'))
    const id_tipe_kamar = Number(formData.get('id_tipe_kamar'))

    await prisma.kamar.update({
        where: {id_kamar:id_kamar},
        data: {
            nomor_kamar,
            id_tipe_kamar
        }
    })


}

export async function addKamar(formData: FormData) {

    const nomor_kamar = Number(formData.get('nomor_kamar'))
    const id_tipe_kamar = Number(formData.get('id_tipe_kamar'))

    
    await prisma.kamar.create({
        data: {
            nomor_kamar,
            id_tipe_kamar
        }
      })
}
