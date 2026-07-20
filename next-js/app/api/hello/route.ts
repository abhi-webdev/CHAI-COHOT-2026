import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
    return Response.json({ message: "Hello world" })
    // return NextResponse.json({ message: "Hello world" })
}