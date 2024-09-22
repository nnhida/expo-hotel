"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import path, { join } from "path";
import { writeFile } from "fs";

const prisma = new PrismaClient();
const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("5 sec from now")
    .sign(key);
}

export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  const email = String(formData.get("email"));

  const account = await prisma.user.findUnique({ where: { email: email } });

  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ email, expires });

  cookies().set("session", session, { expires, httpOnly: true });
}

export async function regis(formData: FormData) {
    const nama_user = String(formData.get("nama_user"));
    const email = String(formData.get("email"));
    const file = formData.get("foto");
    const password = String(formData.get("password"));
    const role = String(formData.get("role") || "TAMU");

    const validRoles = ["RESEPSIONIS", "ADMIN", "TAMU"];

    if (!validRoles.includes(role)) {
      return alert("role is not right");
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

    const user = { nama_user, email, foto, password, role };
    alert(JSON.stringify(user))

    await prisma.user.create({
      data: {
        nama_user: user.nama_user,
        email: user.email,
        foto: user.foto,
        password: user.password,
        role: user.role as any,
      },
    });

    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ user, expires });

    cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  if (!session) return null;

  const parsed = await decrypt(session);
  // Set the expiration to 10 seconds from now
  parsed.expires = new Date(Date.now() + 10 * 1000);

  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
  });

  return res;
}
