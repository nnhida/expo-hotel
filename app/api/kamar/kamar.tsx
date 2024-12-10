"use server";

import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function getKamar() {
  try {
    const data = await prisma.kamar.findMany();

    await prisma.$disconnect();
    return data;
  } catch (err) {
    console.log("this is error :" + err);
    await prisma.$disconnect;
  }
}
export async function countKamar() {
  try {

    const data = await prisma.tipe_kamar.findMany()
    let tipe_kamar: string[] = []
    data.forEach(item => {
      tipe_kamar.push(item.id_tipe_kamar)
    });
    const total = await prisma.kamar.count();
    const standar = await prisma.kamar.count({ where: { id_tipe_kamar: tipe_kamar[0] } });
    const superior = await prisma.kamar.count({ where: { id_tipe_kamar: tipe_kamar[1] } });

    await prisma.$disconnect();
    return { total, standar, superior };
  } catch (err) {
    console.log("this is error :" + err);
    await prisma.$disconnect();
  }
}

export async function kamarAvailable(
  data_tipe_kamar: any,
  data_check_in: any,
  data_check_out: any
) {
  try {
    const tipe_kamar = data_tipe_kamar || null;
    const check_in = data_check_in ? new Date(data_check_in) : undefined; // Use current date if invalid
    const check_out = data_check_out ? new Date(data_check_in) : undefined;

    const dataPesanan = await prisma.pemesanan.findMany({
      where: {
        id_tipe_kamar: String(tipe_kamar),
        OR: [
          {
            tgl_check_in: {
              lte: check_in,
            },
            tgl_check_out: {
              gte: check_out,
            },
          },
          {
            tgl_check_in: {
              lte: check_out,
              gte: check_in,
            },
          },
          {
            tgl_check_out: {
              lte: check_out,
              gte: check_in,
            },
          },
        ],
      },
    });

    const id_pemesanan = String(dataPesanan.map((item) => item.id_pemesanan));

    if(!id_pemesanan) return;

    const nomorKamar = await prisma.detail_pemesanan.findMany({
      where: { id_pemesanan: id_pemesanan },
    });

    const data = nomorKamar.map((item) => item.id_kamar);
    await prisma.$disconnect();
    return data;
  } catch (err) {
    console.log("this is error: " + err);
    await prisma.$disconnect();
    return {
       error: "something wrong"
    }
  }
}

export async function deleteKamar(id_kamar: string) {
  try {
    const data = await prisma.kamar.delete({
      where: { id_kamar: id_kamar },
    });
    revalidatePath("/", "layout");
    await prisma.$disconnect();
    return {
      message: "success delete kamar"
    }
  } catch (err) {
    console.log("this is error " + err);
    await prisma.$disconnect();
    return{
      error: "something wrong"
    }
  }
}

export async function editKamar(formData: FormData) {
  try {
    const id_kamar = String(formData.get("id_kamar"));
    const nomor_kamar = Number(formData.get("nomor_kamar"));
    const id_tipe_kamar = String(formData.get("id_tipe_kamar"));

    const data = await prisma.kamar.update({
      where: { id_kamar: id_kamar },
      data: {
        nomor_kamar,
        id_tipe_kamar,
      },
    });
    revalidatePath("/", "layout");
    await prisma.$disconnect();
    return {
      message: "success edit kamar"
    }
  } catch (err) {
    console.log("this si error: " + err);
    await prisma.$disconnect();
    return {
      error: "something wrong"
    }
  }
}

export async function addKamar(formData: FormData) {
  try {
    const nomor_kamar = Number(formData.get("nomor_kamar"));
    const id_tipe_kamar = String(formData.get("id_tipe_kamar"));

    const data = await prisma.kamar.create({
      data: {
        nomor_kamar,
        id_tipe_kamar,
      },
    });

    revalidatePath("/", "layout");
    await prisma.$disconnect();
    return {
      message: "success add kamar"
    };
  } catch (err) {
    console.log("this is error: " + err);
    await prisma.$disconnect();
    return{
      error: "something wrong"
    }
  }
}
