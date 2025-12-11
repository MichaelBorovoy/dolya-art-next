// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { supabaseServer } from "@/lib/supabaseServer";

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
     const title = (formData.get("title") as string | null) ?? null;

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
            async (error, result) => {
                if (error || !result) {
                console.error(error);
                resolve(new NextResponse("Upload error", { status: 500 }));
                } 
                const imageUrl = result?.secure_url;
                const {data: cat, error: catErr} = await supabaseServer
                    .from("categories")
                    .select("id")
                    .eq("slug", category)
                    .maybeSingle();
                if(catErr || !cat) {
                    console.error(catErr);
                    resolve(
                        NextResponse.json(
                            {error: "Category not found", url: imageUrl},
                            {status: 500 }
                        )
                    );
                    return;
                }
                
                const { data: artwork, error: artErr } = await supabaseServer
                    .from("art_works")
                    .insert({
                        title,
                        image_url: imageUrl,
                    })
                    .select("id")
                    .single();

                if (artErr || !artwork) {
                    console.error(artErr);
                    resolve(
                        NextResponse.json(
                        { error: "Artwork insert failed", url: imageUrl },
                        { status: 500 }
                        )
                    );
                    return;
                }
                await supabaseServer.from("art_work_categories").insert({
                    artwork_id: artwork.id,
                    category_id: cat.id,
                    priority: 1000,
                });
                resolve(
                    NextResponse.json({
                        url: imageUrl,
                        artwork_id: artwork.id,
                        category: category,
                    })
                );
                    
            }
                
        );

        stream.end(buffer);
    });
}
