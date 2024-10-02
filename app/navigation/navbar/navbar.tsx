'use server';

import { getSession } from "@/lib/auth";
import Ui from "./ui";
import { NextRequest } from "next/server";
import { request } from "https";



export default async function Navbar() {

    const session = await getSession()

    return (
        <Ui session={session}/>
    )
}
