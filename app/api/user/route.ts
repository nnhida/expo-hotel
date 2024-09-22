import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path, { join } from "path";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const allUser = await prisma.user.findMany();

    if (allUser.length == 0) {
      return NextResponse.json({
        success: true,
        message: "no member",
        data: allUser,
      });
    }
    return NextResponse.json({
      success: true,
      message: "all member loaded",
      data: allUser,
    });
  } catch (err) {
    return NextResponse.json({
      succes: false,
      message: "error loading member: " + err,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // const nama_user = formData.get('nama_user')
    // const foto = formData.get('foto')
    // const email = formData.get('email')
    // const password = formData.get('password')
    //
    const nama_user = String(formData.get("nama_user"));
    const email = String(formData.get("email"));
    const file = formData.get("foto");
    const password = String(formData.get("password"));
    const role = String(formData.get("role")|| "TAMU") ;

    const validRoles = ["RESEPSIONIS", "ADMIN", "TAMU"];

    console.log(role)

      if (!validRoles.includes(role)) {
        return NextResponse.json(
          {
            success: false,
            message: "role off limit",
          },
          { status: 400 }
        );
      }

    if (!file) {
      return NextResponse.json({ success: false, message: "no file" });
    }
    const bytes = await file.arrayBuffer(); //success baecause type is file
    const buffer = Buffer.from(bytes);

    const foto = join(`image-${Date.now()}${path.extname(file.name)}`); //success beacause type is file
    writeFile(`./public/upload/user/${foto}`, buffer, (err) => {
      if (err) console.log("the error is " + err);
      console.log("The file has been saved!");
    });

    const newUser = await prisma.user.create({
      data: {
        nama_user: nama_user,
        email: email,
        foto: foto,
        password: password,
        role: role as any,
      },
    });

    if (newUser) {
      return NextResponse.json({
        success: true,
        message: "new user added",
        data: newUser,
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
