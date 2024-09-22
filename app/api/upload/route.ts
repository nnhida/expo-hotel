import { error } from "console";
import { writeFile } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path, { join } from "path";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get("picture") as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: "no file" });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // const file = data.get("file") as File;
    // const arrayBuffer = await file.arrayBuffer();
    // const buffer = new Uint8Array(arrayBuffer);

    const name = join(`image-${Date.now()}${path.extname(file.name)}`);
    writeFile(`./public/upload/${name}`, buffer, (err) => {
      if (err) console.log("the error is " + err);
      console.log("The file has been saved!");
    });
    console.log(`open ${path} to see uploaded file`);
    return NextResponse.json({
      message: "file uploaded",
      success: true,
      data: name,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
