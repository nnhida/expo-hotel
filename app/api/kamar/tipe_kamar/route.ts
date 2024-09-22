import { PrismaClient } from "@prisma/client";
import { timeStamp } from "console";
import { writeFile } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path, { join } from "path";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const allTipeKamar = await prisma.tipe_kamar.findMany();

    if (allTipeKamar.length == 0) {
      return NextResponse.json({
        success: true,
        message: "no tipe kamar",
        data: allTipeKamar,
      });
    }
    return NextResponse.json({
      success: true,
      message: "all tipe kamar loaded",
      data: allTipeKamar,
    });
  } catch (err) {
    return NextResponse.json({
      succes: false,
      message: "error loading tipe kamar: " + err,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const nama_tipe_kamar = String(formData.get("nama_tipe_kamar"));
    const harga = Number(formData.get("harga"));
    const deskripsi = String(formData.get("deskripsi"));
    const file = formData.get("foto");

    if (!file) {
        return NextResponse.json({ success: false, message: "no file" });
      }
      const bytes = await file.arrayBuffer(); //success baecause type is file
      const buffer = Buffer.from(bytes);
  
      const foto = join(`image-${Date.now()}${path.extname(file.name)}`); //success beacause type is file
      writeFile(`./public/upload/tipe_kamar/${foto}`, buffer, (err) => {
        if (err) console.log("the error is " + err);
        console.log("The file has been saved!");
      });



    const newTipeKamar = await prisma.tipe_kamar.create({
      data: {
        nama_tipe_kamar: nama_tipe_kamar,
        harga: harga,
        deskripsi: deskripsi,
        foto : foto
      },
    });

    if (newTipeKamar) {
      return NextResponse.json({
        success: true,
        message: "new tipe kamar added",
        data: newTipeKamar,
      });
    } else {
      console.error();
    }
  } catch (err) {
    return NextResponse.json({
      succes: false,
      message: "there is error : " + err,
    });
  }
}
