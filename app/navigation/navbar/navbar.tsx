'use server';

import { getSession } from "@/lib/auth";
import Ui from "./ui";
import { NextRequest } from "next/server";
import { request } from "https";
import { findUser } from "@/app/api/user/user";



export default async function Navbar() {


    const session = await getSession()
    const data = session?.data
        

    return (
        <Ui session={data}/>
    )
}
