'use server';

import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import path, { join } from "path";

const prisma = new PrismaClient();

//findUser
export async function findUser(req: NextRequest) {
  const urlParts = req.url.split("/");
  const id = urlParts[urlParts.length - 1];
  const userId = Number(id);
  
  try {
    
    const findUser = await prisma.user.findUnique({
        where: { id_user: userId },
      })
      console.log(JSON.stringify(findUser))
     
        if (!findUser) {
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
          data: findUser,
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



//editUser
export async function editUser(formData: FormData) {
  try {
    const id_user = Number(formData.get('id_user'))
    const nama_user = String(formData.get("nama_user") )|| undefined
    const email =  String(formData.get("email")) || undefined
    const foto = formData.get("foto") || undefined
    const password = String(formData.get("password")) || undefined

    let filename = undefined
    console.log(email)

    if (foto) {
      const bytes = await foto.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const name = `image-${Date.now()}${path.extname(foto.name)}`; // Use path.extname correctly
      writeFile(`./public/upload/user/${name}`, buffer, (err) => {
        if (err) console.log("The error is " + err);
        console.log("The file has been saved!");
      });

      filename = name
    }

    const data = await prisma.user.update({
        where: { id_user: id_user },
        data: {
          nama_user : nama_user,
          foto: filename, 
          email : email,
          password : password

        },
      })

      await prisma.$disconnect()

      revalidatePath('/', 'layout')

      return NextResponse.json({
        success: true,
        message: 'update success',
        data: data
      })
  } catch (err) {
    await prisma.$disconnect()
    return NextResponse.json({
      success: true,
      message: 'this is error :' + err
    })
  }
}

//deleteuser
export async function deleteUser(id:number) {

  await prisma.user.delete({
      where: {id_user : id}
    })
  
}
