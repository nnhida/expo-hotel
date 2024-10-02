"use server"

import { prisma } from "@/lib/prisma";
import Ui from "./ui";
import { getTipeKamar } from "../api/kamar/tipe_kamar/route";

export default async function Home() {

  const fetchKamar = await getTipeKamar()
  return (
    <Ui dataTipeKamar={fetchKamar}/>
  );
}
