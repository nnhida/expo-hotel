'use server';

import { prisma } from "@/lib/prisma";

export async function getDetailId(id: number) {
    try{

        const data = await prisma.detail_pemesanan.findMany({
            where: {id_pemesanan: id}
        })

        await prisma.$disconnect();
        return data;
    } catch(err) {
        console.log('this is error : '+err)
        await prisma.$disconnect()
        return {
            error: "something wrong"
        }
    }
}