'use server'

import { Iuser } from "@/app/component/type/type";
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
  const data = await prisma.user.findMany();
  revalidatePath("/", "layout");
  await prisma.$disconnect();
  return data;
}

export async function countUser() {
  const total = await prisma.user.count();
  const admin = await prisma.user.count({ where: { role: "ADMIN" } });
  const staff = await prisma.user.count({ where: { role: "RESEPSIONIS" } });
  const tamu = await prisma.user.count({ where: { role: "TAMU" } });

  await prisma.$disconnect();
  return { total, admin, staff, tamu };
}

export async function login(formData: FormData) {
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const findUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!findUser) {
      return NextResponse.json({
        success: false,
        message: "akun tidak ditemukan",
      });
    } else if (findUser) {
      if (email === findUser.email && password === findUser.password) {
        createSession(findUser);

        if (findUser.role === "ADMIN" || findUser.role === "RESEPSIONIS") {
          redirect("/kelola");
        } else {
          redirect("/home");
        }
      }
    }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function register(formData: FormData) {
  try {
    const nama_user = String(formData.get("nama_user"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const role = String(formData.get("role") || "TAMU");

    const validRoles = ["RESEPSIONIS", "ADMIN", "TAMU"];

    if (!validRoles.includes(role)) {
      console.log("role off limit");
    }

    const filterEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (filterEmail) {
      console.log("email terpakai");
    }

    const data = { nama_user, email, password, role };

    await prisma.user.create({
      data: {
        nama_user,
        email,
        foto: undefined,
        password,
        role: role as any,
      },
    });

    createSession(data);
    await prisma.$disconnect();
    redirect("/");
  } catch (err) {
    console.log("this is error :" + err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

export async function addUser(formData: FormData) {
  try {
    const nama_user = formData.get("nama_user");
    const email = formData.get("email");
    const file = formData.get("foto") || undefined; // Fetch the file
    const password = formData.get("password");
    const role = formData.get("role");

    const validRoles = ["RESEPSIONIS", "ADMIN", "TAMU"];

    if (!validRoles.includes(role)) {
      console.log("Role off limit");
    }

    let filename; // Initialize filename

    // Check if file exists and is an instance of File
    if (file) {
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
      console.log("Email already in use");
      return; // Exit if email is already taken
    }

    console.log("Filename is " + filename);

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

    revalidatePath('/','layout')
    await prisma.$disconnect();
    return;
  } catch (err) {
    console.log("this is error :" + err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

export async function findUser(id: number) {
  try {
    const findUser = await prisma.user.findUnique({
      where: { id_user: id },
    });
    await prisma.$disconnect();
    return findUser;
  } catch (err) {
    console.log("this is error :" + err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

//editUser
export async function editUser(formData: FormData) {
  try {
    const id_user = Number(formData.get("id_user"));
    const nama_user = formData.get("nama_user") || undefined;
    const email = formData.get("email") || undefined;
    const foto = formData.get("foto") || undefined;
    const role = formData.get("role") || undefined;
    const password = formData.get("password") || undefined;

    let filename = undefined;
    console.log(nama_user);
    console.log(email);
    console.log(role);
    console.log(password);

    if (foto) {
      const bytes = await foto.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const name = `image-${Date.now()}${path.extname(foto.name)}`; // Use path.extname correctly
      writeFile(`./public/upload/user/${name}`, buffer, (err) => {
        if (err) console.log("The error is " + err);
        console.log("The file has been saved!");
      });

      filename = name;
    }

    const data = await prisma.user.update({
      where: { id_user: id_user },
      data: {
        nama_user,
        foto: filename,
        role,
         email,
         password,
      },
    });

    await prisma.$disconnect();

    revalidatePath("/", "layout");

    return data;
  } catch (err) {
    await prisma.$disconnect();
    console.log("this is error :" + err);
  }
}

//deleteuser
export async function deleteUser(id: number) {
  try {
    await prisma.user.delete({
      where: { id_user: id },
    });

    revalidatePath('/','layout')
    return;
  } catch (err) {
    console.log("this is error :" + err);
    await prisma.$disconnect();
    process.exit(1);
  }
}
