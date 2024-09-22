import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs";
import path, { join } from "path";

const prisma = new PrismaClient();

//findUser
export async function GET(req: NextRequest) {
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
export async function PUT(req: NextRequest) {
  const urlParts = req.url.split("/");
  const id = urlParts[urlParts.length - 1];
  try {
    const userId = Number(id);
    const formData = await req.formData();

    const nama_user = String(formData.get("nama_user") )|| undefined
    const email =  String(formData.get("email")) || undefined
    const foto = formData.get("foto") || undefined
    const password = String(formData.get("password")) || undefined

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

    const updatedUser = await prisma.user.update({
        where: { id_user: userId },
        data: {
          nama_user : nama_user,
          foto: filename, 
          email : email,
          password : password

        },
      })

        return NextResponse.json({
          success: true,
          message: "User updated",
          data: updatedUser,
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

//deleteuser
export async function DELETE(req: NextRequest) {
  const urlParts = req.url.split("/");
  const id = urlParts[urlParts.length - 1];
  const userId = Number(id)

  try{
    const deleteUser = await prisma.user.delete({
      where: {id_user : userId}
    })
  
    return NextResponse.json({
      success: true,
      message: 'user on id ' + userId + ' has been deleted',
      data: deleteUser
    })
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: 'there is error : '+ err
    })

  }
}
