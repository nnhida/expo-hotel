"use server"

import { prisma } from "@/lib/prisma";
import Ui from "./ui";
import { getTipeKamar } from "../api/kamar/tipe_kamar/tipe_kamar";
import { getSession } from "@/lib/auth";

export default async function Home() {

  const fetchKamar = await getTipeKamar()
  const auth = await getSession()
  return (
    <Ui dataTipeKamar={fetchKamar} auth={auth}/>
  );
}
