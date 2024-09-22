import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs";
import path, { join } from "path";

const prisma = new PrismaClient();

//findTipeKamar
export async function GET(req: NextRequest) {
  const urlParts = req.url.split("/");
  const id = urlParts[urlParts.length - 1];
  const tipeKamarId = Number(id);
  
  try {
    
    const findTipeKamar = await prisma.tipe_kamar.findUnique({
        where: { id_tipe_kamar: tipeKamarId },
      })
      console.log(JSON.stringify(findTipeKamar))
     
        if (!findTipeKamar) {
          return NextResponse.json(
            {
              success: false,
              message: "User not found",
            },
            { status: 404 }
          );
        }
        return NextResponse.json({
          success: true,
          message: "User loaded",
          data: findTipeKamar,
        });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "There is an error: " + err,
      },
      { status: 500 }
    );
  }
}

//editTipeKamar
export async function PUT(req: NextRequest) {
  const urlParts = req.url.split("/");
  const id = urlParts[urlParts.length - 1];
  try {
    const tipeKamarId = Number(id);
    const formData = await req.formData();

    const nama_tipe_kamar = String(formData.get("nama_tipe_kamar") )|| undefined
    const harga =  Number(formData.get("harga")) || undefined
    const foto = formData.get("foto") || undefined
    const deskripsi = String(formData.get("deskripsi")) || undefined

    let filename : any = ''

    if (foto) {
      const bytes = await foto.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const name = `image-${Date.now()}${path.extname(foto.name)}`; // Use path.extname correctly
      writeFile(`./public/upload/${foto}`, buffer, (err) => {
        if (err) console.log("The error is " + err);
        console.log("The file has been saved!");
      });

      filename = name
    }

    const updatedTipeKamar = await prisma.tipe_kamar.update({
        where: { id_tipe_kamar: tipeKamarId },
        data: {
          nama_tipe_kamar : nama_tipe_kamar,
          foto: filename, 
          harga : harga,
          deskripsi : deskripsi

        },
      })

        return NextResponse.json({
          success: true,
          message: "User updated",
          data: updatedTipeKamar,
        });

  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "There is an error: " + err,
      },
      { status: 500 }
    );
  }
}

//delete Tipe Kamar
export async function DELETE(req: NextRequest) {
  const urlParts = req.url.split("/");
  const id = urlParts[urlParts.length - 1];
  const tipeKamarId = Number(id)

  try{
    const deleteTipeKamar = await prisma.tipe_kamar.delete({
      where: {id_tipe_kamar : tipeKamarId}
    })
  
    return NextResponse.json({
      success: true,
      message: 'user on id ' + tipeKamarId + ' has been deleted',
      data: deleteTipeKamar
    })
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: 'there is error : '+ err
    })

  }
}
