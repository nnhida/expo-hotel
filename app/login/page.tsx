

import { redirect } from "next/navigation";
import { getSession, login, logout, regis } from "./action";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { useEffect } from "react";


export default async function Login() {
    const session = await getSession()
    const prisma = new PrismaClient()
    const user = prisma.user.findMany()

    return (
        <div>
            <form action={async (FormData) => {
                'use server';
                await login(FormData)
                redirect('/login');
            }}>
                <input type="email" placeholder="email" />
                <br />

                <button type="submit">Login</button>
            </form>

            <form action={async (FormData: FormData) => {
                'use server';
                await regis(FormData);
                redirect('/login');
            }}>
                <label htmlFor="nama_user">Nama User</label>
                <input type="text" id="nama_user" placeholder="Nama User" />
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="email" />
                <br />
                <label htmlFor="foto">foto</label>
                <input type="file" id="foto"/>
                <br />
                <label htmlFor="password">password</label>
                <input type="text" id="password" placeholder="password" />
                <br />
                <label htmlFor="role">role</label>
                <select id='role'>
                    <option value='ADMIN'>Admin</option>
                    <option value='RESEPSIONIS'>Resepsionis</option>
                    <option value='TAMU'>Tamu</option>
                </select>
                <br />
                <button type="submit">Regis</button>
            </form>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <div className="flex">
            {(await user).map((item) => (
                <div>
                    <p>user ke {item.id_user}</p>
                    <p>{item.nama_user}</p>
                    <p>{item.email}</p>
                    <p>{item.foto}</p>
                    <p>{item.password}</p>
                    <p>{item.role}</p>
                </div>
            ))}
            </div>
        </div>
    )
}
