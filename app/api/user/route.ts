"use server";

import { createSession, deleteSession, encrypt } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs";
import { request } from "https";
import { revalidatePath } from "next/cache";
import { NextURL } from "next/dist/server/web/next-url";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { NextRequest, NextResponse } from "next/server";
import path, { join } from "path";
import React from "react";

export async function getAll() {
  revalidatePath("/","layout")
  return await prisma.user.findMany();
}

export async function countUser() {
  const total = await prisma.user.count()
  const admin = await prisma.user.count({where: {role: 'ADMIN'}})
  const staff = await prisma.user.count({where: {role: 'RESEPSIONIS'}})
  const tamu = await prisma.user.count({where: {role: 'TAMU'}})

  return {total,admin,staff,tamu}
}

export async function login(formData: FormData) {
  
    const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const findUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!findUser) {
     return NextResponse.json({success: false, message: 'akun tidak ditemukan'})
  } else if (findUser) {
    if (email === findUser.email && password === findUser.password) {
      const session = await encrypt({ findUser});

      createSession(findUser)

      if (findUser.role === 'ADMIN' || findUser.role === 'RESEPSIONIS') {
        redirect('/kelola')
      }  else {
        redirect('/home')
      }
    } else {
        
        return NextResponse.json({success: false, message: 'email/ password salah'})
    }
  }

}

export async function logout() {
    await deleteSession()
    redirect('/login')
}

export async function register(formData: FormData) {
    const nama_user = String(formData.get("nama_user"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const role = String(formData.get("role") || "TAMU");

    const validRoles = ["RESEPSIONIS", "ADMIN", "TAMU"];

    if (!validRoles.includes(role)) {
      console.log('role off limit')
    }

    const filterEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (filterEmail) {
      console.log('email terpakai')
    }


    const data = {nama_user,email, password, role}

    await prisma.user.create({
      data: {
        nama_user,
        email,
        foto: undefined,
        password,
        role: role as any,
      },
    });

    createSession(data)
    redirect('/')

}

export async function addUser(formData: FormData) {
  try {
    const nama_user = String(formData.get("nama_user"));
    const email = String(formData.get("email"));
    const file = formData.get("foto") || undefined; // Fetch the file
    const password = String(formData.get("password"));
    const role = String(formData.get("role") || "TAMU");

    const validRoles = ["RESEPSIONIS", "ADMIN", "TAMU"];

    if (!validRoles.includes(role)) {
      console.log('Role off limit');
    }

    let filename // Initialize filename

    // Check if file exists and is an instance of File
    if (file.size !== 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
  
      const foto = `image-${Date.now()}${path.extname(file.name)}`;
      await writeFile(`./public/upload/user/${foto}`, buffer, (err) => {
        if (err) console.log("The error is " + err);
        console.log("The file has been saved!");
      });
      filename = foto; // Set filename to the saved file name
    } else {
      // If no file, ensure filename is undefined
      filename = undefined;
    }

    const filterEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (filterEmail) {
      console.log('Email already in use');
      return; // Exit if email is already taken
    }

    console.log('Filename is ' + filename);

    // Create user in the database
    await prisma.user.create({
      data: {
        nama_user,
        email,
        foto: filename,
        password,
        role: role as any,
      },
    });
  } catch (err) {
    console.log('This is an error: ' + err);
  }
}
