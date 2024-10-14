'use server';

import { getSession } from "@/lib/auth";
import Ui from "./ui";
import { NextRequest } from "next/server";
import { request } from "https";
import { findUser } from "@/app/api/user/route";



export default async function Navbar() {


    let datauser : any

    const session = await getSession()
    if (session) {
        const data = session?.data.id_user
        const id = Number(data)
        const user = await findUser(id)
        datauser = user
    }
        

    return (
        <Ui session={datauser}/>
    )
}
