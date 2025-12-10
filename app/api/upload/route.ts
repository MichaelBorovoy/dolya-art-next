// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const runtime = "nodejs"; 

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const baseUrl = process.env.IMAGE_BASE_URL
    if (!session || !session.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const allowed = (process.env.ADMIN_EMAILS || "")
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);

    if (!allowed.includes(session.user.email.toLowerCase())) {
        return new NextResponse("Forbidden", { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const category = (formData.get("category") as string | null) ?? "portfolio";

    if (!file || !(file instanceof Blob)) {
        return new NextResponse("File is required", { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<NextResponse>((resolve) => {
        const stream = cloudinary.uploader.upload_stream(
        {
            folder: `${baseUrl}/${category}`,
            resource_type: "image",
        },
        (error, result) => {
            if (error || !result) {
            console.error(error);
            resolve(new NextResponse("Upload error", { status: 500 }));
            } else {
            resolve(
                NextResponse.json({
                url: result.secure_url,
                public_id: result.public_id,
                width: result.width,
                height: result.height,
                })
            );
            }
        }
        );

        stream.end(buffer);
    });
}
