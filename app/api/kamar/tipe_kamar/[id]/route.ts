import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs";
import path, { join } from "path";

const prisma = new PrismaClient();

//findTipeKamar
